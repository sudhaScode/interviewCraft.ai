import React from "react";
import styles from "./ChatDownloader.module.css"
import { saveDoc } from "../../constants/DocumentSaver";
import { useSnackbar } from "notistack";

function ChatDownloader({closeHandler}) {
  const { enqueueSnackbar } = useSnackbar()

const downloadHandlder =()=>{
  const check= saveDoc();
  if(check){
    enqueueSnackbar("Chat Downloaded", {variant:"success", autoHideDuration:2000})
    closeHandler()

    return
  }
  enqueueSnackbar("Try again \n Chat download failed!", {variant:"error", autoHideDuration:2000})
}

    return(
        <div className={styles["download-modal"]}>
          
          <h2>Please download the conversation, before moving on...</h2>
          <div className={styles["modal-actions"]}>
          <p>Saving work is good habit</p>
          <button className={styles["download-button"]} onClick={downloadHandlder}>Download Chat</button>
          </div>
        </div>
    )
}

export default ChatDownloader;