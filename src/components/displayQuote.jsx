import { useEffect, useState } from 'react';
import Loader from './Loader';

const DisplayQuote = () => {
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const API_KEY = 'https://api.api-ninjas.com/v1/quotes?category=funny';
        const response = await fetch(
          API_KEY,
          {
            headers: {
              'X-Api-Key': 'RSEoeXesveyZYofHdotTdw==uMk2w3sAMDYOZZPA',
            },
          },
        );
        if (!response.ok) {
          throw new Error('Failed to Load Quote');
        }
        const json = await response.json();
        setQuote(json);
      } catch (error) {
        setError('Failed To Load Quote');
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };
    fetchQuote();
  }, [setQuote]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>{ error }</div>;
  }

  return (
    <div>
      {quote && quote.length > 0 ? (
        <>
          <p className="quote">{quote[0].quote}</p>
          <p className="author">{quote[0].author}</p>
        </>
      ) : <div>No Quote Found</div>}
    </div>
  );
};

export default DisplayQuote;
