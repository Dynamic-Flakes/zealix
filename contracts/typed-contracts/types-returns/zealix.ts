import type BN from 'bn.js';
import type {ReturnNumber} from '@727-ventures/typechain-types';

export type AccountId = string | number[]

export enum LangError {
	couldNotReadInput = 'CouldNotReadInput'
}

export enum Category {
	government = 'Government',
	employer = 'Employer',
	refugee = 'Refugee',
	zealix = 'Zealix'
}

export type Refugee = {
	skill: string,
	age: number,
	status: boolean,
	idType: string,
	govIdNumber: string,
	countryOfOrigin: string,
	countryOfAsylum: string,
	resumeUrl: string,
	category: Category
}

export type Government = {
	name: string,
	country: string,
	category: Category
}

export type Employer = {
	companyName: string,
	registrationNumber: string,
	website: string,
	contactEmail: string,
	status: boolean,
	category: Category
}

export type Hash = string | number[]

