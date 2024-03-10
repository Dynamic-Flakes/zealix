/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryOkJSON, queryJSON, handleReturnType } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/zealix';
import type * as ReturnTypes from '../types-returns/zealix';
import type BN from 'bn.js';
//@ts-ignore
import {ReturnNumber} from '@727-ventures/typechain-types';
import {getTypeDescription} from './../shared/utils';
// @ts-ignore
import type {EventRecord} from "@polkadot/api/submittable";
import {decodeEvents} from "../shared/utils";
import DATA_TYPE_DESCRIPTIONS from '../data/zealix.json';
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/zealix.json';


export default class Methods {
	readonly __nativeContract : ContractPromise;
	readonly __keyringPair : KeyringPair;
	readonly __callerAddress : string;
	readonly __apiPromise: ApiPromise;

	constructor(
		apiPromise : ApiPromise,
		nativeContract : ContractPromise,
		keyringPair : KeyringPair,
	) {
		this.__apiPromise = apiPromise;
		this.__nativeContract = nativeContract;
		this.__keyringPair = keyringPair;
		this.__callerAddress = keyringPair.address;
	}

	/**
	* registerAccount
	*
	* @param { ArgumentTypes.AccountId } accountId,
	* @param { ArgumentTypes.Category } category,
	* @returns { void }
	*/
	"registerAccount" (
		accountId: ArgumentTypes.AccountId,
		category: ArgumentTypes.Category,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "registerAccount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [accountId, category], __options);
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
	* @returns { void }
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
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "registerRefugee", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [accountId, skill, age, status, idType, govIdNumber, countryOfOrigin, countryOfAsylum, resumeUrl], __options);
	}

	/**
	* getAllRefugeeProfiles
	*
	* @returns { Result<Array<ReturnTypes.Refugee>, ReturnTypes.LangError> }
	*/
	"getAllRefugeeProfiles" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Array<ReturnTypes.Refugee>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getAllRefugeeProfiles", [], __options, (result) => { return handleReturnType(result, getTypeDescription(11, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getRefugeeById
	*
	* @param { ArgumentTypes.AccountId } accountId,
	* @returns { Result<ReturnTypes.Refugee | null, ReturnTypes.LangError> }
	*/
	"getRefugeeById" (
		accountId: ArgumentTypes.AccountId,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.Refugee | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getRefugeeById", [accountId], __options, (result) => { return handleReturnType(result, getTypeDescription(14, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* deleteRefugee
	*
	* @param { ArgumentTypes.AccountId } accountId,
	* @returns { Result<null, ReturnTypes.LangError> }
	*/
	"deleteRefugee" (
		accountId: ArgumentTypes.AccountId,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "deleteRefugee", [accountId], __options, (result) => { return handleReturnType(result, getTypeDescription(7, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* updateRefugeeResumeUrl
	*
	* @param { ArgumentTypes.AccountId } accountId,
	* @param { string } newUrl,
	* @returns { void }
	*/
	"updateRefugeeResumeUrl" (
		accountId: ArgumentTypes.AccountId,
		newUrl: string,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "updateRefugeeResumeUrl", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [accountId, newUrl], __options);
	}

	/**
	* toggleRefugeeStatus
	*
	* @param { ArgumentTypes.AccountId } accountId,
	* @param { boolean } newStatus,
	* @returns { void }
	*/
	"toggleRefugeeStatus" (
		accountId: ArgumentTypes.AccountId,
		newStatus: boolean,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "toggleRefugeeStatus", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [accountId, newStatus], __options);
	}

	/**
	* registerGovernment
	*
	* @param { ArgumentTypes.AccountId } accountId,
	* @param { string } name,
	* @param { string } country,
	* @returns { void }
	*/
	"registerGovernment" (
		accountId: ArgumentTypes.AccountId,
		name: string,
		country: string,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "registerGovernment", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [accountId, name, country], __options);
	}

	/**
	* registerEmployer
	*
	* @param { ArgumentTypes.AccountId } accountId,
	* @param { string } companyName,
	* @param { string } registrationNumber,
	* @param { string } website,
	* @param { string } contactEmail,
	* @returns { void }
	*/
	"registerEmployer" (
		accountId: ArgumentTypes.AccountId,
		companyName: string,
		registrationNumber: string,
		website: string,
		contactEmail: string,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "registerEmployer", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [accountId, companyName, registrationNumber, website, contactEmail], __options);
	}

	/**
	* toggleEmployerStatus
	*
	* @param { ArgumentTypes.AccountId } accountId,
	* @param { boolean } newStatus,
	* @returns { void }
	*/
	"toggleEmployerStatus" (
		accountId: ArgumentTypes.AccountId,
		newStatus: boolean,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "toggleEmployerStatus", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [accountId, newStatus], __options);
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
	* @returns { void }
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
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "registerJobContract", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [position, keyword, pay, hours, conditions, hiredRefugee], __options);
	}

	/**
	* getMatchingRefugees
	*
	* @param { string } keyword,
	* @returns { Result<Array<ReturnTypes.Refugee>, ReturnTypes.LangError> }
	*/
	"getMatchingRefugees" (
		keyword: string,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Array<ReturnTypes.Refugee>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getMatchingRefugees", [keyword], __options, (result) => { return handleReturnType(result, getTypeDescription(11, DATA_TYPE_DESCRIPTIONS)); });
	}

}