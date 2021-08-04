import React, {useState, useEffect} from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import {apiUrl} from '../services/api.jsx';
import FormTransaction from '../components/FormTransaction.jsx';
import ShowTransactions from '../components/ShowTransactions.jsx';
import styles from '../styles/Menu.module.css';

const cookie = new Cookies();
const Menu = () => {

    //states
     const [user,setUser] = useState({
        id: "",
        email: "",
        token: ""
    })
    const [data, setData] = useState([])
    const [dataTransaction, setDataTransaction] = useState({
        monto: "",
        concepto: "",
        tipo: "",
        fecha: ""
    })
    const [active, setActive] = useState(false); //active for modal FormTransaction
    const [type, setType] = useState("");
    const [typeTransaction, setTypeTransaction] = useState({
        type: ""
    })
    //functions
    const toggle = () => {
        setActive(!active);
    }
    const handleChangeFilter = (e) =>{
        e.preventDefault();
        setTypeTransaction({
            [e.target.name] : e.target.value
        })
    }

    const callApi = async (path) =>{
        try{
            const response = await axios({
                url: `${apiUrl}${path}`,
                method: 'GET',
            })
            setData(response.data);
            console.log(response.data)
                
            
        }
        catch(e){
            console.log(e);
        }
    }

    //hooks
    
    useEffect(() => {
        setTypeTransaction({
            type: "all"
        })
        if(cookie.get('token')){
            callApi(`/transactions/limited/${cookie.get('id')}`)
            setUser({
                id: cookie.get('id'),
                email: cookie.get('email'),
                token: cookie.get('token') 
            })    
        }else{
            window.location.href="/home";
        }

    }, [])

    
    return (
        <div className={`${styles.menu}`}>
            <FormTransaction 
                toggle={toggle}
                active={active}
                type={type}
                data={dataTransaction}
            />
            <button className="btn btn-primary" onClick={() => 
                {
                    toggle();
                    setType(type=> "post")
                }
            }>Add Transaction</button>
            <select name="type" value={typeTransaction.type} onChange={handleChangeFilter}>
                <option value="all">All</option>
                <option value="egress">egress</option>
                <option value="ingress">ingress</option>
            </select>
            <button className="btn btn-primary" onClick={
                () => {
                    console.log(`/transactions/${typeTransaction.type}`);
                    callApi(`/transactions/${typeTransaction.type}`)
                    
                }
            }>Apply filters</button>
            <ShowTransactions data={data} toggle={toggle} setType={setType} type={type}/>
            
        </div>
    )
}

export default Menu
