import React, { useEffect, useState, useCallback, useRef } from 'react';  
import Chat from './Chat';
import ChatAction from "./ChatAction";
import styles from "./Chat.module.css";
import { useSelector, useDispatch } from 'react-redux'; 
import { push, handleMock } from '../../Reduxstore/Store';
import { useSnackbar } from 'notistack';

function ChatBot(){
    //console.log("messages:: ", messages)
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useDispatch();
    let storedMessages = useSelector(state=>state.chat.messages)
    const areMessages = sessionStorage.getItem("messages")
    const [messages, setMessages]  = useState(JSON.parse(areMessages) || storedMessages)
    const isLogin = useSelector(state=>state.flow.isLogin)
    const isUploaded = useSelector(state=>state.flow.isUploaded)
    const isMock = useSelector(state=>state.flow.isMock)
    const pushChat =(message)=>{
        //setConversation(prevState=> [...prevState, message]);
        dispatch(push(message))
    }
    const mockHandler=(event)=>{
        // console.log(mockENV)
        
        if(!isMock){
            dispatch(handleMock(true))
            // mockAPI()
            let resume = sessionStorage.getItem("fileName");
            if(resume){
             resume = resume.substring(0, resume.length/2).trim()
                sessionStorage.setItem("mock_id", `${resume}${Math.floor(Math.random()*99)+199}`)
            }
          
            enqueueSnackbar("Mock environment set up is successfull. Send a Mock prompt to start Interview",{variant:'success', autoHideDuration:4000})
       }
       else{
        dispatch(handleMock(false))
       }
    }

   useEffect(()=>{
        const areMessages = sessionStorage.getItem("messages")
        
        if(areMessages){
            setMessages(JSON.parse(areMessages));
        }
      
   }, [storedMessages])

//    useEffect(()=>{
//      if(!isLogin){
//         setMessages(chatInitialState.messages);
//      }
//    },[isLogin])
// useEffect(()=>{
    
// },[])

// useEffect(()=>{
// if(mockENV){
//     mockAPI()
// }
// },[mockENV])

    return(
        <div className={styles.container}>
           { isUploaded  && <div className={styles["check-mock"]}>
                <input type="checkbox" id="mock" checked={isMock} onChange={mockHandler} disabled={!isUploaded}/>
                <label htmlFor="mock"><span className={styles["mock-env"]} >Remember!</span> To Switch ON/OFF for Mock Interview Simulation </label>
           </div>}
            <Chat messages={messages}/>  
           {<ChatAction  isMock={isMock} />  }
        </div> 
    );
}
export default ChatBot;
