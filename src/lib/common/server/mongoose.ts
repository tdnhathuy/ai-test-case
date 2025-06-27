// src/lib/server/mongo.ts
import mongoose from 'mongoose';
import { MONGODB_DB, MONGODB_URI } from '$env/static/private';

const { connection } = mongoose;
export async function connectMongo() {
	if (connection.readyState === 0) {
		await mongoose.connect(MONGODB_URI, {
			dbName: MONGODB_DB
		});
	}
}
