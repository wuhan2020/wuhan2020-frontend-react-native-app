import { useState, useEffect } from 'react';

function useData(url: string) {
  const [data, setData] = useState(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(Date.now());

  const baseUrl =
    'https://raw.githubusercontent.com/wuhan2020/wuhan2020/master/data/fe/';

  useEffect(
    function() {
      setLoading(true);
      let fullUrl = '';
      if (url === 'logistics') {
        fullUrl = `${baseUrl}/logistical/data.json`;
      } else if (url === 'donations') {
        fullUrl = `${baseUrl}/donation/data.json`;
      } else if (url === 'consultations') {
        fullUrl = `${baseUrl}/clinic/data.json`;
      } else if (url === 'hotels') {
        fullUrl = `${baseUrl}/travel_hotel/data.json`;
      }

      fetch(fullUrl)
        .then(d => d.json())
        .then(json => {
          setData(json);
          setTotal(json.length);
        });
    },
    [count],
  );

  function refresh() {
    setCount(count + 1);
  }

  return [data, total, loading, refresh];
}

export default useData;
