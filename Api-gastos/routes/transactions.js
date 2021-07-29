const express = require('express');
const routeTransaction = express.Router();//routes
const joi = require('@hapi/joi'); //validator
const id_usuario = require('../userLoged');//id user loged

//routes------------
//add transaction
routeTransaction.post('/', (req, res) =>{
    if(!req.body.monto || !req.body.concepto || !req.body.tipo || !req.body.fecha || !req.body.id_usuario){
        return res.status(400).send('a parameter is missing');
    }
    req.getConnection((err, conn) => {
        if(err) return res.send(err);
        conn.query('use db_billetera');
        //add transaction
        conn.query('INSERT INTO operaciones set ?',[req.body] ,(err, rows) => {
            if(err) return res.send(err)
            res.send('the transaction has been added');
        });
    })
});

//update transaction
routeTransaction.put('/:id', (req, res) =>{
    if(!req.body.monto || !req.body.concepto || !req.body.tipo || !req.body.fecha || !req.body.id_usuario){
        return res.status(400).send('a parameter is missing');
    }
    req.getConnection((err, conn) => {
        if(err) return res.send(err);
        conn.query('use db_billetera');
        //add transaction
        conn.query('UPDATE operaciones set ? WHERE id = ?',[req.body, req.params.id] ,(err, rows) => {
            if(err) return res.send(err)
            res.send('the transaction has been updated');
        });
    })
});

//get all transactions per user
routeTransaction.get('/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if(err) return (res.send(err));
        conn.query('use db_billetera');
        //get transactions
        conn.query(`SELECT * FROM operaciones WHERE id_usuario = ${req.params.id}`, (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        })
    });
});

//get transactions for egress
routeTransaction.get('/egress/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if(err) return (res.send(err));
        conn.query('use db_billetera');
        //get transactions
        conn.query(`SELECT * FROM operaciones WHERE id_usuario = ${req.params.id} AND tipo='egress'`, (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        })
    });
});

//get transactions for ingress
routeTransaction.get('/ingress/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if(err) return (res.send(err));
        conn.query('use db_billetera');
        //get transactions
        conn.query(`SELECT * FROM operaciones WHERE id_usuario = ${req.params.id} AND tipo='ingress'`, (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        })
    });
});

//Delete transaction
routeTransaction.delete('/:id', (req, res) =>{
    req.getConnection((err, conn) => {
        if(err) return res.send(err);
        conn.query('use db_billetera');
        //add transaction
        conn.query('DELETE FROM operaciones WHERE id = ?',[req.params.id] ,(err) => {
            if(err) return res.send(err)
            res.send(`the transaction with id= ${req.params.id}has been deleted`);
        });
    })
});

module.exports = routeTransaction;