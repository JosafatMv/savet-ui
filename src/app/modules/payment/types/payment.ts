import { Entity } from '../../../types/entity';

export type Payment = Entity<number> & {
	id: number;
	date: string;
	consultation: number;
	amount: number;
	paymentMethod: string;
};
