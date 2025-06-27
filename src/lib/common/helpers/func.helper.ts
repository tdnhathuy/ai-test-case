import { ObjectId } from 'mongodb';
import { z } from 'zod/v4';

export const createJsonSchema = (schema: z.ZodObject<any>) => {
	const jsonSchema = z.toJSONSchema(schema);
	delete jsonSchema.$schema;
	return jsonSchema;
};

export const genMongoId = () => {
	return new ObjectId();
};
