const express = require ('express');
const route = express.Router(); //routes
const joi = require('@hapi/joi'); //validator






//middlewares


//routes------------------------
route.get('/', (req, res) =>{
    req.getConnection((err, conn) =>{
        if(err) return res.send(err);
        conn.query('use db_billetera');
        conn.query('SELECT * FROM usuarios', (err, rows) =>{
            if(err) return res.send(err);
            res.json(rows)
        });
    });
});
route.post('/',(req, res) => {
    res.send('user register');
})



module.exports = route;

