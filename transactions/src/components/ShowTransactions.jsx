import React from 'react';
import styles from '../styles/Table.module.css';
import moment from 'moment';
import {useHistory} from 'react-router-dom';

const ShowTransactions = (props) => {
    const {data} = props;
    const history = useHistory();
    const clickTransaction = (id) => {
        history.push(`/transaction/${id}`)
    }
    return (
        <div className={`${styles.containerTable} ${styles.bgTable} my-3`}>
                <table className={`table my-3 bg-table`}>
                    <thead>
                        <tr>
                            <th>Amount</th>
                            <th>Concept</th>
                            <th className={styles.hiden}>Type</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((transaction) => {
                                return(
                                    <tr onClick={() => clickTransaction(transaction.id)} key={transaction.id} id="trow" className={(transaction.tipo ==="egress") ?(styles.red) : (styles.green)}>
                                        <td>{transaction.monto}</td>
                                        <td>{transaction.concepto.slice(0,10)}</td>
                                        <td className={styles.hiden}>{transaction.tipo}</td>
                                        <td>{moment(transaction.fecha).format('DD/MM/YYYY')}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
        </div>
    )
}

export default ShowTransactions
