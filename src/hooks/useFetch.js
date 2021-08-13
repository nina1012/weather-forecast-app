import React, { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetching() {
      try {
        // if url is undefined, reset all the data and url to userLocationInfo and throw an error
        if (url) {
          setIsLoading(true);
          const response = await fetch(url);
          const data = await response.json();
          setData(data);
          //   if (Array.isArray(data)) {
          //     setLocationsFound(data);
          //   } else if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
          //     setLocation(data);
          //   }
          setIsLoading(false);
          return { setData, setIsLoading };
        } else {
          reset();
          throw new TypeError('Invalid input value');
        }
      } catch (error) {
        setError(error);
      }
    }
    fetching();
  }, [url]);

  const reset = () => {
    setData(null);
    setError(null);
    setIsLoading(false);
  };

  const fetchedData = () => {
    return { data, isLoading, error };
  };

  return { fetchedData, reset };
};

export default useFetch;
