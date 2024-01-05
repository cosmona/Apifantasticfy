import { connectMongoDB } from "../../db/db";
import { MongoDBConfig, UserData } from "../../helpers/interfaces";
import { Request, Response, NextFunction } from "express";

export const sync = async (req: Request, res: Response, next: NextFunction) => {
	const { v4: uuidv4 } = require("uuid");
	const config: MongoDBConfig = {
		user: process.env.USER_MONGODB,
		password: process.env.PASSWORD,
		cluster: process.env.CLUSTER,
	};

	const resExternal = await fetch(
		"https://jsonplaceholder.typicode.com/users",
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		}
	);

	if (!resExternal.ok) {
		throw new Error("Error en la consulta a api de terceros");
	}

	const data = await resExternal.json();
	const { client, collection } = await connectMongoDB(config);

	data.map(async (elemento: any) => {
		const query = { _id: elemento.id };
		const update = {
			$set: {
				name: elemento.name,
				username: elemento.username,
				email: elemento.email,
				address: {
					street: elemento.address.street,
					city: elemento.address.city,
					country: elemento.address.country
						? elemento.address.country
						: "Pais Desconocido",
				},
			},
		};
		const options = { upsert: true }; // Actualiza si existe, inserta si no existe
		await collection.updateOne(query, update, options);
	});

	res.send({
		status: "ok",
		usuarios: data,
	});
};
