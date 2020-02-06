import React, { useState, useEffect } from 'react';
import { wait } from '../utils';

export const DataContext = React.createContext({
  data: null,
  filter: null,
  refresh: () => undefined,
  timeout: false,
});

type PropTypes = {
  children: React.ReactNode;
};

function Provider(props: PropTypes) {
  const [data, setData] = useState(null);
  const [counter, setCounter] = useState(0);
  const [filter, setFilter] = useState(null);
  const [timeout, setTimeoutValue] = useState(false);

  const refresh = () => {
    console.log('refresh');
    setCounter(counter + 1);
  };

  useEffect(
    function() {
      setTimeoutValue(null);
      const req = fetch(
        'https://service-0gg71fu4-1252957949.gz.apigw.tencentcs.com/release/dingxiangyuan',
      )
        .then(d => d.json())
        .then(json => setData(json.data))
        .then(() => 'req');

      Promise.race([req, wait(1000 * 10)]).then(rst => {
        if (rst !== 'req') {
          setTimeoutValue(1000 * 10);
        } else {
          setTimeoutValue(null);
        }
      });
    },
    [counter],
  );

  return (
    <DataContext.Provider value={{ data, filter, refresh, timeout }}>
      {props.children}
    </DataContext.Provider>
  );
}

export default Provider;
