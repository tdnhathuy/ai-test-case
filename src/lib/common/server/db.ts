// src/lib/server/db.ts
import { MongoClient } from 'mongodb';
import { MONGODB_URI, MONGODB_DB } from '$env/static/private';
import { EnumCollection } from '../enum/collection.enum';

const globalForMongo = globalThis as unknown as {
	mongoClient?: MongoClient;
};

export const client =
	globalForMongo.mongoClient ??
	new MongoClient(MONGODB_URI, {
		serverApi: { version: '1', strict: true, deprecationErrors: true }
	});

if (!globalForMongo.mongoClient) {
	globalForMongo.mongoClient = client;
}

export async function getDb() {
	await client.connect();
	return client.db(MONGODB_DB);
}

export const getProfileCollection = async () => {
	const db = await getDb();
	return db.collection(EnumCollection.Profile);
};
