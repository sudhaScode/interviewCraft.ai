import Splitter from "./components/splitter/Splitter";
import React from "react";
import styles from "./Main.module.css";

function Main(){

    return(
        <div className={styles.main}>
       <Splitter/>
        </div>
    );

}
export default Main;