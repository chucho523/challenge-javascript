import React, {useEffect} from 'react'
import Cookies from 'universal-cookie';
import styles from '../styles/Home.module.css';

const cookie = new Cookies();
const Home = () => {
    useEffect(() => {
        //if user exist redirect to menu
        if(cookie.get('token')){
            window.location.href="/menu"; 
        }
    }, [])
    return (
        <header className={`${styles.background} d-flex align-items-center justify-content-center`}>
            <div>
                <h1 className={styles.h1}>¡Welcome!</h1>
            </div>
        </header>
    )
}

export default Home
