import { Request, Response, NextFunction } from "express";
import { connectMongoDB } from "../../db/db";
import { UserData } from "../../helpers/interfaces";

export const newUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log("req.body", req.body);
	const { name, username, email, street, city, country } = req.body;
	const { v4: uuidv4 } = require("uuid");

	const { client, collection } = await connectMongoDB();

	const newUserData: UserData = {
		_id: uuidv4(), // genera un identificador único
		name: name,
		username: username,
		email: email,
		external_id: uuidv4(), // genera un identificador único
		address: {
			street: street,
			city: city,
			country: country,
		},
	};

	try {
		const result: any = await collection.insertOne(newUserData);
		if (result.insertedId != undefined) {
			res.send({
				status: "ok",
				message: "Nuevo usuario insertado correctamente",
			});
		}
	} catch (error) {
		console.error("Error al insertar nuevo usuario", error);
	} finally {
		if (client) {
			// Cierra conexion
			await client.close();
			console.log("Conexion finalizada");
		}
	}
};
