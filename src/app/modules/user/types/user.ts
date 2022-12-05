import { Entity } from '../../../types/entity';
// import { Position } from '../../positions/types/position';

export type User = Entity<number> & {
	name: string;
	surname: string;
	lastname: string;
	birthdate: string;
	email: string;
	role: string;
	status: number;
};

export type UserForm = Entity<number> & {
	name: string;
	surname: string;
	lastname: string;
	birthdate: string;
	email: string;
	password: string;
	role: string;
};

export type UserUpdate = Entity<number> & {
	id: number;
	name: string;
	surname: string;
	lastname: string;
	birthdate: string;
	email: string;
	role: string;
};
