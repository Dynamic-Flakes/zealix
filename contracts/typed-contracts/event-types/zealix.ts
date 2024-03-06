import type {ReturnNumber} from "@727-ventures/typechain-types";
import type * as ReturnTypes from '../types-returns/zealix';

export interface Register {
	name: ReturnTypes.Hash;
	from: ReturnTypes.AccountId;
}

export interface AccountCreated {
	accountId: ReturnTypes.AccountId;
	category: ReturnTypes.Category;
}

export interface RefugeeCreated {
	accountId: ReturnTypes.AccountId;
	countryOfOrigin: string;
	countryOfAsylum: string;
}

export interface RefugeeProfileUpdated {
	accountId: ReturnTypes.AccountId;
	resumeUrl: string;
}

export interface RefugeeStatusToggled {
	accountId: ReturnTypes.AccountId;
	newStatus: boolean;
}

export interface GovernmentRegistered {
	accountId: ReturnTypes.AccountId;
	country: string;
}

export interface EmployerRegistered {
	accountId: ReturnTypes.AccountId;
	companyName: string;
}

export interface RefugeeDeleted {
	accountId: ReturnTypes.AccountId;
}

export interface EmployerStatusToggled {
	accountId: ReturnTypes.AccountId;
	newStatus: boolean;
}

export interface JobContractRegistered {
	employerId: ReturnTypes.AccountId;
	position: string;
	hiredRefugee: ReturnTypes.AccountId;
}

