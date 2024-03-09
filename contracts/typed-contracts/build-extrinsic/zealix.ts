/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { GasLimit, GasLimitAndRequiredValue } from '@727-ventures/typechain-types';
import { buildSubmittableExtrinsic } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/zealix';
import type BN from 'bn.js';
import type { ApiPromise } from '@polkadot/api';



export default class Methods {
	readonly __nativeContract : ContractPromise;
	readonly __apiPromise: ApiPromise;

	constructor(
		nativeContract : ContractPromise,
		apiPromise: ApiPromise,
	) {
		this.__nativeContract = nativeContract;
		this.__apiPromise = apiPromise;
	}
	/**
	 * registerAccount
	 *
	 * @param { ArgumentTypes.AccountId } accountId,
	 * @param { ArgumentTypes.Category } category,
	*/
	"registerAccount" (
		accountId: ArgumentTypes.AccountId,
		category: ArgumentTypes.Category,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "registerAccount", [accountId, category], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "registerRefugee", [accountId, skill, age, status, idType, govIdNumber, countryOfOrigin, countryOfAsylum, resumeUrl], __options);
	}

	/**
	 * getAllRefugeeProfiles
	 *
	*/
	"getAllRefugeeProfiles" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "getAllRefugeeProfiles", [], __options);
	}

	/**
	 * getRefugeeById
	 *
	 * @param { ArgumentTypes.AccountId } accountId,
	*/
	"getRefugeeById" (
		accountId: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "getRefugeeById", [accountId], __options);
	}

	/**
	 * deleteRefugee
	 *
	 * @param { ArgumentTypes.AccountId } accountId,
	*/
	"deleteRefugee" (
		accountId: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "deleteRefugee", [accountId], __options);
	}

	/**
	 * updateRefugeeResumeUrl
	 *
	 * @param { ArgumentTypes.AccountId } accountId,
	 * @param { string } newUrl,
	*/
	"updateRefugeeResumeUrl" (
		accountId: ArgumentTypes.AccountId,
		newUrl: string,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "updateRefugeeResumeUrl", [accountId, newUrl], __options);
	}

	/**
	 * toggleRefugeeStatus
	 *
	 * @param { ArgumentTypes.AccountId } accountId,
	 * @param { boolean } newStatus,
	*/
	"toggleRefugeeStatus" (
		accountId: ArgumentTypes.AccountId,
		newStatus: boolean,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "toggleRefugeeStatus", [accountId, newStatus], __options);
	}

	/**
	 * registerGovernment
	 *
	 * @param { ArgumentTypes.AccountId } accountId,
	 * @param { string } name,
	 * @param { string } country,
	*/
	"registerGovernment" (
		accountId: ArgumentTypes.AccountId,
		name: string,
		country: string,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "registerGovernment", [accountId, name, country], __options);
	}

	/**
	 * registerEmployer
	 *
	 * @param { ArgumentTypes.AccountId } accountId,
	 * @param { string } companyName,
	 * @param { string } registrationNumber,
	 * @param { string } website,
	 * @param { string } contactEmail,
	*/
	"registerEmployer" (
		accountId: ArgumentTypes.AccountId,
		companyName: string,
		registrationNumber: string,
		website: string,
		contactEmail: string,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "registerEmployer", [accountId, companyName, registrationNumber, website, contactEmail], __options);
	}

	/**
	 * toggleEmployerStatus
	 *
	 * @param { ArgumentTypes.AccountId } accountId,
	 * @param { boolean } newStatus,
	*/
	"toggleEmployerStatus" (
		accountId: ArgumentTypes.AccountId,
		newStatus: boolean,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "toggleEmployerStatus", [accountId, newStatus], __options);
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
	*/
	"registerJobContract" (
		position: string,
		keyword: string,
		pay: (number | string | BN),
		hours: (number | string | BN),
		conditions: string,
		hiredRefugee: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "registerJobContract", [position, keyword, pay, hours, conditions, hiredRefugee], __options);
	}

	/**
	 * getMatchingRefugees
	 *
	 * @param { string } keyword,
	*/
	"getMatchingRefugees" (
		keyword: string,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "getMatchingRefugees", [keyword], __options);
	}

}