import { Entity } from '../../../../../../../Unidad-3/personal-ui/src/app/types/entity';

export type Pet = Entity<number> & {
	id: number;
	name: string;
	breed: string;
	gender: string;
	weight: number;
	personal: any;
	owner?: string;
};
