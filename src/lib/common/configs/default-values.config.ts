import { EnumCategoryType, type IIconCode } from '@/lib/common/enum/collection.enum';
import type { ICategory, IIcon } from '@/lib/common/schema/app.schema';
import { ObjectId } from 'mongodb';
const EmptyIcon: IIcon = {
	_id: new ObjectId(),
	url: 'https://cdn-icons-png.flaticon.com/512/1376/1376786.png',
	code: 'Empty',
	type: 'Default'
};

const createParent = (name: string, children: string[], type: EnumCategoryType): ICategory[] => {
	const parentId = new ObjectId();
	const arr: ICategory[] = children.map((child) => ({
		_id: new ObjectId(),
		name: child,
		idIcon: EmptyIcon._id,
		idParent: parentId,
		type
	}));
	return [
		{
			_id: parentId,
			name,
			idIcon: EmptyIcon._id,
			type: type,
			idParent: null
		},
		...arr
	];
};

export const createDefaultCategory = (): ICategory[] => {
	const parentFood = createParent(
		'Ăn uống',
		['Ăn', 'Chợ', 'Cà phê', 'Nhà hàng', 'Party'],
		EnumCategoryType.Expense
	);
	const parentCar = createParent(
		'Xe',
		['Xăng xe', 'Bảo dưỡng', 'Xe Khách', 'Grab'],
		EnumCategoryType.Expense
	);
	const parentShopping = createParent(
		'Mua sắm',
		['Lặt vặt', 'Đồ gia dụng'],
		EnumCategoryType.Expense
	);
	const parentBeauty = createParent(
		'Làm đẹp',
		['Cắt tóc', 'Mỹ phẩm', 'Outfit'],
		EnumCategoryType.Expense
	);
	const parentEntertainment = createParent('Giải trí', ['Game', 'Phim'], EnumCategoryType.Expense);
	const parentBill = createParent(
		'Hoá đơn',
		['Điện', 'Phí Quản lý', 'Internet', 'Thuê nhà'],
		EnumCategoryType.Expense
	);

	const income = ['Lương', 'Thưởng', 'Lãi', 'Mua bán']
		.map((x) => createParent(x, [], EnumCategoryType.Income))
		.flat();

	return [
		...parentFood,
		...parentCar,
		...parentShopping,
		...parentBeauty,
		...parentEntertainment,
		...parentBill,
		...income
	];
};

const createIcon = (code: IIconCode, url: string): IIcon => {
	return {
		_id: new ObjectId(),
		url,
		type: 'Default',
		code
	};
};
export const createDefaultIcon = (): IIcon[] => {
	const arr = [
		createIcon('Default', 'https://cdn-icons-png.flaticon.com/512/1656/1656937.png'),
		createIcon('Default', 'https://cdn-icons-png.flaticon.com/512/1683/1683726.png'),
		createIcon('Default', 'https://cdn-icons-png.flaticon.com/512/3514/3514407.png')
	];
	return [EmptyIcon, ...arr];
};
