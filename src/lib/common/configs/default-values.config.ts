import { EnumCategoryType, type IIconCode } from '@/lib/common/enum/collection.enum';
import type { ICategory, IIcon } from '@/lib/common/schema/app.schema';
import { ObjectId } from 'mongodb';
const EmptyIcon: IIcon = {
	_id: new ObjectId(),
	url: 'https://cdn-icons-png.flaticon.com/512/1376/1376786.png',
	code: 'Empty',
	type: 'Default'
};

const createParent = (name: string, children: string[]): ICategory[] => {
	const parentId = new ObjectId();
	const arr: ICategory[] = children.map((child) => ({
		_id: new ObjectId(),
		name: child,
		idIcon: EmptyIcon._id,
		idParent: parentId,
		type: EnumCategoryType.Expense
	}));
	return [
		{
			_id: parentId,
			name,
			idIcon: EmptyIcon._id,
			type: EnumCategoryType.Expense,
			idParent: null
		},
		...arr
	];
};

export const createDefaultCategory = (): ICategory[] => {
	const parentFood = createParent('Ăn uống', ['Ăn', 'Chợ', 'Cà phê', 'Nhà hàng', 'Party']);
	console.log('parentFood', parentFood);
	const parentCar = createParent('Xe', ['Xăng xe', 'Bảo dưỡng', 'Xe Khách', 'Grab']);
	const parentShopping = createParent('Mua sắm', ['Lặt vặt', 'Đồ gia dụng']);
	const parentBeauty = createParent('Làm đẹp', ['Cắt tóc', 'Mỹ phẩm', 'Outfit']);
	const parentEntertainment = createParent('Giải trí', ['Game', 'Phim']);
	const parentBill = createParent('Hoá đơn', ['Điện', 'Phí Quản lý', 'Internet', 'Thuê nhà']);

	return [
		...parentFood,
		...parentCar,
		...parentShopping,
		...parentBeauty,
		...parentEntertainment,
		...parentBill
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
