import {useState, useEffect } from 'react';

/* Generic React hook for infinite scrolling*/
const useInfiniteScroll = (fetchMore, hasMore) => {
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {  
    const list = document.getElementById('list-container');
    list.addEventListener('scroll', (e) => {
      const el = e.target;
      if(el.scrollTop + el.clientHeight >= el.scrollHeight && hasMore) {
        setIsFetching(true);
      }
    });  
  }, []);

  useEffect(() => {
    if (!isFetching) {
      return;
    }
    fetchMore();
  }, [isFetching]);

  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;