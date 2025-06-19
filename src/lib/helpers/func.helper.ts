import { z } from 'zod/v4';

export const createJsonSchema = (schema: z.ZodObject<any>) => {
	const jsonSchema = z.toJSONSchema(schema);
	delete jsonSchema.$schema;
	return jsonSchema;
};
