import { Entity } from 'src/app/types/entity';

export type Pet = {
	pet_id: number;
	name: string;
	breed: string;
	gender: string;
	weight: number;
	user: any;
	owner?: string;
};
