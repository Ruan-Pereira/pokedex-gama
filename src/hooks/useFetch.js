import React from 'react';

const useFetch = (concatena) => {
  const [response, setResponse] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const request = React.useCallback(async (url, options) => {
    let response;
    let json;

    try {
      setError(null);
      setLoading(true);
      response = await fetch(url, options);
      json = await response.json();

      if (response.ok === false) throw new Error(json.message);
    } catch (err) {
      json = null;
      setError(err.message);
    } finally {
      setResponse(json);
      setLoading(false);
      return { response, json };
    }
  }, []);

  return { response, loading, error, request };
};

export default useFetch;
