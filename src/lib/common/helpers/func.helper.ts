import objectId from 'bson-objectid';
import { z } from 'zod/v4';

export const createJsonSchema = (schema: z.ZodObject<any>) => {
	const jsonSchema = z.toJSONSchema(schema);
	delete jsonSchema.$schema;
	return jsonSchema;
};

export const genMongoId = (): string => {
	return objectId().toString();
};
