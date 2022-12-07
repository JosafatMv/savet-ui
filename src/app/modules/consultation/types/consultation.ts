import { Pet } from '../../pet/types/pet';
export type Consultation = {
	consultation_id: number;
	consultation_date: string;
	pet: Pet;
};
