import { NavLink } from "react-router-dom";
import styles from "../Header.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleAuth,reset, handleReset} from "../../Reduxstore/Store";
import signpost from "../../assets/guider.png"
import { useState, useEffect, useRef, useCallback } from "react";
import Modal from "../UI/Modal";
import ChatDownloader from "../UI/ChatDownloader"






function NavBar(){
    const isLogin = useSelector(state=>state.flow.isLogin)
    const isUploaded = useSelector(state=>state.flow.isUploaded)
    const [modalState , setModalState] = useState(false)
    const dispatch = useDispatch()
//    console.log(isUploaded, "upload state")
    const navigate = useNavigate()
    const authRef = useRef(null)

    const onCloseHandler =useCallback(()=>{
        setModalState(false)
        sessionStorage.clear()
        dispatch(handleAuth(false))
        dispatch(handleReset())
        dispatch(reset())
    },[dispatch])

    const loginHandler =useCallback(()=>{
        //console.log(event.target.name)
        if(!isLogin){
            navigate("/login")
            onCloseHandler()
        }
        else{
            if(isUploaded){
                setModalState(true)
            }
            else{
                onCloseHandler()
            }
          
           // navigate("/login")
            // // dispatch(reset())
        }
            
    }, [isLogin, navigate, onCloseHandler, isUploaded])

    useEffect(()=>{
       
      if(isUploaded  && isLogin){
        const chatHanlder=(event)=>{
            loginHandler()
             // You can set a custom message here, but most browsers will not display it
             const message = 'You have unsaved changes. Please click on logout to leave';
             event.returnValue = message; // Standard for modern browsers
             return message; // For some older browsers
     }
     window.addEventListener("beforeunload", chatHanlder, false)

     return ()=>{
         window.removeEventListener("beforeunload", chatHanlder, true)
     }
      }
    },[isLogin, loginHandler, isUploaded])

    return(
        <div className={styles.header}>
            <NavLink to="/prompt" className={styles.logo}> <h1 >interviewCraft.ai</h1></NavLink>
           <div className={styles.guide}>
           <button className={styles.login} onClick={loginHandler}name={!isLogin?"login":"logout"} id ="auth-button" ref={authRef }>{!isLogin?"Login":"Logout"}</button>
           { <a href="https://github.com/sudhaScode/interviewCraft.ai/blob/snb/GuideMe.md" target="_blank" rel="noreferrer"><img src={signpost} alt="Guide" className={styles["guide-image"]}/> </a>}
           </div>
           {modalState && <Modal className={styles["modal-chat-download"]} onClose={()=>setModalState(false)}><ChatDownloader closeHandler={onCloseHandler}/></Modal>}
      </div>
    );
}
export default NavBar;