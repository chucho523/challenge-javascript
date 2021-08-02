import React, {useEffect} from 'react'
import Cookies from 'universal-cookie';

const cookie = new Cookies();
const Home = () => {
    useEffect(() => {
        //if user exist redirect to menu
        if(cookie.get('token')){
            window.location.href="/menu"; 
        }
    }, [])
    return (
        <div>
            <p>{`Bienvenidos`}</p>
        </div>
    )
}

export default Home
