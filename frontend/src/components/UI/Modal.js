import styles from './Modal.module.css';
import { Fragment } from 'react'; 
import ReactDOM from 'react-dom';  

const Backdrop = (props)=>{
    const handleBackdropClick =()=>{
        props.onClose()
    }

    return(
        <div  className={styles.backdrop} onClick={handleBackdropClick}></div>
    );
}
const ModalOverlay = props=>{
    return(
        <div className={`${styles.modal} ${props.className}`}>
            <div className={styles.content}>{props.children}</div>
        </div>
    );
}
const portalElement = document.getElementById("overlays");
function Modal (props){
   return(
    <Fragment>
        {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, portalElement)}
        {ReactDOM.createPortal(<ModalOverlay className={props.className}>{props.children}</ModalOverlay>, portalElement)}
    </Fragment>

   );
}
export default Modal;