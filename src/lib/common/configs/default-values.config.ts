import { EnumCategoryType } from '@/lib/common/enum/collection.enum';
import type { ICategory, IIcon, IProfile } from '@/lib/common/schema/app.schema';
import values from 'lodash/values';
import { ObjectId } from 'mongodb';
import { flatIcon } from './cdn.config';

const EmptyIcon: IIcon = {
	_id: new ObjectId(),
	code: flatIcon.img_crash,
	type: 'Default'
};

const createParent = (
	name: string,
	children: string[],
	type: EnumCategoryType,
	idIcon: string
): ICategory[] => {
	const parentId = new ObjectId();
	const arr: ICategory[] = children.map((child) => ({
		_id: new ObjectId(),
		name: child,
		idIcon: idIcon,
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
		EnumCategoryType.Expense,
		flatIcon.food
	);
	const parentCar = createParent(
		'Xe',
		['Xăng xe', 'Bảo dưỡng', 'Xe Khách', 'Grab'],
		EnumCategoryType.Expense,
		flatIcon.fuel
	);
	const parentShopping = createParent(
		'Mua sắm',
		['Lặt vặt', 'Đồ gia dụng'],
		EnumCategoryType.Expense,
		flatIcon.appliances
	);
	const parentBeauty = createParent(
		'Làm đẹp',
		['Cắt tóc', 'Mỹ phẩm', 'Outfit'],
		EnumCategoryType.Expense,
		flatIcon.cosmetics
	);
	const parentEntertainment = createParent(
		'Giải trí',
		['Game', 'Phim'],
		EnumCategoryType.Expense,
		flatIcon.movies
	);
	const parentBill = createParent(
		'Hoá đơn',
		['Điện', 'Phí Quản lý', 'Internet', 'Thuê nhà'],
		EnumCategoryType.Expense,
		flatIcon.electricity
	);

	const income = ['Lương', 'Thưởng', 'Lãi', 'Mua bán']
		.map((x) => createParent(x, [], EnumCategoryType.Income, flatIcon.cash))
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

export const createDefaultIcon = (): IIcon[] => {
	const defaultIcons: IIcon[] = values(flatIcon).map((x) => ({
		_id: new ObjectId(),
		type: 'Default',
		code: x
	}));

	const arr: IIcon[] = [...defaultIcons];
	return [EmptyIcon, ...arr];
};

export const createCategory = (profile: IProfile): ICategory[] => {
	const arrExpense = [
		{
			name: 'Ăn uống',
			idIcon: flatIcon.food,
			children: [
				{ name: 'Ăn', idIcon: flatIcon.food },
				{ name: 'Chợ', idIcon: flatIcon.market },
				{ name: 'Cà phê', idIcon: flatIcon.coffee },
				{ name: 'Nhà hàng', idIcon: flatIcon.restaurant },
				{ name: 'Party', idIcon: flatIcon.party }
			]
		},
		{
			name: 'Xe',
			idIcon: flatIcon.fuel,
			children: [
				{ name: 'Xăng xe', idIcon: flatIcon.fuel },
				{ name: 'Bảo dưỡng', idIcon: flatIcon.maintenance },
				{ name: 'Xe Khách', idIcon: flatIcon.taxi },
				{ name: 'Grab', idIcon: flatIcon.bus }
			]
		},
		{
			name: 'Mua sắm',
			idIcon: flatIcon.appliances,
			children: [
				{ name: 'Lặt vặt', idIcon: flatIcon.market },
				{ name: 'Đồ gia dụng', idIcon: flatIcon.appliances }
			]
		},
		{
			name: 'Làm đẹp',
			idIcon: flatIcon.cosmetics,
			children: [
				{ name: 'Cắt tóc', idIcon: flatIcon.haircut },
				{ name: 'Mỹ phẩm', idIcon: flatIcon.cosmetics },
				{ name: 'Outfit', idIcon: flatIcon.outfit }
			]
		},
		{
			name: 'Giải trí',
			idIcon: flatIcon.movies,
			children: [
				{ name: 'Game', idIcon: flatIcon.games },
				{ name: 'Phim', idIcon: flatIcon.movies }
			]
		},
		{
			name: 'Hoá đơn',
			idIcon: flatIcon.electricity,
			children: [
				{ name: 'Điện', idIcon: flatIcon.electricity },
				{ name: 'Phí Quản lý', idIcon: flatIcon.management },
				{ name: 'Internet', idIcon: flatIcon.internet },
				{ name: 'Thuê nhà', idIcon: flatIcon.rent }
			]
		}
	];

	const arrIncome = [
		{ name: 'Lương', idIcon: flatIcon.cash },
		{ name: 'Thưởng', idIcon: flatIcon.cash },
		{ name: 'Lãi', idIcon: flatIcon.cash },
		{ name: 'Mua bán', idIcon: flatIcon.cash }
	];

	const arr: ICategory[][] = arrExpense.map((category) => {
		const parent = {
			_id: new ObjectId(),
			name: category.name,
			idIcon: profile.icon.find((icon) => icon.code === category.idIcon)?._id!,
			type: EnumCategoryType.Expense,
			idParent: null
		};

		const child = category.children.map((child) => ({
			_id: new ObjectId(),
			name: child.name,
			idIcon: profile.icon.find((icon) => icon.code === child.idIcon)?._id!,
			type: EnumCategoryType.Expense,
			idParent: parent._id
		}));

		return [parent, ...child].flat() as ICategory[];
	});

	return [
		...arr.flat(),
		...arrIncome.map((child) => ({
			_id: new ObjectId(),
			name: child.name,
			idIcon: profile.icon.find((icon) => icon.code === child.idIcon)?._id!,
			type: EnumCategoryType.Income,
			idParent: null
		}))
	] as ICategory[];
};
