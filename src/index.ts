import express from "express";
import { getDB } from "./db/db";

require("dotenv").config();

const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT;

//middleware para loguear peticiones http
app.use(morgan("dev"));
//middleware para pardear el JSON
app.use(express.json());

// ENDPOINTS
app.get("/", (req, res) => {
	res.send("¡Hola, mundo!");
});

// middleware 404 not found
app.use((req, res) => {
	res.status(404).send({
		status: "error",
		message: "Not found",
	});
});

// Express en escucha
app.listen(PORT, () => {
	console.log(`Servidor escuchando en http://localhost:${PORT}`);
	/* getDB(); */
});
