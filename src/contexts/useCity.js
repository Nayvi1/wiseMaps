import { createContext, useContext } from "react";

const citiesContext = createContext();

function useCity() {
  const city = useContext(citiesContext);
  if (city === undefined) throw new Error("Do not call useCity inside App component")
  return city;
}

export { citiesContext, useCity };
