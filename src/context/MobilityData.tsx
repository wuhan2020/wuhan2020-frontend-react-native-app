import React, { useState, useEffect } from 'react';

export const MobilityDataContext = React.createContext({
  data: null,
  loading: false,
  refresh: () => undefined,
});

type PropTypes = {
  children: React.ReactNode;
};

function Provider(props: PropTypes) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(0);

  const refresh = () => {
    setCounter(counter + 1);
  };

  useEffect(
    function() {
      setLoading(true);
      const data = fetch(
        `https://2019ncov.nosugartech.com/data.json?${counter}`,
      )
        .then(d => d.json())
        .then(json => {
          setLoading(false);
          setData(json.data);
        });
    },
    [counter],
  );

  return (
    <MobilityDataContext.Provider value={{ data, loading, refresh }}>
      {props.children}
    </MobilityDataContext.Provider>
  );
}

export default Provider;
