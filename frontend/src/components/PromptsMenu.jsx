import React, {useState} from "react";
import styles from "./PromptsMenu.module.css";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { resume, interview, mock } from "../constants/prompts";
import { useDispatch } from "react-redux";
import {handleUpload} from "../Reduxstore/Store"

function PromptsMenu() {

    const [show, setShow] = useState(false);
    const [isResume, setIsResume] = useState(false);
    const [isInterview, setIsInterview] = useState(false);
    const [isMock, setIsMock] = useState(false);
    const disptch = useDispatch()

    const onClickoptionHandler=(event)=>{
      let eventName = event.target.name;
      //console.log("EVENT DEBUG:: ", eventName )
      switch(eventName){
        case "resume":
            setIsMock(false)
            setIsInterview(false);
            setIsResume((prevState)=>!prevState);
            break;
        case "interview":
            setIsInterview((prevState)=>!prevState);
            setIsMock(false)
            setIsResume(false)
            break;
        case "mock":
            setIsResume(false);
            setIsInterview(false);
            setIsMock((prevState)=>!prevState);
            break;
        default:
            console.error("Unknown event triggered");    
      }
    }

    const resetHanlder=()=>{
        disptch(handleUpload(false))
        localStorage.clear("fileName")
        sessionStorage.setItem("uploaded", "false")
    }
    return (
        <div className={styles["left-nav"]}>
            <div className={styles["nav-conatiner"]}>
                    <button className={styles["dropdown-prompts"]} onMouseOver={() => { setShow(true) }}>
                        Prompts<KeyboardArrowDownIcon className={styles["drop-icon"]} />
                    </button>
                {show &&
                        <div className={styles["prompt-menu"]} onMouseLeave={() => { setShow(false) }}>
                            <ul>
                                <li><button className={isResume?styles["menu-button-active"]:styles["menu-button"]} onClick={onClickoptionHandler} name="resume">Resume Enhancement</button></li>
                                <li><button className={isInterview?styles["menu-button-active"]:styles["menu-button"]} onClick={onClickoptionHandler} name="interview">Interview Preparation</button></li>
                                <li><button className={isMock?styles["menu-button-active"]:styles["menu-button"]} onClick={onClickoptionHandler} name= "mock">Mock Interview</button></li>
                            </ul>
                        </div>
                         
                        }
            </div>

            {isResume && <div className={styles["prompts-list"]}>
            <p className={styles.predefined}>Prompts for Resume Enhancement</p>
            <div className={styles["prompts-container"]}>
                 {resume.map((prompt,index)=>(<p key={index}>{prompt}</p>))}</div> </div>}
            {isInterview && <div>
                <p className={styles.predefined}>Prompts for Interview Preparation </p>
            <div className={styles["prompts-container"]}> {interview.map((prompt,index)=>(<p key={index}>{prompt}</p>))}</div> </div>}
            {isMock && <div>
                <p className={styles.predefined}><label htmlFor="mock" style={{cursor:"pointer"}}> Make sure to check Mock Interview for better results.</label></p>
            <div className={styles["prompts-container"]}> {mock.map((prompt,index)=>(<p key={index}>{prompt}</p>))}</div> </div>}
        {<button className={styles.reset} onClick={resetHanlder}>Reset</button>}
        </div>

    );
}

export default PromptsMenu;