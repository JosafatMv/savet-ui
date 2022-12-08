import { Entity } from 'src/app/types/entity';

export type Pet = Entity<number> & {
	id: number;
	name: string;
	breed: string;
	gender: string;
	weight: number;
	user: any;
	owner?: string;
};
