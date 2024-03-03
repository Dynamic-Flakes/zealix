#![cfg_attr(not(feature = "std"), no_std)]

#[ink::contract]
mod refugee_registry {
    use ink::storage::{ Mapping as StorageHashMap};
    use ink_prelude::vec::Vec;

    #[ink(storage)]
    pub struct RefugeeRegistry {
        /// Mapping from owner to an account.
        accounts: StorageHashMap<AccountId, Account>,
        governments: StorageHashMap<AccountId, Government>,
        employers: StorageHashMap<AccountId, Employer>,
        job_contracts: StorageHashMap<AccountId, JobContract>,
        refugees: StorageHashMap<AccountId,Refugee>
    }

    /// Emitted whenever an account is being registered.
    #[ink(event)]
    pub struct Register {
        #[ink(topic)]
        name: Hash,
        #[ink(topic)]
        from: AccountId,
    }
    #[ink(event)]
    pub struct AccountCreated {
        #[ink(topic)]
        account_id: AccountId,
        #[ink(topic)]
        category: Category,
    }

    #[ink(event)]
    pub struct RefugeeCreated {
        #[ink(topic)]
        account_id: AccountId,
        #[ink(topic)]
        country_of_origin: String,
        #[ink(topic)]
        country_of_asylum: String,
    }

    #[ink(event)]
    pub struct RefugeeProfileUpdated {
        #[ink(topic)]
        account_id: AccountId,
        #[ink(topic)]
        resume_url: String,
    }

    #[ink(event)]
    pub struct RefugeeStatusToggled {
        #[ink(topic)]
        account_id: AccountId,
        #[ink(topic)]
        new_status: bool,
    }

    #[ink(event)]
    pub struct GovernmentRegistered {
        #[ink(topic)]
        account_id: AccountId,
        #[ink(topic)]
        country: String,
    }

    #[ink(event)]
    pub struct EmployerRegistered {
        #[ink(topic)]
        account_id: AccountId,
        #[ink(topic)]
        company_name: String,
    }

    #[ink(event)]
    pub struct EmployerStatusToggled {
        #[ink(topic)]
        account_id: AccountId,
        #[ink(topic)]
        new_status: bool,
    }

    #[ink(event)]
    pub struct JobContractRegistered {
        #[ink(topic)]
        employer_id: AccountId,
        #[ink(topic)]
        position: String,
        #[ink(topic)]
        hired_refugee: AccountId,
    }

