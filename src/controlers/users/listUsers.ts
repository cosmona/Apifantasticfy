import { connectMongoDB } from "../../db/db";
import { NextFunction, Request, Response } from "express";

export const listUsers = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { client, collection } = await connectMongoDB();
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
