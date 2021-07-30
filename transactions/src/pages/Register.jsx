import React, {useState} from 'react'
import '../styles/Login.css';
import usdLogin from '../img/usdLogin.png';
import {apiUrl} from '../services/api.jsx'
import axios from 'axios';

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
                setResult(response.data)
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
    const [result, setResult] = useState("");
    return (
       
        <div className="wrapper fadeInDown">
            <div id="formContent">               
                <div className="fadeIn first">
                <img src={usdLogin} className="mt-3" id="icon" alt="User Icon" />
                </div>
              
                <form onSubmit={handleSubmit}>
                <input type="text" id="login" className="fadeIn second" name="correo" placeholder="email" onChange={handleChange} />
                <input type="password" id="password" className="fadeIn third" name="password" placeholder="password" onChange={handleChange} />
                <input type="submit" className="fadeIn fourth" value="Sig In" />
                </form>
                
                {(error.error) 
                    ?
                        <div className="alert alert-danger" role="alert">
                            {error.errorMsg}
                        </div>
                    :
                        (
                            (result) &&
                            <div className="alert alert-success" role="alert">
                                {result}
                            </div>
                        )
                }
            </div>
        </div>
          
    )
}

export default Register
