import { createContext, useContext } from "react";

const AuthContext = createContext();

function useAuth() {
  const auth = useContext(AuthContext);
  if (auth === undefined)
    throw new Error("Do not call useAuth inside App component");
  return auth;
}

export { AuthContext, useAuth };
