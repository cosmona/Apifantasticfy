import express from "express";
//^ Importamos el fichero .env
require("dotenv").config();

import { getDB } from "./db/db";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
	res.send("¡Hola, mundo!");
});

app.listen(port, () => {
	console.log(`Servidor escuchando en http://localhost:${port}`);
	getDB();
});
