import React,{useEffect, useState, Fragment} from 'react'
import axios from 'axios'
import {useHistory, useParams} from 'react-router-dom';
import {apiUrl} from '../services/api.jsx';
import Cookies from 'universal-cookie';
import styles from '../styles/Transaction.module.css';
import moment from 'moment'
import {ToastContainer, toast} from 'react-toastify';

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
    const notification  = (message) =>{
        toast.success(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }
    const notificationErr = (message) =>{
        toast.error(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }
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
                notification('user edited')
            }
            
        }
        catch(e){
            notificationErr(e.message)
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
            if(response.data){
                notification('user deleted')
                history.push('/menu')
            }
            
            
        }
        catch(e){
            notificationErr(e.message)
        }
    }
    
    useEffect(() => {
        if(!cookie.get('token')){
            history.push('/menu');
        }
        axios.get(`${apiUrl}/transactions/one/${cookie.get('id')}/${idTransaction}`)
            .then(response => {
                setDataTransaction(response.data)
            })
       
        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[idTransaction]);
    return (
        <Fragment>
            <i className={`fas fa-arrow-circle-left ${styles.icon}`} onClick={() => {history.push('/menu')}}></i>
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
            <div className="d-flex justify-content-center align-items-center">
                
                <form onSubmit={handleSubmit} className={styles.formulario}>
                
                    <div className={styles.item}>
                        <span className={styles.span}><b>Amount: </b></span>
                        <input type="text" name="monto" placeholder="Amount" value={dataTransaction.monto} onChange={handleChange} className={styles.inputs}/>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.span}><b>Concept: </b></span>
                        <input type="text" name="concepto" placeholder="Concept" value={dataTransaction.concepto} onChange={handleChange} className={styles.inputs}/>
                    </div>
                    <div className={`${styles.item} mt-2`}>
                        <span className={styles.span}><b>Type: </b></span>
                        <select disabled value={dataTransaction.tipo} name="tipo" placeholder="Type" onChange={handleChange} >
                            <option value="egress" >egress</option>
                            <option value="ingress" >ingress</option>
                        </select>
                        
                    </div>
                    <div className={`${styles.item} mt-2`}>
                        <span className={styles.span}><b>Date: </b></span>
                        <input type="date" name="fecha" placeholder="Date" value={moment(dataTransaction.fecha).format('YYYY-MM-DD')} onChange={handleChange} />
                    </div>
                    <div className={`${styles.item} d-flex justify-content-center mt-3`}>
                        <button type="submit" className={`${styles.button} btn btn-success me-2`}>Edit</button>
                        <button className={`${styles.button} btn btn-danger`} onClick={()=> {del(idTransaction)}}>Delete</button>
                    </div>
                    {(error.error) &&
                        <div className="alert alert-danger mt-3" role="alert">
                                {error.errorMsg}
                        </div>
                    }
                </form>
            </div>
        </Fragment>
    )
}

export default Transaction
