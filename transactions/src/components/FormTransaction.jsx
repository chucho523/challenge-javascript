import React, {useState} from 'react'
import {Modal} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import styles from '../styles/FormTransaction.module.css';
import Cookies from 'universal-cookie';
import axios from 'axios';
import {apiUrl} from '../services/api.jsx'

const cookie = new Cookies();
const useStyles = makeStyles((theme) => (
    {
        modal:{
            position: 'absolute',
            width: 700,
            backgroundColor: 'white',
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2,4,3),
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',

        }
    }
));

const FormTransaction = (props) => {

    //get props
    const {active, toggle, type} = props;
    
    //functions
    
    const handleSubmit = (e) => {
        e.preventDefault();
        postApi()
    }
    const handleChange = (e) => {
        e.preventDefault();
        setDataTransaction({
            ...dataTransaction,
            token: cookie.get('token'),
            id_usuario: cookie.get('id'),
            [e.target.name] : e.target.value
        })
        console.log(dataTransaction);
    }
    const postApi = async (path) => {
        try{
            const response = await axios({
                url: `${apiUrl}/transactions`,
                method: 'POST',
                data: dataTransaction
            })

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
            console.log(e);
        }
    }
    
    //states
    const [dataTransaction, setDataTransaction] = useState({
        monto: "",
        concepto: "",
        tipo: "",
        fecha: "",
        id_usuario: "",
        token: ""
    })
    const [error, setError] = useState({
        error: false,
        errorMsg: ""
    })
    //styles
    const styles2 = useStyles();

    const body = (
        <div className={`${styles2.modal} d-flex justify-content-center`}>
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
                    { (type === "put") ?
                        <select value={dataTransaction.tipo} name="tipo" placeholder="Type" onChange={handleChange} disabled>
                            <option value="egress">egress</option>
                            <option value="ingress" >ingress</option>
                        </select>
                        :
                        <select value={dataTransaction.tipo} name="tipo" placeholder="Type" onChange={handleChange} >
                            <option value="egress" >egress</option>
                            <option value="ingress" >ingress</option>
                        </select>
                    }
                </div>
                <div className={styles.item}>
                    <span className={styles.span}>Date</span>
                    <input type="date" name="fecha" placeholder="Date" value={dataTransaction.fecha} onChange={handleChange} />
                </div>
                <div className={`${styles.item} d-flex justify-content-center`}>
                    <button className={`${styles.button} btn btn-success`}>{(type==="put")? <p>Edit</p> : <p>Add</p>}</button>
                </div>
                {(error.error) &&
                    <div className="alert alert-danger" role="alert">
                            {error.errorMsg}
                    </div>
                }
            </form>
        </div>
    )
    return (
        <Modal
            open={active}
            onClose={toggle}
        >
            {body}
        </Modal>
    )
}

export default FormTransaction
