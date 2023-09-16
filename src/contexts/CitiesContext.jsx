import { useEffect, useState } from "react";
import { citiesContext } from "./useCity";
/* eslint-disable react/prop-types */

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`http://localhost:6789/${"cities"}`);
        const data = await res.json();
        setCities(data);
      } catch {
        console.error("oops");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  return (
    <citiesContext.Provider
      value={{
        cities,
        isLoading,
        setIsLoading,
        setCurrentCity,
        currentCity,

      }}
    >
      {children}
    </citiesContext.Provider>
  );
}

export default CitiesProvider;
