import { genMongoId } from '@/lib/common/helpers/func.helper';
import type { IIcon } from '@/lib/common/zod/profile.zod';

const EmptyIcon: IIcon = {
	_id: genMongoId(),
	url: 'https://cdn-icons-png.flaticon.com/512/1376/1376786.png',
	code: 'Empty',
	type: 'Default'
};

export const DEFAULT_ICON: IIcon[] = [EmptyIcon];

const createParent = (name: string, children: string[]) => {
	const parentId = genMongoId();
	return [
		{
			_id: parentId,
			name,
			icon: EmptyIcon._id ?? ''
		},
		...children.map((child) => ({
			_id: genMongoId(),
			name: child,
			icon: EmptyIcon._id ?? '',
			parentId
		}))
	];
};

export const createDefaultCategory = () => {
	const parentFood = createParent('Ăn uống', ['Ăn', 'Chợ', 'Cà phê', 'Nhà hàng', 'Party']);
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
