import { connectMongoDB } from "../../db/db";
import { Request, Response, NextFunction } from "express";

export const sync = async (req: Request, res: Response, next: NextFunction) => {
	const { v4: uuidv4 } = require("uuid");
	const url = process.env.EXTERNAL_API;
	if (url) {
		const resExternal = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!resExternal.ok) {
			throw new Error("Error en la consulta a api de terceros");
		}

		const data = await resExternal.json();
		const { client, collection } = await connectMongoDB();

		data.map(async (elemento: any) => {
			const query = { _id: elemento.id };
			const update = {
				$set: {
					name: elemento.name,
					username: elemento.username,
					email: elemento.email,
					external_id: uuidv4(),
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
	}
};
