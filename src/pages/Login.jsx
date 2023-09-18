import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { useAuth } from "../contexts/useAuth";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const navigate = useNavigate();
  const { login, isAuth } = useAuth();
  useEffect(() => {
    if (isAuth) {
      navigate("/app", { replace: true });
    }
  }, [isAuth, navigate]);

  return (
    <main className={styles.login}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login(email, password);
        }}
        className={styles.form}
      >
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button>Login</Button>
        </div>
      </form>
    </main>
  );
}
