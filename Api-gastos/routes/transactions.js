const express = require('express');
const routeTransaction = express.Router();//routes
const joi = require('@hapi/joi'); //validator
const id_usuario = require('../userLoged');//id user loged

//routes------------
//add transaction
routeTransaction.post('/', (req, res) =>{
    if(!req.body.monto || !req.body.concepto || !req.body.tipo || !req.body.categoria || !req.body.fecha || !req.body.id_usuario || !req.body.token){
        return res.json({error: 'a parameter is missing'});
    }
    req.getConnection((err, conn) => {
        if(err) return res.send(err);
        conn.query('use db_billetera');
        conn.query(`SELECT token FROM usuarios WHERE id = ${req.body.id_usuario}`, (err, rows) =>{
            if(rows[0].token != req.body.token){
                return res.json({error: 'the token is invalid'})
            }
        })
        const {monto, concepto, tipo, categoria, fecha, id_usuario} = req.body;
        const newBody = {monto, concepto, tipo, categoria, fecha, id_usuario};
        //add transaction
        conn.query('INSERT INTO operaciones set ?',[newBody] ,(err, rows) => {
            const {error} = validateAmount(req.body.monto);//validate amount format
            if(error){
                return res.json({error: "enter a valid amount"})
            }
            if(err) return res.send(err)
            res.json({data: 'the transaction has been added'});
        });
    })
});

//update transaction
routeTransaction.put('/:id', (req, res) =>{
    if(!req.body.monto || !req.body.concepto || !req.body.tipo || !req.body.categoria || !req.body.fecha || !req.body.id_usuario || !req.body.token){
        return res.json({error: 'a parameter is missing'});
    }
    req.getConnection((err, conn) => {
        if(err) return res.send(err);
        conn.query('use db_billetera');
        conn.query(`SELECT token FROM usuarios WHERE id = ${req.body.id_usuario}`, (err, rows) =>{
            if(rows[0].token != req.body.token){
                return res.json({error: 'the token is invalid'})
            }
        })
        const {monto, concepto, tipo, categoria, fecha, id_usuario} = req.body;
        const newBody = {monto, concepto, tipo, categoria, fecha, id_usuario};
        //add transaction
        conn.query('UPDATE operaciones set ? WHERE id = ?',[newBody, req.params.id] ,(err, rows) => {
            const {error} = validateAmount(req.body.monto);//validate amount format
            if(error){
                return res.json({error: "enter a valid amount"})
            }
            if(err) return res.send(err)
            res.json({data: 'the transaction has been updated'});
        });
    })
});

//get all transactions per user
routeTransaction.get('/all/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if(err) return (res.send(err));
        conn.query('use db_billetera');
        //get transactions
        conn.query(`SELECT * FROM operaciones WHERE id_usuario = ${req.params.id}`, (err, rows) => {
            if(err) return res.send(err);
            let reverse = rows.reverse();
            res.json(reverse);
        })
    });
});

//get all transactions per user limited
routeTransaction.get('/limited/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if(err) return (res.send(err));
        conn.query('use db_billetera');
        //get transactions
        conn.query(`SELECT * FROM operaciones WHERE id_usuario = ${req.params.id}`, (err, rows) => {
            if(err) return res.send(err);
            let reverse = rows.reverse();
            reverse = reverse.splice(0,10);
            res.json(reverse);
        })
    });
});

//get one transaction
routeTransaction.get('/one/:id/:idTransaction', (req, res) => {
    req.getConnection((err, conn) => {
        if(err) return (res.send(err));
        conn.query('use db_billetera');
        //get transactions
        conn.query(`SELECT * FROM operaciones WHERE id_usuario = ${req.params.id} AND id=${req.params.idTransaction}`, (err, rows) => {
            if(err) return res.send(err);
            res.json(rows[0]);
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
            let reverse = rows.reverse();
            res.json(reverse);
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
            let reverse = rows.reverse();
            res.json(reverse);
        })
    });
});

//Delete transaction
routeTransaction.delete('/:id', (req, res) =>{
    req.getConnection((err, conn) => {
        if(err) return res.send(err);
        conn.query('use db_billetera');
        conn.query(`SELECT token FROM usuarios WHERE id = ${req.body.id_usuario}`, (err, rows) =>{
            if(rows[0].token != req.body.token){
                return res.send('the token is invalid')
            }
        })
        //delete transaction
        conn.query('DELETE FROM operaciones WHERE id = ?',[req.params.id] ,(err) => {
            if(err) return res.send(err)
            res.send(`the transaction with id= ${req.params.id}has been deleted`);
        });
    })
});

const validateAmount = (amount) =>{
    const schema = joi.object({
        monto: joi.number()
            .required()
    });
    return (schema.validate({monto: amount}));
}

module.exports = routeTransaction;