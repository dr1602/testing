import { useEffect, useState } from 'react';
import axios from 'axios';

export const useFetch = (url: string) => {
  const baseUrl = 'http://localhost:3004';
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});
  const token = localStorage.getItem('token');

  const doFetch = (options = {}) => {
    setOptions(options);
    setIsLoading(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isLoading) {
          return;
        }
        const requestOptions = {
          url: baseUrl + url,
          ...options,
          ...{
            headers: {
              authorization: token ? `Token ${token}` : '',
            },
          },
        };
        const res = await axios.request(requestOptions);
        setResponse(res.data);
      } catch (err) {
        setError((err as any).response.data);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [isLoading, options, token, url]);

  return [{ response, isLoading, error }, doFetch];
};
