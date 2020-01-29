import React, { useState, useEffect } from 'react';

export const DataContext = React.createContext({
  data: null,
  filter: null,
  refresh: () => undefined,
});

type PropTypes = {
  children: React.ReactNode;
};

function Provider(props: PropTypes) {
  const [data, setData] = useState(null);
  const [counter, setCounter] = useState(0);
  const [filter, setFilter] = useState(null);

  const refresh = () => {
    setCounter(counter + 1);
  };

  useEffect(
    function() {
      const data = fetch(
        'https://service-0gg71fu4-1252957949.gz.apigw.tencentcs.com/release/dingxiangyuan',
      )
        .then(d => d.json())
        .then(json => setData(json.data));
    },
    [counter],
  );

  return (
    <DataContext.Provider value={{ data, filter, refresh }}>
      {props.children}
    </DataContext.Provider>
  );
}

export default Provider;
