import styles from './Login.module.css';
import React, {useState, useContext, useEffect} from 'react';
import LoginForm from './LoginForm';
import { useNavigate } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import { handleAuth } from '../../Reduxstore/Store';
import { push } from '../../Reduxstore/Store';


const authLogin = {
    "username" : "admin",
    "password" : "passw0rd"
}
function Login() {
    const [user_ID,setUserID] = useState();
    const [password, setPassword] = useState();
    const [invalid,setInvalid] = useState(false);
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const active =  useSelector(state=>state.flow.isLogin)

  // TODO: Implement login functionality
  //Event Lisnter from child

  const  handleSubmit= (data)=>{
   
    setInvalid(false);

    // store the credentials
    const username = data.username;
    const password = data.password;
    // setUserID(username);
    // setPassword(password);

    validation(username,password);
}

const  validation=async (username,password)=>{
    //console.log(username,password)
    // TODO: server side authentication need to setup
   /* if(!username || !password){
        setInvalid(true);
        setLoading(false);
        return;
    }
    if(username !== authLogin.username || password!== authLogin.password){
        setInvalid(true);
        setLoading(false);
        return;
    }*/
    //username === authLogin.username && password === authLogin.password
    if(true){
        setInvalid(false);
        setLoading(true);
        setTimeout(()=>{
            localStorage.setItem("session", "active");
            dispatch(handleAuth(true))
            const message =  {
                name: "Craft.ai",
                key: "bot-resume-res",
                response:"Hey! You are logged in, please upload your resume to get start...",
                componentType: "Resume"
            }
            navigate("/prompt")
            dispatch(push(message))
        },2000);
    }
 }

 useEffect(()=>{
   return ()=>{clearTimeout()};
 },[])

if(active){
   dispatch(handleAuth(true))
    return(
        <Navigate to="/prompt" replace />
    );
    }
  return (
    <div>
        <LoginForm onLogin={handleSubmit}/>
        <div className={styles.errors}>
        {invalid && <p className={styles.invalid}>Invalid credentials</p>}
        {loading && <p className={styles.loading}>Loging in...</p>}
        </div>
    </div>
)}

export default Login;