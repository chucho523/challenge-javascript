import React from 'react'
import '../styles/userForm.css';
import usdLogin from '../img/usdLogin.png';
const UserForm = (props) => {
    const {error, handleChange, handleSubmit, messageButton} = props;
    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">               
                <div className="fadeIn first">
                <img src={usdLogin} className="mt-3" id="icon" alt="User Icon" />
                <h4 className="my-3">{`${messageButton} Form`}</h4>
                </div>
            
                <form onSubmit={handleSubmit}>
                <input type="text" id="login" className="fadeIn second" name="correo" placeholder="email" onChange={handleChange} />
                <input type="password" id="password" className="fadeIn third" name="password" placeholder="password" onChange={handleChange} />
                <button type="submit" className="fadeIn fourth my-3 btn btnBg">{messageButton}</button>
                </form>
                
                {(error.error)&&                    
                        <div className="alert alert-danger" role="alert">
                            {error.errorMsg}
                        </div>
                    
                }
            </div>
        </div>
    )
}

export default UserForm
