import { connectMongoDB } from "../../db/db";
import { MongoDBConfig } from "../../helpers/interfaces";

//TODO tipar bien
export const listUsers = async (req: any, res: any, next: any) => {
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
		});
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
	} finally {
		// Cierra conexion
		if (client) {
			await client.close();
			console.log("Conexion finalizada");
		}
	}
};
