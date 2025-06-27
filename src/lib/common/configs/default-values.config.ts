import { genMongoId } from '@/lib/common/helpers/func.helper';
import type { ICategory, IIcon } from '@/lib/common/zod/profile.zod';

const EmptyIcon: IIcon = {
	_id: genMongoId(),
	url: 'https://cdn-icons-png.flaticon.com/512/1376/1376786.png',
	code: 'Empty',
	type: 'Default'
};

export const DEFAULT_ICON: IIcon[] = [EmptyIcon];

export const DEFAULT_CATEGORY: ICategory[] = [
	{
		_id: genMongoId(),
		name: 'Ăn uống',
		icon: EmptyIcon._id ?? '',
		children: [
			{
				_id: genMongoId(),
				name: 'Ăn',
				icon: EmptyIcon._id ?? ''
			},
			{
				_id: genMongoId(),
				name: 'Chợ',
				icon: EmptyIcon._id ?? ''
			},
			{
				_id: genMongoId(),
				name: 'Cà phê',
				icon: EmptyIcon._id ?? ''
			},
			{
				_id: genMongoId(),
				name: 'Nhà hàng',
				icon: EmptyIcon._id ?? ''
			},
			{
				_id: genMongoId(),
				name: 'Party',
				icon: EmptyIcon._id ?? ''
			}
		]
	},
	{
		_id: genMongoId(),
		name: 'Xe',
		icon: EmptyIcon._id ?? '',
		children: [
			{
				_id: genMongoId(),
				name: 'Xăng xe',
				icon: EmptyIcon._id ?? ''
			},
			{
				_id: genMongoId(),
				name: 'Bảo dưỡng',
				icon: EmptyIcon._id ?? ''
			},
			{
				_id: genMongoId(),
				name: 'Xe Khách',
				icon: EmptyIcon._id ?? ''
			},
			{
				_id: genMongoId(),
				name: 'Grab',
				icon: EmptyIcon._id ?? ''
			}
		]
	},
	{
		_id: genMongoId(),
		name: 'Mua sắm',
		icon: EmptyIcon._id ?? '',
		children: [
			{
				_id: genMongoId(),
				name: 'Lặt vặt',
				icon: EmptyIcon._id ?? ''
			},
			{
				_id: genMongoId(),
				name: 'Đồ gia dụng',
				icon: EmptyIcon._id ?? ''
			}
		]
	},
	{
		_id: genMongoId(),
		name: 'Làm đẹp',
		icon: EmptyIcon._id ?? '',
		children: [
			{
				_id: genMongoId(),
				name: 'Cắt tóc',
				icon: EmptyIcon._id ?? ''
			},
			{
				_id: genMongoId(),
				name: 'Mỹ phẩm',
				icon: EmptyIcon._id ?? ''
			},
			{
				_id: genMongoId(),
				name: 'Outfit',
				icon: EmptyIcon._id ?? ''
			}
		]
	},
	{
		_id: genMongoId(),
		name: 'Giải trí',
		icon: EmptyIcon._id ?? '',
		children: [
			{
				_id: genMongoId(),
				name: 'Game',
				icon: EmptyIcon._id ?? ''
			},
			{
				_id: genMongoId(),
				name: 'Phim',
				icon: EmptyIcon._id ?? ''
			}
		]
	},
	{
		_id: genMongoId(),
		name: 'Hoá đơn',
		icon: EmptyIcon._id ?? '',
		children: [
			{
				_id: genMongoId(),
				name: 'Điện',
				icon: EmptyIcon._id ?? ''
			},
			{
				_id: genMongoId(),
				name: 'Phí Quản lý',
				icon: EmptyIcon._id ?? ''
			},
			{
				_id: genMongoId(),
				name: 'Internet',
				icon: EmptyIcon._id ?? ''
			},
			{
				_id: genMongoId(),
				name: 'Thuê nhà',
				icon: EmptyIcon._id ?? ''
			}
		]
	}
];
