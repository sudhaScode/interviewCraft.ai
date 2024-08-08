import Signup from "./Signup";
import styles from "./LoginPage.module.css";
import { Card } from "../UI/Card";
import Welcome from "../UI/Welcome";

const SignupPage = () => {
  return (
    <Card className={styles.container}>
      <Welcome/>
      <Signup />
    </Card>
  );
}
export default SignupPage;