import { connectMongoDB } from "../../db/db";
import { MongoDBConfig } from "../../helpers/interfaces";
import { NextFunction, Request, Response } from "express";

export const listUsers = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const config: MongoDBConfig = {
		user: process.env.USER_MONGODB,
		password: process.env.PASSWORD,
		cluster: process.env.CLUSTER,
	};

	const { client, collection } = await connectMongoDB(config);
	try {
		// Realizar la consulta
		const result = await collection.find().toArray();
		res.send({
			status: "ok",
			message: "Usuarios Listados",
			usuarios: result,
			longitud: result.length,
		});
	} catch (error) {
		console.error("Error al listar usuarios", error);
	} finally {
		// Cierra conexion
		if (client) {
			await client.close();
			console.log("Conexion finalizada");
		}
	}
};
