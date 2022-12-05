import { Entity } from 'src/app/types/entity';

export type Category = Entity<number> & {
	name: string;
};
