import { json } from '@sveltejs/kit';

export const responseSuccess = <T>(data: T) => {
	return json({
		success: true,
		...data
	});
};

export const responseError = (errorMessage: string, errorCode: string) => {
	return json({
		success: false,
		errorMessage: errorMessage,
		errorCode: errorCode
	});
};
