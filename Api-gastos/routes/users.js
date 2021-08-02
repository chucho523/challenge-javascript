const express = require ('express');
const route = express.Router(); //routes
const joi = require('@hapi/joi'); //validator
const md5 = require('md5');//encrypt md5

let errorReg = {
    errorMsg: "",
    errorStatus: ""
}
//routes------------------------
//register
route.post('/register',(req, res) => {
    req.getConnection((err, conn) =>{
        if(err) return res.send(err);
        conn.query('use db_billetera');
        conn.query(`SELECT * FROM usuarios WHERE correo= '${req.body.correo}'`, (err, rows) =>{
            if(err) return res.send(err);
            if(rows.length > 0){
                errorReg = {
                    errorMsg: "The user already exists",
                    errorStatus: "400"
                }
                res.json(errorReg);
            }else{
                const {error} = validateEmail(req.body.correo, req.body.password);//validate email format
                if(error){
                    errorReg = {
                        errorMsg: "Enter a email address, and valid password",
                        errorStatus: "400"
                    }
                    res.json(errorReg);
                    return;
                }
                //register user
                req.body.password = md5(req.body.password);//encrypt password
                let token = tokenGenerator() + tokenGenerator();
                const user={
                    ...req.body, token
                }            
                conn.query('INSERT INTO usuarios set ?',[user] ,(err, rows) => {
                    if(err) return res.send(err)
                    res.send('the user has been registered');
                    
                });
                
            }
        });
    });
});

//LOGIN
route.post('/login', (req, res) => {
    req.getConnection((err, conn) =>{
        if(err) return res.send(err);
        conn.query('use db_billetera');
        conn.query(`SELECT * FROM usuarios WHERE correo= '${req.body.correo}'`, (err, rows) => {
            if(err) return res.send(err);
            if(rows.length > 0){
                //login success
                if(rows[0].password === md5(req.body.password)){
                    res.json(rows[0]);
                }else{
                    errorReg = {
                        errorMsg: "The password entered is incorrect",
                        errorStatus: "400"
                    }
                    res.json(errorReg);
                    
                }
            }else{
                //login failed
                errorReg = {
                    errorMsg: "The user entered does not exist or the password is not valid",
                    errorStatus: "400"
                }
                res.json(errorReg);
            }
        })

    })
})

//validate email for users
const validateEmail = (email, pass) =>{
    const schema = joi.object({
        correo: joi.string()
            .min(3)
            .max(30)
            .required()
            .email(),
        password: joi.string().min(3).max(16).required()
    });
    return (schema.validate({correo: email, password: pass}));
}

//GENERATE TOKEN
const tokenGenerator = () =>{
    return Math.random().toString(36).substr(2);
}
module.exports = route;

