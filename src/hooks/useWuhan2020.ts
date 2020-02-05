import { useState, useEffect } from 'react';
import { WhDataClient, DataType } from 'wh-data-client';

function useWuhan2020<T>(resource: DataType) {
  const [data, setData] = useState<T[] | null>(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(Date.now());

  useEffect(
    function() {
      setLoading(true);
      const client = new WhDataClient({
        baseUrl: 'http://q519ubblo.bkt.clouddn.com/data/',
        fePrefix: 'fe/',
        indexFile: 'index.json',
      });

      client.getData<T>(resource).then(t => {
        setData(t);
        setTotal(t.length);
        setLoading(false);
      });
    },
    [count],
  );

  function refresh() {
    setCount(count + 1);
  }

  return [data, total, loading, refresh];
}

export default useWuhan2020;
export * from 'wh-data-client';
