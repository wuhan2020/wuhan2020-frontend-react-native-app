import React, { useState, useEffect } from 'react';

export const NewsDataContext = React.createContext({
  data: null,
  pageNum: 1,
  loading: false,
  refresh: () => undefined,
  fetchMore: () => undefined,
});

type PropTypes = {
  children: React.ReactNode;
};

function Provider(props: PropTypes) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);

  useEffect(
    function() {
      setLoading(true);
      fetch(`http://ncov.news.dragon-yuan.me/api/news?search=&page=${pageNum}`)
        .then(d => d.json())
        .then(json => {
          if (pageNum > 1) {
            setData((data || []).concat(json.result.list));
          } else {
            setData(json.result.list);
          }
          setLoading(false);
        });
    },
    [pageNum],
  );

  function fetchMore() {
    setPageNum(pageNum + 1);
  }

  function refresh() {
    setPageNum(1);
  }

  return (
    <NewsDataContext.Provider
      value={{ data, pageNum, fetchMore, loading, refresh }}>
      {props.children}
    </NewsDataContext.Provider>
  );
}

export default Provider;
