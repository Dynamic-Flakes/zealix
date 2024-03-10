import type * as EventTypes from '../event-types/zealix';
import type {ContractPromise} from "@polkadot/api-contract";
import type {ApiPromise} from "@polkadot/api";
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/zealix.json';
import {getEventTypeDescription} from "../shared/utils";
import {handleEventReturn} from "@727-ventures/typechain-types";

export default class EventsClass {
	readonly __nativeContract : ContractPromise;
	readonly __api : ApiPromise;

	constructor(
		nativeContract : ContractPromise,
		api : ApiPromise,
	) {
		this.__nativeContract = nativeContract;
		this.__api = api;
	}

	public subscribeOnRegisterEvent(callback : (event : EventTypes.Register) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('Register', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.Register);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'Register');
	}

	public subscribeOnAccountCreatedEvent(callback : (event : EventTypes.AccountCreated) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('AccountCreated', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.AccountCreated);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'AccountCreated');
	}

	public subscribeOnRefugeeCreatedEvent(callback : (event : EventTypes.RefugeeCreated) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('RefugeeCreated', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.RefugeeCreated);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'RefugeeCreated');
	}

	public subscribeOnRefugeeProfileUpdatedEvent(callback : (event : EventTypes.RefugeeProfileUpdated) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('RefugeeProfileUpdated', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.RefugeeProfileUpdated);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'RefugeeProfileUpdated');
	}

	public subscribeOnRefugeeStatusToggledEvent(callback : (event : EventTypes.RefugeeStatusToggled) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('RefugeeStatusToggled', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.RefugeeStatusToggled);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'RefugeeStatusToggled');
	}

	public subscribeOnGovernmentRegisteredEvent(callback : (event : EventTypes.GovernmentRegistered) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('GovernmentRegistered', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.GovernmentRegistered);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'GovernmentRegistered');
	}

	public subscribeOnEmployerRegisteredEvent(callback : (event : EventTypes.EmployerRegistered) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('EmployerRegistered', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.EmployerRegistered);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'EmployerRegistered');
	}

	public subscribeOnRefugeeDeletedEvent(callback : (event : EventTypes.RefugeeDeleted) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('RefugeeDeleted', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.RefugeeDeleted);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'RefugeeDeleted');
	}

	public subscribeOnEmployerStatusToggledEvent(callback : (event : EventTypes.EmployerStatusToggled) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('EmployerStatusToggled', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.EmployerStatusToggled);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'EmployerStatusToggled');
	}

	public subscribeOnJobContractRegisteredEvent(callback : (event : EventTypes.JobContractRegistered) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('JobContractRegistered', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.JobContractRegistered);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'JobContractRegistered');
	}


	private __subscribeOnEvent(
		callback : (args: any[], event: any) => void,
		filter : (eventName: string) => boolean = () => true
	) {
		// @ts-ignore
		return this.__api.query.system.events((events) => {
			events.forEach((record: any) => {
				const { event } = record;

				if (event.method == 'ContractEmitted') {
					const [address, data] = record.event.data;

					if (address.toString() === this.__nativeContract.address.toString()) {
						const {args, event} = this.__nativeContract.abi.decodeEvent(data);

						if (filter(event.identifier.toString()))
							callback(args, event);
					}
				}
			});
		});
	}

}