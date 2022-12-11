import { Medicine } from '../../medicine/types/medicine';
import { Pet } from '../../pet/types/pet';
import { Product } from '../../product/types/product';
import { Service } from '../../service/types/service';
export type Consultation = {
	consultation_id: number;
	consultation_date: string;
	pet: Pet;
	products: Product[];
	services: Service[];
	medicines: Medicine[];
};

// export type ConsultationRegister = {
// 	consultation_date: string;
// 	pet: Pet;
// 	products: Product[];
// 	services: Service[];
// 	medicines: Medicine[];
// };
