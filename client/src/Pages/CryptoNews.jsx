import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Card, CardContent, Typography, Container, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    marginBottom: '10px',
  },
  title: {
    fontWeight: 'bold',
  },
});

const CryptoNews = () => {
  const classes = useStyles();
  const [news, setNews] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch(`https://newsdata.io/api/1/news?apikey=pub_66706689d37d21328844d3216f6a6e53a79db&q=crypto&page=${page}`);
      const data = await response.json();
      setNews((prevNews) => [...prevNews, ...data.results]);
      if (data.results.length === 0) setHasMore(false);
    } catch (error) {
      console.error('Error fetching news:', error);
      setHasMore(false);
    }
  };

  const fetchMoreNews = () => {
    setPage((prevPage) => prevPage + 1);
    fetchNews();
  };

  return (
    <Container>
      <Typography variant="h2" component="h1" gutterBottom>
        Crypto News
      </Typography>
      {news.length > 0 ? (
        <InfiniteScroll
          dataLength={news.length}
          next={fetchMoreNews}
          hasMore={hasMore}
          loader={<CircularProgress />}
          endMessage={<Typography variant="body2">You have seen all the news</Typography>}
        >
          {news.map((article, index) => (
            <Card key={index} className={classes.root}>
              <CardContent>
                <Typography className={classes.title} variant="h5" component="h2">
                  <a href={article.link} target="_blank" rel="noopener noreferrer">
                    {article.title}
                  </a>
                </Typography>
                <Typography variant="body2" component="p">
                  {article.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </InfiniteScroll>
      ) : (
        <CircularProgress />
      )}
    </Container>
  );
};

export default CryptoNews;
