import { Request, Response, NextFunction } from "express";
import { connectMongoDB } from "../../db/db";
import { UserData } from "../../helpers/interfaces";

export const newUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { user } = req.body;
	const { v4: uuidv4 } = require("uuid");

	const { client, collection } = await connectMongoDB();

	const newUserData: UserData = {
		_id: uuidv4(), // genera un identificador único
		name: user[0].name,
		username: user[0].username,
		email: user[0].email,
		external_id: uuidv4(), // genera un identificador único
		address: {
			street: user[0].address.street,
			city: user[0].address.city,
			country: user[0].address.country,
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
