import React from 'react';
import Cookies from 'universal-cookie';
import {useHistory} from 'react-router-dom'

const cookie = new Cookies();

const NavBar = () => {
    const history = useHistory();
    const logOut = (e) =>{
        e.preventDefault();
        cookie.remove('email', {path: '/'});
        cookie.remove('id', {path: '/'});
        cookie.remove('token', {path: '/'});
        history.push('/home');
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <p className="navbar-brand">Wallet</p>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
                        {(cookie.get('token'))
                            ?
                                <li className="nav-item">
                                    <button className="btn btn-primary" onClick={logOut}>Log Out</button>
                                </li>
                            :   
                                <li className="nav-item">
                                    <button className="btn btn-primary me-3" onClick={() => history.push('/login')}>Sing Up</button>
                                    <button className="btn btn-primary" onClick={() => history.push("/register")}>Sign In</button>
                                </li>

                        }
                        
                    </ul>
                </div>
            </div>   
        </nav>
    )
}

export default NavBar
