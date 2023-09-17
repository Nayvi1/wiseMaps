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
        const res = await fetch(`http://localhost:6789/cities`);
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

  async function postData(cityData){
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:6789/cities`,{
        method: "POST",
        body: JSON.stringify(cityData),
        headers:{
          "Content-Type" : "application/json"
        }
      })
      const data = await res.json();
      console.log(data);

      
    } catch (error) {
      console.error("oops");
    } finally{
      setIsLoading(false);
    }
  }

  return (
    <citiesContext.Provider
      value={{
        cities,
        isLoading,
        setIsLoading,
        setCurrentCity,
        currentCity,
        postData,
      }}
    >
      {children}
    </citiesContext.Provider>
  );
}

export default CitiesProvider;
