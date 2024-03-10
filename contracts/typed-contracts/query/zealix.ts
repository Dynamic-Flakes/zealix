/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryJSON, queryOkJSON, handleReturnType } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/zealix';
import type * as ReturnTypes from '../types-returns/zealix';
import type BN from 'bn.js';
//@ts-ignore
import {ReturnNumber} from '@727-ventures/typechain-types';
import {getTypeDescription} from './../shared/utils';
import DATA_TYPE_DESCRIPTIONS from '../data/zealix.json';


export default class Methods {
	readonly __nativeContract : ContractPromise;
	readonly __apiPromise: ApiPromise;
	readonly __callerAddress : string;

	constructor(
		nativeContract : ContractPromise,
		nativeApi : ApiPromise,
		callerAddress : string,
	) {
		this.__nativeContract = nativeContract;
		this.__callerAddress = callerAddress;
		this.__apiPromise = nativeApi;
	}

	/**
	* registerRefugee
	*
	* @param { ArgumentTypes.AccountId } accountId,
	* @param { string } skill,
	* @param { (number | string | BN) } age,
	* @param { boolean } status,
	* @param { string } idType,
	* @param { string } govIdNumber,
	* @param { string } countryOfOrigin,
	* @param { string } countryOfAsylum,
	* @param { string } resumeUrl,
	* @param { ArgumentTypes.Category } category,
	* @returns { Result<null, ReturnTypes.LangError> }
	*/
	"registerRefugee" (
		accountId: ArgumentTypes.AccountId,
		skill: string,
		age: (number | string | BN),
		status: boolean,
		idType: string,
		govIdNumber: string,
		countryOfOrigin: string,
		countryOfAsylum: string,
		resumeUrl: string,
		category: ArgumentTypes.Category,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "registerRefugee", [accountId, skill, age, status, idType, govIdNumber, countryOfOrigin, countryOfAsylum, resumeUrl, category], __options , (result) => { return handleReturnType(result, getTypeDescription(7, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getAllRefugeeProfiles
	*
	* @returns { Result<Array<ReturnTypes.Refugee>, ReturnTypes.LangError> }
	*/
	"getAllRefugeeProfiles" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Array<ReturnTypes.Refugee>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getAllRefugeeProfiles", [], __options , (result) => { return handleReturnType(result, getTypeDescription(11, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getRefugeeById
	*
	* @param { ArgumentTypes.AccountId } accountId,
	* @returns { Result<ReturnTypes.Refugee | null, ReturnTypes.LangError> }
	*/
	"getRefugeeById" (
		accountId: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.Refugee | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getRefugeeById", [accountId], __options , (result) => { return handleReturnType(result, getTypeDescription(14, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* deleteRefugee
	*
	* @param { ArgumentTypes.AccountId } accountId,
	* @returns { Result<null, ReturnTypes.LangError> }
	*/
	"deleteRefugee" (
		accountId: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "deleteRefugee", [accountId], __options , (result) => { return handleReturnType(result, getTypeDescription(7, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* updateRefugeeResumeUrl
	*
	* @param { ArgumentTypes.AccountId } accountId,
	* @param { string } newUrl,
	* @returns { Result<null, ReturnTypes.LangError> }
	*/
	"updateRefugeeResumeUrl" (
		accountId: ArgumentTypes.AccountId,
		newUrl: string,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "updateRefugeeResumeUrl", [accountId, newUrl], __options , (result) => { return handleReturnType(result, getTypeDescription(7, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* toggleRefugeeStatus
	*
	* @param { ArgumentTypes.AccountId } accountId,
	* @param { boolean } newStatus,
	* @returns { Result<null, ReturnTypes.LangError> }
	*/
	"toggleRefugeeStatus" (
		accountId: ArgumentTypes.AccountId,
		newStatus: boolean,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "toggleRefugeeStatus", [accountId, newStatus], __options , (result) => { return handleReturnType(result, getTypeDescription(7, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* registerGovernment
	*
	* @param { ArgumentTypes.AccountId } accountId,
	* @param { string } name,
	* @param { string } country,
	* @param { ArgumentTypes.Category } category,
	* @returns { Result<null, ReturnTypes.LangError> }
	*/
	"registerGovernment" (
		accountId: ArgumentTypes.AccountId,
		name: string,
		country: string,
		category: ArgumentTypes.Category,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "registerGovernment", [accountId, name, country, category], __options , (result) => { return handleReturnType(result, getTypeDescription(7, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* registerEmployer
	*
	* @param { ArgumentTypes.AccountId } accountId,
	* @param { string } companyName,
	* @param { string } registrationNumber,
	* @param { string } website,
	* @param { string } contactEmail,
	* @param { ArgumentTypes.Category } category,
	* @returns { Result<null, ReturnTypes.LangError> }
	*/
	"registerEmployer" (
		accountId: ArgumentTypes.AccountId,
		companyName: string,
		registrationNumber: string,
		website: string,
		contactEmail: string,
		category: ArgumentTypes.Category,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "registerEmployer", [accountId, companyName, registrationNumber, website, contactEmail, category], __options , (result) => { return handleReturnType(result, getTypeDescription(7, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getGovernmentById
	*
	* @param { ArgumentTypes.AccountId } accountId,
	* @returns { Result<ReturnTypes.Government | null, ReturnTypes.LangError> }
	*/
	"getGovernmentById" (
		accountId: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.Government | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getGovernmentById", [accountId], __options , (result) => { return handleReturnType(result, getTypeDescription(16, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getEmployerById
	*
	* @param { ArgumentTypes.AccountId } accountId,
	* @returns { Result<ReturnTypes.Employer | null, ReturnTypes.LangError> }
	*/
	"getEmployerById" (
		accountId: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.Employer | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getEmployerById", [accountId], __options , (result) => { return handleReturnType(result, getTypeDescription(19, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* toggleEmployerStatus
	*
	* @param { ArgumentTypes.AccountId } accountId,
	* @param { boolean } newStatus,
	* @returns { Result<boolean, ReturnTypes.LangError> }
	*/
	"toggleEmployerStatus" (
		accountId: ArgumentTypes.AccountId,
		newStatus: boolean,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<boolean, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "toggleEmployerStatus", [accountId, newStatus], __options , (result) => { return handleReturnType(result, getTypeDescription(22, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* registerJobContract
	*
	* @param { string } position,
	* @param { string } keyword,
	* @param { (number | string | BN) } pay,
	* @param { (number | string | BN) } hours,
	* @param { string } conditions,
	* @param { ArgumentTypes.AccountId } hiredRefugee,
	* @returns { Result<null, ReturnTypes.LangError> }
	*/
	"registerJobContract" (
		position: string,
		keyword: string,
		pay: (number | string | BN),
		hours: (number | string | BN),
		conditions: string,
		hiredRefugee: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "registerJobContract", [position, keyword, pay, hours, conditions, hiredRefugee], __options , (result) => { return handleReturnType(result, getTypeDescription(7, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getMatchingRefugees
	*
	* @param { string } keyword,
	* @returns { Result<Array<ReturnTypes.Refugee>, ReturnTypes.LangError> }
	*/
	"getMatchingRefugees" (
		keyword: string,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Array<ReturnTypes.Refugee>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getMatchingRefugees", [keyword], __options , (result) => { return handleReturnType(result, getTypeDescription(11, DATA_TYPE_DESCRIPTIONS)); });
	}

}