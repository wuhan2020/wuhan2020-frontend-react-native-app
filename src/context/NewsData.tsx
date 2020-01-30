import React, { useState, useEffect } from 'react';

export const NewsDataContext = React.createContext({
  data: null,
  pageNum: 1,
  fetchMore: () => undefined,
});

type PropTypes = {
  children: React.ReactNode;
};

function Provider(props: PropTypes) {
  const [data, setData] = useState(null);
  // const [counter, setCounter] = useState(0);
  const [pageNum, setPageNum] = useState(1);

  useEffect(
    function() {
      fetch('http://ncov.news.dragon-yuan.me/api/news?search=&page=0')
        .then(d => d.json())
        .then(json => {

          if (pageNum > 1) {
            setData((data || []).concat(json.list));
          } else {
            setData(json.result.list);
          }
        })
        .catch();
    },
    [pageNum],
  );

  function fetchMore() {
    setPageNum(pageNum + 1);
  }

  return (
    <NewsDataContext.Provider value={{ data, pageNum, fetchMore }}>
      {props.children}
    </NewsDataContext.Provider>
  );
}

export default Provider;
