import React from 'react';
import styles from '../styles/Table.module.css';
import moment from 'moment';

const ShowTransactions = (props) => {
    const {data, toggle, setType} = props;
    return (
        <div className={`${styles.containerTable} ${styles.bgTable} my-3`}>
            <div className={`${styles.subContainer}`}>
                <table className={`table my-3 bg-table`}>
                    <thead>
                        <tr>
                            <th>Amount</th>
                            <th>Concept</th>
                            <th>Type</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((transaction) => {
                                return(
                                    <tr key={transaction.id} className={transaction.tipo ==="egress" ?styles.red : styles.green}>
                                        <td>{transaction.monto}</td>
                                        <td>{transaction.concepto}</td>
                                        <td>{transaction.tipo}</td>
                                        <td>{moment(transaction.fecha).format('DD/MM/YYYY')}</td>
                                        <td><button className="btn btn-primary" onClick={() => 
                                            {
                                                toggle();
                                                setType(type=> "put")
                                            }
                                            }>Edit</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ShowTransactions
