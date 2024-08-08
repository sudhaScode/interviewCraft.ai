import Login from "./Login";
import styles from "./LoginPage.module.css";
import { Card } from "../UI/Card";
import Welcome from "../UI/Welcome";

const LoginPage = () => {
  return (
    <Card className={styles.container}>
      <Welcome/>
      <Login />
    </Card>
  );
};

export default LoginPage;