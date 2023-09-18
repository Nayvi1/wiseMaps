import { useReducer } from "react";
import { AuthContext } from "./useAuth";

/* eslint-disable react/prop-types */

const initinalState = {
  user: null,
  isAuth: false,
};

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuth: true };

    case "logout":
      return { ...state, user: null, isAuth: false };
    default:
      break;
  }
}

function AuthProvider({ children }) {
    const [{ user, isAuth }, dispatch] = useReducer(reducer, initinalState);
    
    function login(email, password) {
        if (email === FAKE_USER.email && password === FAKE_USER.password)
        dispatch({ type: "login", payload: FAKE_USER });

  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ login, logout, user, isAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
