import type BN from 'bn.js';

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
	age: (number | string | BN),
	status: boolean,
	idType: string,
	govIdNumber: string,
	countryOfOrigin: string,
	countryOfAsylum: string,
	resumeUrl: string
}

export type Hash = string | number[]

