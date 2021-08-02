import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NavBar from '../components/NavBar.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import Menu from '../pages/Menu.jsx';
import Home from '../pages/Home.jsx';
const Routes = () => {
    return (
        <Router>
            <header>
                <NavBar />
            </header>
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/menu">
                    <Menu />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/home">
                    <Home />
                </Route>
            </Switch>
        </Router>
    )
}
export default Routes
