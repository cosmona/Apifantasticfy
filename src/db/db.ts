import { MongoClient, ServerApiVersion, Db, Collection } from "mongodb";
import { MongoDBConfig } from "../helpers/interfaces";

export async function connectMongoDB(
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

	await client.db("admin").command({ ping: 1 });
	console.log(
		"Pinged your deployment. You successfully connected to MongoDB!"
	);

	return { client, collection };
}
