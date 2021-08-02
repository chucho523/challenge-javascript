import React, {useState, useEffect} from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import {apiUrl} from '../services/api.jsx';
import FormTransaction from '../components/FormTransaction.jsx';
import ShowTransactions from '../components/ShowTransactions.jsx';

const cookie = new Cookies();
const Menu = () => {

    //states
     const [user,setUser] = useState({
        id: "",
        email: "",
        token: ""
    })
    const [data, setData] = useState([])
    const [active, setActive] = useState(false); //active for modal FormTransaction
    const [type, setType] = useState("");

    //functions
    const toggle = () => {
        setActive(!active);
    }
    const callApi = async (path) =>{
        try{
            const response = await axios({
                url: `${apiUrl}${path}`,
                method: 'GET',
            })
                let dataLimited = response.data;
                dataLimited = dataLimited.splice(0, 10);
                setData(data => dataLimited)
            
        }
        catch(e){
            console.log(e);
        }
    }

    //hooks
    
    useEffect(() => {
        
        if(cookie.get('token')){
            callApi(`/transactions/${cookie.get('id')}`)
            setUser({
                id: cookie.get('id'),
                email: cookie.get('email'),
                token: cookie.get('token') 
            })
        }else{
            window.location.href="/home";
        }
        let limitedData = data.splice(0, 10);
        setData(limitedData)
    }, [user.id])

    
    return (
        <div>
            <FormTransaction 
                toggle={toggle}
                active={active}
                type={type}
            />
            <button className="btn btn-primary" onClick={() => 
                {
                    toggle();
                    setType(type=> "post")
                }
            }>Add Transaction</button>
            <p>{`Bienvenido ${user.email}`}</p>
            <ShowTransactions data={data} toggle={toggle} setType={setType} type={type}/>
        </div>
    )
}

export default Menu
