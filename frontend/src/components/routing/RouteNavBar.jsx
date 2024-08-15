import { NavLink } from "react-router-dom";
import styles from "../Header.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleAuth,reset, handleReset} from "../../Reduxstore/Store";
import signpost from "../../assets/guider.png"





function NavBar(){
    const isLogin = useSelector(state=>state.flow.isLogin)
    const isUploaded = useSelector(state=>state.flow.isUploaded)
    const dispatch = useDispatch()
//    console.log(isUploaded, "upload state")
    const navigate = useNavigate()

    const loginHandler =(event)=>{
        //console.log(event.target.name)
        if(!isLogin){
            navigate("/login")
        }
        else{
            // sessionStorage.removeItem("messages")
            // sessionStorage.removeItem("uploaded")
            // console.log("year")
            sessionStorage.clear()
            dispatch(handleAuth(false))
            dispatch(handleReset())
            dispatch(reset())
           // navigate("/login")
            // // dispatch(reset())
        }
            
    }
    // useEffect(()=>{
    //     const auth = localStorage.getItem("auth")
    //     if(auth === "ba-ft-efo-er-re"){
    //         dispatch(handleAuth)
    //     }
    // },[])

    return(
        <div className={styles.header}>
            <NavLink to="/prompt" className={styles.logo}> <h1 >interviewCraft.ai</h1></NavLink>
           <div className={styles.guide}>
           <button className={styles.login} onClick={loginHandler}name={!isLogin?"login":"logout"}>{!isLogin?"Login":"Logout"}</button>
           { <a href="https://github.com/sudhaScode/interviewCraft.ai/blob/snb/GuideMe.md" target="_blank" rel="noreferrer"><img src={signpost} alt="Guide" className={styles["guide-image"]}/> </a>}
           </div>
      </div>
    );
}
export default NavBar;