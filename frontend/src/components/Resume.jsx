import React, {useRef, useState, useEffect} from "react";
import styles from "./Resume.module.css";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDispatch, useSelector } from "react-redux";
import { handleUpload, push  } from "../Reduxstore/Store"



function Resume() {
    const inputRef = useRef("");
    // const [filePlaceholder, setFilePlaceholder] = useState("SELECT RESUME");
    //const [timerId, setTimerID] = useState("");
    const [fileInput, setInput] = useState(null);
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    let messages = useSelector(state=>state.chat.messages)

  const onFileHandler=(event)=>{
    //const inputElement = document.getElementById("filePlaceholder");
    event.stopPropagation();
    if(inputRef.current){
        inputRef.current.click();
    }   
  }
  const onUploadFile= async(event)=>{
    setLoader(true);
    event.preventDefault();
    /*
    let timer = setTimeout(()=>{
      //console.log("setting loader false");
    setInput(false)}, 2000);
    setTimerID(timer);*/
   // console.log(file, "selected file");
    //setFilePlaceholder("SELECT RESUME");
    fetchAPI(fileInput)
 
  }
  const onFileChange=  (event)=>{
    event.stopPropagation()
    const file = event.target.files[0];
    localStorage.setItem("fileName", file.name)// for later use
    setInput(file)
    //const slectedFile = new FileReader();
  }
  const fetchAPI = async(fileInput)=>{
    //console.log(fileInput)
      try{
        const fileData = new FormData();
        fileData.append('file', fileInput)
    //   const response = await fetch("http://127.0.0.1:8000/load", {
    //     method : "POST",
    //   body: fileData
    // })
    //   if(response.ok){
    //     //console.log("RESPONSE DEBUG::",response)
    //     setLoader(false);
    //     sessionStorage.setItem("uploaded", true)
    //     dispatch(handleUpload(true))
    //     const message =  {
    //       name: "Craft.ai",
    //       key: "bot-resume-res",
    //       response:"Thanks for providing the resume, I am here to help you..."
    //   }
    //   // const persistedMessages =JSON.parse( sessionStorage.getItem("messages"))
    //   // persistedMessages.push(message)
    //    let storeMessage = [...messages, message]
    //    sessionStorage.setItem("messages", JSON.stringify(storeMessage))
    
    //     //pushChat(message);
    //     dispatch(push(message))
        //sessionStorage.setItem("messages", JSON.stringify(messages))
        
      // }
     }
     catch(error){
      console.log("An error occured", error)
     }
  }
  // const isUploaded = useSelector(state=>state.flow.isUploaded)
  //   useEffect(()=>{
        
  //       // if(!areMessages){
  //       //    sessionStorage.setItem("messages", JSON.stringify(messages)) 
  //       // }
  //       if(isUploaded){
           
  //        }
  //   },[isUploaded])
  
    return (
        <div className={styles["form-container"]}>
           <form onSubmit={onUploadFile} >
           <input name="fileinput" type="file" required style={{display:"none"}} ref={inputRef} id="filePlaceholder" onChange={onFileChange}/>
           <div>
           {!fileInput?<button className={styles["resume-button"]} onClick={(event)=>onFileHandler(event)}><CloudUploadIcon className={styles["cloud-icon"]} /><p className={styles.selector}>SELECT RESUME</p></button>:
           <button className={styles["resume-button"]}><p className={styles["resume-selected"]}>RESUME SELECTED</p></button>}
           </div>
          <div className={styles["checkbox-one"]}> <input type="checkbox" id="checkOne" name ="resumeenhancing" defaultChecked/><label htmlFor="checkOne">Resume Enhancing</label></div>
          <div className={styles["checkbox-two"]}> <input type="checkbox" id="checkTwo" name ="interviewpreparation" defaultChecked/><label htmlFor="checkTwo" >Interview Preparation</label></div>
          <div className={styles["checkbox-three"]}> <input type="checkbox" id="checkThree" name ="mockinterview" defaultChecked/><label htmlFor="checkThree">Mock Interview</label></div>
           <button type="submit" className={!fileInput?styles["submit-button"]:styles["submit-button-activated"]}>UPLOAD</button>
           </form>
           {loader && <p className={styles.selected}>Setting up prompts...</p>}
        </div>
    );
}

export default Resume;


/**
 import React from "react";
import styles from "./Resume.module.css";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
//import { grey } from '@mui/material/colors';


function Resume() {
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      });
      


    return (
        <div className={styles["form-container"]}>
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                backgroundColor="#b28704"
            >
                SELECT RESUME
                <VisuallyHiddenInput type="file" />
            </Button>

        </div>
    );
}

export default Resume;
 */