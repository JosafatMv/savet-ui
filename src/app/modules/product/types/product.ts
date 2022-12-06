import { Entity } from '../../../types/entity';
import { Category } from '../../category/types/category';
export type Product = Entity<number> & {
	name: string;
	description: string;
	price: number;
	category: Category;
	img_url?: string;
};
