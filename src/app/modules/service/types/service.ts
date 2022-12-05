import { Entity } from 'src/app/types/entity';

export type Service = Entity<number> & {
	name: string;
	description: string;
	price: number;
};
