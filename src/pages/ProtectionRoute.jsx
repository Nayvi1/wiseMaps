import { useEffect } from "react";
import { useAuth } from "../contexts/useAuth";
import { useNavigate } from "react-router-dom";
/* eslint-disable react/prop-types */
function ProtectionRoute({ children }) {
  const navigate = useNavigate();

  const { isAuth } = useAuth();
  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);
  return <>{isAuth ? children : null};</>;
}

export default ProtectionRoute;
