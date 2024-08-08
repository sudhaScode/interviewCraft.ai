import { useEffect, useState } from 'react';
import styles from './LoginForm.module.css';
import { useNavigate } from 'react-router-dom';


function SignupForm({onHandleSubmit}) {
  const[valid, setValid] = useState(true);
  const[isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  // TODO: Implement login functionality
  const onSubmit=async(e)=>{ 
    e.preventDefault();
    // store the credentials
    const username = e.target.username.value;
    const password = e.target[`new-password`].value;
    const confirmPassowrd = e.target[`confirm-password`].value;
    if(password !== confirmPassowrd){
      setValid(false)
      setIsSubmitted(false)
      return;
    }
    if(password && username){
    const data = {
        id: username,
        username,
        password
    }
    onHandleSubmit(data)
    setValid(true)
    setIsSubmitted(true)
  }
  }
  useEffect(()=>{
    
    return ()=>{
      clearTimeout()
    }

  },[])

  return (
    <div className={styles.authentization}>
      {
        isSubmitted?<p>User registered successfully</p>:
       <>
       <form  className={styles.loginform} onSubmit={onSubmit}>
            <label htmlFor='username'>Create User:</label>
            <input type="text" placeholder="User ID"className={styles.inputUser} name="username" id="username" required autoFocus/>
            <label htmlFor='new-password'>Create new Password:</label>
            <input type="new-password" placeholder="Password" className={styles.inputUser} name="new-password" id="new-password" required />
            <label htmlFor='confirm-password'>Confirm new Password:</label>
            <input type="new-password" placeholder="Confirm password" className={styles.inputUser} name="confirm-password" id="confirm-password" required />
            <button type="submit" className={styles.loginButton} disabled={!valid}>Signup</button>
        </form> 
        <p>Do you have an account? <a href="/login">Log In</a></p>
        {!valid && <p style={{backgroundColor:'red'}}>Username is not available</p>}
       </>
      
}
    </div>
)}

export default SignupForm;