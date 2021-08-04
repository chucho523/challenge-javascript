import React, {useState, useEffect} from 'react'
import {apiUrl} from '../services/api.jsx'
import axios from 'axios';
import UserForm from '../components/UserForm.jsx';
import {notificationSuccess, notificationError} from '../services/notification.jsx';
import {ToastContainer} from 'react-toastify';
import {useHistory} from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookie = new Cookies();

const Register = () => {
    const history = useHistory();
    //functions--------------------------
    useEffect(() => {
        if(cookie.get('token')){
            history.push('/menu');
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const signIn = async() =>{
        try{
            const response = await axios({
                url: `${apiUrl}/users/register`,
                method: 'POST',
                data: user
            })
            if(response.data.errorMsg){
                setError({
                    error: true,
                    errorMsg: response.data.errorMsg,
                });
                
            }
            else{
                setError({
                    error: false,
                    errorMsg: ""
                });
                notificationSuccess('successfully registered user');
                history.push('/login')
            }
        }
        catch(e){
            notificationError(e.message)
        }
    }
    const handleChange = async(e) =>{
        e.preventDefault();
        await setUser({
            ...user,
            [e.target.name] : e.target.value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        signIn();      
    }
    //states--------------------------------
    const [user, setUser] = useState({
        correo: "",
        password: ""
    });
    const [error, setError] = useState({
        error: false,
        errorMsg: ""
    })
    
    return (
        <div>
            <ToastContainer 
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            <UserForm
                error={error} 
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                messageButton={`Sing In`}
            />
        </div>
          
    )
}

export default Register
