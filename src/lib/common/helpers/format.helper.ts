export const formatDate = (date: Date | string) => {
	return new Date(date).toLocaleDateString('vi-VN', {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric'
	});
};
