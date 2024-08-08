import styles from './LoginForm.module.css';

function LoginForm(props) {
  // TODO: Implement login functionality
  const handleSubmit=(e)=>{
    e.preventDefault();
    // store the credentials
    const username = e.target.username.value;
    const password = e.target.password.value;
    const data = {
      username,
        password
    }
    props.onLogin(data);
  }

  return (
    <div className={styles.authentization}>
        <form  className={styles.loginform} onSubmit={handleSubmit}>
            <input type="text" placeholder="User Name"className={styles.inputUser} name="username" required autoFocus/>
            <input type="password" placeholder="Password" className={styles.inputUser} name="password" required />
            <button type="submit" className={styles.loginButton}>Login</button>
        </form> 
        <p>Don't have an account? <a href="/signup">Sign up</a></p>
    </div>
)}

export default LoginForm;