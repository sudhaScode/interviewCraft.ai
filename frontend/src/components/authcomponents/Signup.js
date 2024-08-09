import styles from './Login.module.css';
import React, {useState, useContext, useEffect} from 'react';
import SignupForm from './SignupForm';
import { useNavigate } from 'react-router-dom';
import { Navigate } from "react-router-dom";

function Signup() {
    const [user_ID,setUserID] = useState();
    const [password, setPassword] = useState();
    const [invalid,setInvalid] = useState(false);
    const [loading,setLoading] = useState(false);

    const navigate = useNavigate();
    const active = window.localStorage.getItem("session")==="active"?true:false;

  // TODO: Implement login functionality
  //Event Lisnter from child

  const  handleSubmit= (data)=>{
   
    setInvalid(false);
    setLoading(true)
    // store the credentials
    const username = data.username;
    const password = data.password;
    setUserID(username);
    setPassword(password);

    // check if the credentials are valid
    //console.log(userid,password, "login DEBUG")
    // validate the credentials
    validation(username,password);
}

const  validation=(username,password)=>{
    
    setTimeout(()=>{navigate("/login")}, 1000)
 }
 useEffect(()=>{
   return ()=>{clearTimeout()}
 },[])
if(active){

    return(
        <Navigate to="/login" replace />
    );
    }
  return (
    <>
        <SignupForm onHandleSubmit={handleSubmit}/>
        <div className={styles.errors}>
        {invalid && <p className={styles.invalid}>Invalid credentials</p>}
        {loading && <p className={styles.loading}>Please login...</p>}
        </div>
    </>
)}

export default Signup;