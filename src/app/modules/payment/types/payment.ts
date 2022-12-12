import { Consultation } from '../../consultation/types/consultation';
import { Pet } from '../../pet/types/pet';
export type Payment = {
	payment_id: number;
	date?: string;
	amount: number;
	paid: number;
	consultation: Consultation;
	pet: Pet;
};
