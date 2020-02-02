import { useState, useEffect } from 'react';

function useWuhan2020(url: string) {
  const [data, setData] = useState(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(
    function() {
      setLoading(true);
      fetch(`${url}?pageIndex=${pageIndex}&pageSize=10`)
        .then(d => d.json())
        .then(json => {
          if (pageIndex > 1) {
            setData((data || []).concat(json.data));
          } else {
            setData(json.data);
          }
          setTotal(json.count);
          setLoading(false);
        });
    },
    [pageIndex],
  );

  function fetchMore() {
    setPageIndex(pageIndex + 1);
  }

  function refresh() {
    setPageIndex(1);
  }

  return [data, total, loading, fetchMore, refresh];
}

export default useWuhan2020;
