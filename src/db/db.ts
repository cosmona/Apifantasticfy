import { MongoClient, ServerApiVersion, Db, Collection } from "mongodb";
import { MongoDBConfig } from "../helpers/interfaces";

export async function connectMongoDB(): Promise<{
	client: MongoClient;
	collection: Collection;
}> {
	const config: MongoDBConfig = {
		user: process.env.USER_MONGODB ? process.env.USER_MONGODB : "",
		password: process.env.PASSWORD ? process.env.PASSWORD : "",
		cluster: process.env.CLUSTER ? process.env.CLUSTER : "",
	};
	// Verificar si algún campo es una cadena vacía
	if (!config.user || !config.password || !config.cluster) {
		throw new Error(
			"Faltan variables de entorno para la configuración de MongoDB"
		);
	}

	const uri = `mongodb+srv://${config.user}:${config.password}@${config.cluster}.dpo7vlc.mongodb.net/?retryWrites=true&w=majority`;

	const client = new MongoClient(uri, {
		serverApi: {
			version: ServerApiVersion.v1,
			strict: true,
			deprecationErrors: true,
		},
	});

	await client.connect();
	const db = client.db("fantasticfy");
	const collection = db.collection("fantasticfy");
	/* 
	await client.db("admin").command({ ping: 1 });
	console.log(
		"Pinged your deployment. You successfully connected to MongoDB!"
	); */

	return { client, collection };
}
