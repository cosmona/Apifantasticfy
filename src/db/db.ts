import { MongoClient, ServerApiVersion, Db, Collection } from "mongodb";

interface MongoDBConfig {
	user?: string;
	password?: string;
	cluster?: string;
}

async function connectMongoDB(
	promps: MongoDBConfig
): Promise<{ client: MongoClient; collection: Collection }> {
	const { user, password, cluster } = promps;

	const uri = `mongodb+srv://${user}:${password}@${cluster}.dpo7vlc.mongodb.net/?retryWrites=true&w=majority`;

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

	return { client, collection };
}

export async function getDB(): Promise<void> {
	const config: MongoDBConfig = {
		user: process.env.USER_MONGODB,
		password: process.env.PASSWORD,
		cluster: process.env.CLUSTER,
	};

	console.log("MongoDB Config:", config);

	const { client, collection } = await connectMongoDB(config);
	try {
		await client.db("admin").command({ ping: 1 });
		console.log(
			"Pinged your deployment. You successfully connected to MongoDB!"
		);

		// Realizar una consulta (equivalente a SELECT * FROM collection)
		const result = await collection.find().toArray();
		console.log(result);
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
	} finally {
		// Asegurarse de cerrar la conexión incluso si ocurre un error
		if (client) {
			await client.close();
			console.log("Conexion finalizada");
		}
	}
}
