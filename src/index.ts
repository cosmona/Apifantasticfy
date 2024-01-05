import express from "express";
import { listUsers } from "./controlers/users/listUsers";
import { newUser } from "./controlers/users/newUser";
import { sync } from "./controlers/users/sync";

require("dotenv").config();

const morgan = require("morgan");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT;

// Habilitar CORS para todas las rutas
app.use(cors());

//middleware para loguear peticiones http
app.use(morgan("dev"));
//middleware para pardear el JSON
app.use(express.json());

//^ENDPOINTS
app.get("/users/", listUsers); //^ GET/users
app.put("/users/", newUser); //^ PUT /users
app.post("/sync/", sync); //^ POST /sync

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
});
