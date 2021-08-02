import React, {useState} from 'react'
import {apiUrl} from '../services/api.jsx'
import axios from 'axios';
import UserForm from '../components/UserForm.jsx';

const Register = () => {
    //functions--------------------------
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
                
            }
        }
        catch(e){
            console.log(e)
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
        <UserForm
            error={error} 
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            messageButton={`Sing In`}
        />
          
    )
}

export default Register
