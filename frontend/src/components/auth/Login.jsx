import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleAuth } from "../../reduxstore/Store";

function Login (){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const messages = useSelector(state=>state.chat.messages)
    const authHandler =()=>{
        // localStorage.setItem("auth","ba-ft-efo-er-re");
        navigate("/prompt", { replace: true })
        dispatch(handleAuth(true))
        //sessionStorage.setItem("messages", JSON.stringify(messages))
    }

    return(
        <button onClick={authHandler}>Login</button>
    )
}
export default Login;