    #[derive(Debug, PartialEq, Eq, Clone, Copy, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Category {
        Government,
        Employer,
        Refugee,
        Zealix,
    }

    #[derive(Debug, PartialEq, Eq, PartialOrd, Ord, Clone, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std",derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout))]
    pub struct Account {
        account_id: AccountId,
        category: Category,
    }
    

    #[derive(Debug, PartialEq, Eq, PartialOrd, Ord, Clone, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std",derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout))]
    pub struct Refugee {
        skill: String,
        age: u32,
        status: bool,
        id_type: String,
        gov_id_number: String,
        country_of_origin: String,
        country_of_asylum: String,
        resume_url: String,
    }

    #[derive(Debug, PartialEq, Eq, PartialOrd, Ord, Clone, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std",derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout))]
    pub struct Government {
        name: String,
        country: String,
    }

    #[derive(Debug, PartialEq, Eq, PartialOrd, Ord, Clone, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std",derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout))]
    pub struct Employer {
        company_name: String,
        registration_number: String,
        website: String,
        contact_email: String,
        status: bool,
    }

    #[derive(Debug, PartialEq, Eq, PartialOrd, Ord, Clone, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std",derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout))]
    pub struct JobContract {
        position: String,
        keyword: String,
        pay: u32,
        hours: u32,
        conditions: String,
        hired_refugee: AccountId,
    }

    impl RefugeeRegistry {
        /// Creates a refugee registry contract.
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                accounts: StorageHashMap::new(),
                governments: StorageHashMap::new(),
                employers: StorageHashMap::new(),
                job_contracts: StorageHashMap::new(),
                refugees: StorageHashMap::new(),

            }
        }

        #[ink(message)]
        pub fn register_account(&mut self, account_id: AccountId, category: Category) {
            let account = Account {
                account_id: account_id,
                category: category,
            };
            self.accounts.insert(self.env().caller(), &account);
            self.env().emit_event(AccountCreated {
                account_id,
                category,
            });
        }

        #[ink(message)]
        pub fn register_refugee(
            &mut self,
            account_id: AccountId,
            skill: String,
            age: u32,
            status: bool,
            id_type: String,
            gov_id_number: String,
            country_of_origin: String,
            country_of_asylum: String,
            resume_url: String,
        ) {
            assert_eq!(self.accounts.get(&account_id).unwrap().category, Category::Refugee);
            let refugee = Refugee {
                skill,
                age,
                status,
                id_type,
                gov_id_number,
                country_of_origin,
                country_of_asylum,
                resume_url,
            };
            self.refugees.insert(self.env().caller(), &refugee);
            self.env().emit_event(RefugeeCreated {
                account_id,
                country_of_origin,
                country_of_asylum,
            });
        }

        #[ink(message)]
        pub fn get_refugees(&self) -> Vec<(AccountId, Refugee)> {
            self.refugees
                .iter()
                .filter_map(|(id, account)| {
                    if account.category == Category::Refugee {
                        Some((*id, self.get_refugee(*id).unwrap()))
                    } else {
                        None
                    }
                })
                .collect()
        }

        #[ink(message)]
        pub fn get_refugee(&self, account_id: AccountId) -> Option<Refugee> {
            if let Some(account) = self.accounts.get(&account_id) {
                if account.category == Category::Refugee {
                    // Use `self.accounts` instead of `self.refugees`
                    return Some(self.accounts.get(&account_id).unwrap().clone());
                }
            }
            None
        }

        #[ink(message)]
        pub fn update_refugee_resume_url(&mut self, account_id: AccountId, new_url: String) {
            assert_eq!(self.accounts.get(&account_id).unwrap().category, Category::Refugee);
            if let Some(mut refugee) = self.accounts.get_mut(&account_id) {
                // Use `self.accounts` instead of `self.refugees`
                refugee.resume_url = new_url;
                self.env().emit_event(RefugeeProfileUpdated {
                    account_id,
                    resume_url: new_url,
                });
            }
        }

        #[ink(message)]
        pub fn toggle_refugee_status(&mut self, account_id: AccountId, new_status: bool) {
            assert_eq!(self.accounts.get(&account_id).unwrap().category, Category::Government);
            if let Some(mut refugee) = self.accounts.get_mut(&account_id) {
                // Use `self.accounts` instead of `self.refugees`
                refugee.status = new_status;
                self.env().emit_event(RefugeeStatusToggled {
                    account_id,
                    new_status,
                });
            }
        }

        #[ink(message)]
        pub fn register_government(&mut self, account_id: AccountId, name: String, country: String) {
            self.accounts.insert(account_id, Account { category: Category::Government });
            self.governments.insert(account_id, Government { name, country });
            self.env().emit_event(GovernmentRegistered {
                account_id,
                country,
            });
        }

        #[ink(message)]
        pub fn register_employer(
            &mut self,
            account_id: AccountId,
            company_name: String,
            registration_number: String,
            website: String,
            contact_email: String,
        ) {
            self.accounts.insert(account_id, Account { category: Category::Employer });
            self.employers.insert(
                account_id,
                Employer {
                    company_name,
                    registration_number,
                    website,
                    contact_email,
                    status: false,
                },
            );
            self.env().emit_event(EmployerRegistered {
                account_id,
                company_name,
            });
        }

        #[ink(message)]
        pub fn toggle_employer_status(&mut self, account_id: AccountId, new_status: bool) -> bool {
            assert_eq!(self.accounts.get(&account_id).unwrap().category, Category::Zealix);
            if let Some(employer) = self.employers.get_mut(&account_id) {
                employer.status = new_status;
                self.env().emit_event(EmployerStatusToggled {
                    account_id,
                    new_status,
                });
                return true;
            }
            false
        }

        #[ink(message)]
        pub fn register_job_contract(
            &mut self,
            position: String,
            keyword: String,
            pay: u32,
            hours: u32,
            conditions: String,
            hired_refugee: AccountId,
        ) {
            assert_eq!(self.accounts.get(&hired_refugee).unwrap().category, Category::Refugee);
            let employer_id = self.env().caller();
            self.job_contracts.insert(
                employer_id,
                JobContract {
                    position,
                    keyword,
                    pay,
                    hours,
                    conditions,
                    hired_refugee,
                },
            );
            self.env().emit_event(JobContractRegistered {
                employer_id,
                position,
                hired_refugee,
            });
        }

        #[ink(message)]
        pub fn match_refugee_by_keywords(&self, keywords: String) -> Vec<(AccountId, Refugee)> {
            self.accounts
                .iter()
                .filter_map(|(id, account)| {
                    if account.category == Category::Refugee {
                        let refugee = self.get_refugee(*id).unwrap();
                        if refugee.skill.contains(&keywords) {
                            Some((*id, refugee))
                        } else {
                            None
                        }
                    } else {
                        None
                    }
                })
                .collect()
        }
    }

    #[cfg(test)]
    mod tests {
        use super::*;

        #[test]
        fn test_register_account() {
            let mut contract = RefugeeRegistry::new();
            let account_id = AccountId::from([1; 32]);
            contract.register_account(account_id, Category::Refugee);
            assert_eq!(
                contract.accounts.get(&account_id).unwrap().category,
                Category::Refugee
            );
        }

        // Add more tests for each function
    }
}
