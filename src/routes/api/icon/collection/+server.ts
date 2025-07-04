import { responseSuccess } from '@/lib/common/helpers/api.helper';
import { getBody } from '@/lib/common/helpers/server.helper.js';
import { validateInfo } from '@/lib/common/server/helper.server.js';
import type { PayloadCreateIconCollection } from '@/lib/common/services/icon.service.js';
import { ObjectId } from 'mongodb';

export const POST = async (event) => {
	const { IconCollectionModel } = await validateInfo(event);
	const body = await getBody<PayloadCreateIconCollection>(event);

	if (!body.name) {
		return new Response(JSON.stringify({ error: 'Name is required' }), { status: 400 });
	}

	const iconCollection = await IconCollectionModel.create({
		_id: new ObjectId(),
		name: body.name,
		icon: []
	});

	return new Response(JSON.stringify({ name: iconCollection.name }), { status: 200 });
};

export const GET = async (event) => {
	const { IconCollectionModel } = await validateInfo(event);

	const iconCollections = await IconCollectionModel.find({});

	return responseSuccess({
		data: iconCollections
	});
};
