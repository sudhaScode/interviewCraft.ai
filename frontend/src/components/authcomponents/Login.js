import styles from './Login.module.css';
import React, { useState, useEffect, useRef } from 'react';
import LoginForm from './LoginForm';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleAuth } from '../../Reduxstore/Store';
import { push } from '../../Reduxstore/Store';

const authLogin = {
    username: "admin",
    password: "passw0rd"
};

function Login() {
    const [user_ID, setUserID] = useState('');
    const [password, setPassword] = useState('');
    const [invalid, setInvalid] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const active = useSelector(state => state.flow.isLogin);
    const timeoutRef = useRef(null)

    const handleSubmit = (data) => {
        setInvalid(false);
        setLoading(true)

        // store the credentials
        const username = data.username;
        const password = data.password;

        validation(username, password);
    };

    const validation = async (username, password) => {
        // if (!username || !password) {
        //     setInvalid(true);
        //     setLoading(false);
        //     return;
        // }    
        // if (username !== authLogin.username || password !== authLogin.password) {
        //     setInvalid(true);
        //     setLoading(false);
        //     return;
        // }
        // setInvalid(false);
        // setLoading(true);
        timeoutRef.current =  setTimeout(() => {
            sessionStorage.setItem("session", "active");
            dispatch(handleAuth(true));
            const message = {
                name: "Craft.ai",
                key: "bot-resume-res",
                response: "Hey! You are logged in, please upload your resume to get start...",
                componentType: "Resume"
            };
            dispatch(push(message));
            navigate("/prompt");
        }, 2000);
    };

    // Only redirect if the user is already logged in
    useEffect(() => {
        if (active) {
            navigate("/prompt");
            setLoading(false)
        }
        // return ()=>{
        //     clearTimeout(timeoutRef.current)
        // }
    }, [active, navigate]);

    return (
        <div>
            <LoginForm onLogin={handleSubmit} />
            <div className={styles.errors}>
                {invalid && <p className={styles.invalid}>Invalid credentials</p>}
                {loading && <p className={styles.loading}>Logging in...</p>}
            </div>
        </div>
    );
}

export default Login;
