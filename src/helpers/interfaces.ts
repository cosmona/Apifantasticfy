import { ObjectId } from "mongodb";

export interface MongoDBConfig {
	user: string;
	password: string;
	cluster: string;
}

export interface UserData {
	_id?: any; //TODO _id any
	name: string;
	username: string;
	email: string;
	external_id: string;
	address: {
		street: string;
		city: string;
		country: string;
	};
}
