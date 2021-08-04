import React,{useEffect, useState} from 'react'
import axios from 'axios'
import {useHistory, useParams} from 'react-router-dom';
import {apiUrl} from '../services/api.jsx';
import Cookies from 'universal-cookie';
import styles from '../styles/Transaction.module.css';
import moment from 'moment'


const cookie = new Cookies(); 

const Transaction = () => {
    const history = useHistory();
    const {idTransaction} = useParams();
    //states
    const [dataTransaction, setDataTransaction] = useState({
        monto: "",
        concepto: "",
        tipo: "",
        fecha: "",
    });
    const [error, setError] = useState({
        error: false,
        errorMsg: ""
    })

    //functions
    const handleChange = async (e) =>{
        e.preventDefault();
        await setDataTransaction({
            ...dataTransaction,
            id_usuario: cookie.get('id'),
            token: cookie.get('token'),
            [e.target.name] : e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(dataTransaction)
        try{
            const response = await axios({
                url: `${apiUrl}/transactions/${idTransaction}`,
                method: 'PUT',
                data: dataTransaction
            });
            console.log(response)
            if(response.data.error){
                setError({
                    error: true,
                    errorMsg: response.data.error
                })
            }else{
                setError({
                    error: false,
                    errorMsg: ""
                })
            }
            
        }
        catch(e){
            console.log(e)
        }
    }
    const del = async(id) => {
        
        try{
            const response = await axios({
                url: `${apiUrl}/transactions/${id}`,
                method: 'DELETE',
                data: {
                    id_usuario: cookie.get('id'),
                    token: cookie.get('token'),
                }
            });
            console.log(response);
            history.push('/menu')
            
        }
        catch(e){
            console.log(e)
        }
    }
    
    useEffect(() => {
        axios.get(`${apiUrl}/transactions/one/${cookie.get('id')}/${idTransaction}`)
            .then(response => {
                setDataTransaction(response.data)
            })
       
        
    },[idTransaction]);
    return (
        <div className="d-flex justify-content-center align-items-center">
            <form onSubmit={handleSubmit} className={styles.formulario}>
                <div className={styles.item}>
                    <span className={styles.span}>Amount</span>
                    <input type="text" name="monto" placeholder="Amount" value={dataTransaction.monto} onChange={handleChange} className={styles.inputs}/>
                </div>
                <div className={styles.item}>
                    <span className={styles.span}>Concept</span>
                    <input type="text" name="concepto" placeholder="Concept" value={dataTransaction.concepto} onChange={handleChange} className={styles.inputs}/>
                </div>
                <div className={styles.item}>
                    <span className={styles.span}>Type</span>
                    <select disabled value={dataTransaction.tipo} name="tipo" placeholder="Type" onChange={handleChange} >
                        <option value="egress" >egress</option>
                        <option value="ingress" >ingress</option>
                    </select>
                    
                </div>
                <div className={styles.item}>
                    <span className={styles.span}>Date</span>
                    <input type="date" name="fecha" placeholder="Date" value={moment(dataTransaction.fecha).format('YYYY-MM-DD')} onChange={handleChange} />
                </div>
                <div className={`${styles.item} d-flex justify-content-center mt-3`}>
                    <button type="submit" className={`${styles.button} btn btn-success me-2`}>Edit</button>
                    <button className={`${styles.button} btn btn-danger`} onClick={()=> {del(idTransaction)}}>Delete</button>
                </div>
                {(error.error) &&
                    <div className="alert alert-danger" role="alert">
                            {error.errorMsg}
                    </div>
                }
            </form>
        </div>
    )
}

export default Transaction
