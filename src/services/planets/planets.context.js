import { useState, useEffect, createContext } from 'react';
import { planetsRequest } from './planets.service';

export const PlanetsContext = createContext();

export const PlanetsContextProvider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    retrievePlanets(keyword);
  }, [keyword]);

  const retrievePlanets = (kwrd) => {
    setIsLoading(true);
    planetsRequest(kwrd)
      .then((results) => {
        setIsLoading(false);
        setError(null);
        setPlanets(results);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  };

  const onSearch = (searchKeyword) => {
    setKeyword(searchKeyword);
  };

  return (
    <PlanetsContext.Provider
      value={{ planets, isLoading, error, setError, search: onSearch, keyword }}
    >
      {children}
    </PlanetsContext.Provider>
  );
};
