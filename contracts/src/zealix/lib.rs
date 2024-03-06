#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod zealix {
    use ink::storage::{Mapping as StorageHashMap};
    use ink::env::debug_println;
    use ink::prelude::string::String;
    use ink::prelude::vec::Vec;

    #[ink(storage)]
    pub struct Zealix {
        /// Mapping from owner to an account.
        accounts: StorageHashMap<AccountId, Account>,
        governments: StorageHashMap<AccountId, Government>,
        employers: StorageHashMap<AccountId, Employer>,
        job_contracts: StorageHashMap<AccountId, JobContract>,
        refugees: StorageHashMap<AccountId, Refugee>,
        refugees_accounts: Vec<AccountId>,
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
    pub struct RefugeeDeleted {
        #[ink(topic)]
        account_id: AccountId,
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
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
    )]
    pub enum Category {
        Government,
        Employer,
        Refugee,
        Zealix,
    }

    #[derive(Debug, PartialEq, Eq, Clone, scale::Encode, scale::Decode)]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
    )]
    pub struct Account {
        category: Category,
    }

    #[derive(Debug, PartialEq, Eq, PartialOrd, Ord, Clone, scale::Encode, scale::Decode)]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
    )]
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
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
    )]
    pub struct Government {
        name: String,
        country: String,
    }

    #[derive(Debug, PartialEq, Eq, PartialOrd, Ord, Clone, scale::Encode, scale::Decode)]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
    )]
    pub struct Employer {
        company_name: String,
        registration_number: String,
        website: String,
        contact_email: String,
        status: bool,
    }

    #[derive(Debug, PartialEq, Eq, PartialOrd, Ord, Clone, scale::Encode, scale::Decode)]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
    )]
    pub struct JobContract {
        position: String,
        keyword: String,
        pay: u32,
        hours: u32,
        conditions: String,
        hired_refugee: AccountId,
    }

    impl Zealix {
        /// Creates a refugee registry contract.
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                accounts: StorageHashMap::new(),
                governments: StorageHashMap::new(),
                employers: StorageHashMap::new(),
                job_contracts: StorageHashMap::new(),
                refugees: StorageHashMap::new(),
                refugees_accounts: Vec::new(),

            }
        }

        #[ink(message)]
        pub fn register_account(&mut self, account_id: AccountId, category: Category) {
            let account = Account { category: category };
            let caller = Self::env().caller();
            self.accounts.insert(caller, &account);
            // Emit an event.
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
            assert_eq!(
                self.accounts.get(&account_id).unwrap().category,
                Category::Refugee
            );
            
            let refugee = Refugee {
                skill,
                age,
                status,
                id_type,
                gov_id_number,
                country_of_origin: country_of_origin.clone(), // Clone country_of_origin
                country_of_asylum: country_of_asylum.clone(), // Clone country_of_origin
                resume_url,
            };
            self.refugees.insert(account_id, &refugee);
            self.refugees_accounts.push(account_id);

            self.env().emit_event(RefugeeCreated {
                account_id,
                country_of_origin,
                country_of_asylum,
            });
        }

       #[ink(message)]
       pub fn get_all_refugee_profiles(&self) -> Vec<Refugee> {
           let mut all_refugees = Vec::new();
           for refugee_account_id in &self.refugees_accounts {
               if let Some(refugee) = self.refugees.get(refugee_account_id) {
                debug_println!("Found Refugee {:?}", refugee); // Use a formatting specifier

                   all_refugees.push(refugee.clone());
               }
           }
           all_refugees
       }

        #[ink(message)]
        pub fn get_refugee_by_id(&self, account_id: AccountId) -> Option<Refugee> {
            let single_refugee = self
                .refugees
                .get(&account_id)
                .expect("Oh no, No refugee found");

            Some(single_refugee)
        }

        #[ink(message)]
        pub fn delete_refugee(&self ,account_id: AccountId){
            self.refugees.remove(account_id);
            self.env().emit_event(RefugeeDeleted{account_id})
 
        }

        #[ink(message)]
        pub fn update_refugee_resume_url(&mut self, account_id: AccountId, new_url: String) {
            if let Some(mut refugee) = self.refugees.get(&account_id) {
                let caller_category = self.accounts.get(&self.env().caller()).unwrap().category;
                if caller_category == Category::Refugee {
                    refugee.resume_url = new_url.clone();
                    // Emit an event
                    self.env().emit_event(RefugeeProfileUpdated {
                        account_id,
                        resume_url: new_url,
                    });
                }
            }
        }


        #[ink(message)]
        pub fn toggle_refugee_status(&mut self, account_id: AccountId, new_status: bool) {
            assert_eq!(
                self.accounts.get(&account_id).unwrap().category,
                Category::Government
            );
            if let Some(mut refugee) = self.refugees.get(&account_id) {
                refugee.status = new_status;
                self.env().emit_event(RefugeeStatusToggled {
                    account_id,
                    new_status,
                });
            }
        }

        #[ink(message)]
        pub fn register_government(
            &mut self,
            account_id: AccountId,
            name: String,
            country: String,
        ) {
            let government = Government {
                name,
                country: country.clone(), // Clone the string

            };
            self.governments.insert(account_id, &government);
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
            let employer = Employer {
                company_name: company_name.clone(), // Clone the string
                registration_number,
                website,
                contact_email,
                status: false,
            };
            self.employers.insert(account_id, &employer);
            self.env().emit_event(EmployerRegistered {
                account_id,
                company_name,
            });
        }

        #[ink(message)]
        pub fn toggle_employer_status(&mut self, account_id: AccountId, new_status: bool) -> bool {
            assert_eq!(
                self.accounts.get(&account_id).unwrap().category,
                Category::Zealix
            );
            if let Some(mut employer) = self.employers.get(&account_id) {
                employer.status = new_status;
                debug_println!("Updated Employer {:?}", employer); // Use a formatting specifier
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
            let employer_id = self.env().caller();

            assert_eq!(
                self.accounts.get(&employer_id).unwrap().category,
                Category::Employer
            );
            let employer_id = self.env().caller();
            let job_contract =JobContract {
                position: position.clone(), // Clone the string
                keyword,
                pay,
                hours,
                conditions,
                hired_refugee,
            };
            self.job_contracts.insert(employer_id, &job_contract);
            self.env().emit_event(JobContractRegistered {
                employer_id,
                position,
                hired_refugee,
            });
        }

        // #[ink(message)]
        // pub fn match_refugee_skill(&self, keywords: Vec<String>) -> Vec<Refugee> {
        //     self.refugees_accounts
        //         .iter()
        //         .filter_map(|account_id| {
        //             self.refugees
        //                 .get(account_id)
        //                 .filter(|refugee| keywords.iter().any(|keyword| refugee.skill.contains(keyword)))
        //                 .cloned()
        //         })
        //         .collect()
        // }
    
    }

    #[cfg(test)]
    mod tests {
        /// Imports all the definitions from the outer scope so we can use them here.
        use super::*;
    
        #[ink::test]
        fn test_register_account() {
            let mut contract = Zealix::new();
            let account_id = AccountId::from([1; 32]);
            contract.register_account(account_id, Category::Refugee);
            assert_eq!(
                contract.accounts.get(&account_id).unwrap().category,
                Category::Refugee
            );
        }
    
        #[ink::test]
        fn test_register_refugee() {
            let mut contract = Zealix::new();
            let account_id = AccountId::from([1; 32]);
            let country_of_origin = String::from("Country1");
            let country_of_asylum = String::from("Country2");
            contract.register_account(account_id, Category::Refugee);
            contract.register_refugee(
                account_id,
                String::from("Skill"),
                30,
                true,
                String::from("ID Type"),
                String::from("ID Number"),
                country_of_origin.clone(),
                country_of_asylum.clone(),
                String::from("Resume URL"),
            );
            let refugee = contract.get_refugee_by_id(account_id).unwrap();
            assert_eq!(refugee.country_of_origin, country_of_origin);
            assert_eq!(refugee.country_of_asylum, country_of_asylum);
        }

        #[ink::test]
        fn test_toggle_refugee_status() {
            let mut contract = Zealix::new();
            let account_id = AccountId::from([1; 32]);
            let initial_status = true;
            let new_status = false;
    
            contract.register_account(account_id, Category::Government);
            contract.register_refugee(
                account_id,
                String::from("Coding"),
                25,
                initial_status,
                String::from("Passport"),
                String::from("123456"),
                String::from("Country1"),
                String::from("Country2"),
                String::from("example.com/resume"),
            );
    
            contract.toggle_refugee_status(account_id, new_status);
            let refugee = contract.get_refugee_by_id(account_id).unwrap();
            assert_eq!(refugee.status, new_status);
        }

        #[ink::test]
        fn test_get_all_refugee_profiles() {
            let mut contract = Zealix::new();
            let account_id_1 = AccountId::from([1; 32]);
            let account_id_2 = AccountId::from([2; 32]);
            let skill_1 = "Programming".to_string();
            let skill_2 = "Design".to_string();
            contract.register_account(account_id_1, Category::Refugee);
            contract.register_account(account_id_2, Category::Refugee);
            contract.register_refugee(
                account_id_1,
                skill_1.clone(),
                30,
                true,
                "Passport".to_string(),
                "123456789".to_string(),
                "Country A".to_string(),
                "Country B".to_string(),
                "https://example.com/resume1".to_string(),
            );
            contract.register_refugee(
                account_id_2,
                skill_2.clone(),
                25,
                false,
                "ID Card".to_string(),
                "987654321".to_string(),
                "Country C".to_string(),
                "Country D".to_string(),
                "https://example.com/resume2".to_string(),
            );
            let all_refugees = contract.get_all_refugee_profiles();
            debug_println!("Found Refugee {:?}", all_refugees); // Use a formatting specifier

            assert_eq!(all_refugees.len(), 2);
            assert_eq!(all_refugees[0].skill, skill_1);
            assert_eq!(all_refugees[1].skill, skill_2);
        }
    
        #[ink::test]
        fn test_get_refugee_by_id() {
            let mut contract = Zealix::new();
            let account_id = AccountId::from([1; 32]);
            let skill = String::from("Skill");
            let age = 30;
            let status = true;
            let id_type = String::from("ID Type");
            let gov_id_number = String::from("ID Number");
            let country_of_origin = String::from("Country1");
            let country_of_asylum = String::from("Country2");
            let resume_url = String::from("Resume URL");
            contract.register_account(account_id, Category::Refugee);
            contract.register_refugee(
                account_id,
                skill.clone(),
                age,
                status,
                id_type.clone(),
                gov_id_number.clone(),
                country_of_origin.clone(),
                country_of_asylum.clone(),
                resume_url.clone(),
            );
            let refugee = contract.get_refugee_by_id(account_id).unwrap();
            assert_eq!(refugee.skill, skill);
            assert_eq!(refugee.age, age);
            assert_eq!(refugee.status, status);
            assert_eq!(refugee.id_type, id_type);
            assert_eq!(refugee.gov_id_number, gov_id_number);
            assert_eq!(refugee.country_of_origin, country_of_origin);
            assert_eq!(refugee.country_of_asylum, country_of_asylum);
            assert_eq!(refugee.resume_url, resume_url);
        }
    
        #[ink::test]
        fn test_register_government() {
            let mut contract = Zealix::new();
            let account_id = AccountId::from([1; 32]);
            let country = String::from("Country");
            contract.register_government(account_id, String::from("Name"), country.clone());
            let government = contract.governments.get(&account_id).unwrap();
            assert_eq!(government.country, country);
        }
    
        #[ink::test]
        fn test_register_employer() {
            let mut contract = Zealix::new();
            let account_id = AccountId::from([1; 32]);
            let company_name = String::from("Company");
            contract.register_employer(
                account_id,
                company_name.clone(),
                String::from("Reg Number"),
                String::from("Website"),
                String::from("Email"),
            );
            let employer = contract.employers.get(&account_id).unwrap();
            assert_eq!(employer.company_name, company_name);
        }
    
        #[ink::test]
        fn test_toggle_employer_status() {
            let mut contract = Zealix::new();
            let account_id = AccountId::from([1; 32]);
            let initial_status = false; // Set initial status to false
            let new_status = true;
        
            contract.register_account(account_id, Category::Zealix);
            contract.register_employer(
                account_id,
                String::from("Company1"),
                String::from("123456"),
                String::from("example.com"),
                String::from("info@example.com"),
            );
        
            debug_println!("Calling account {:?}", account_id); // Use a formatting specifier

            // Ensure the initial status is set correctly
            let employer = contract.employers.get(&account_id).unwrap();
            debug_println!("Found Employer {:?}", employer); // Use a formatting specifier
            assert_eq!(employer.status, initial_status);
        
            let result = contract.toggle_employer_status(account_id, new_status);
            debug_println!("Toggle Employer {:?}", employer); // Use a formatting specifier
            assert_eq!(result, true);
        
            let employer = contract.employers.get(&account_id).unwrap();
            debug_println!("Found Employer after toggle {:?}", employer); // Use a formatting specifier
            assert_eq!(employer.status, new_status);
        }
    
        #[ink::test]
        fn test_register_job_contract() {
            let mut contract = Zealix::new();
            let employer_id = AccountId::from([1; 32]);
            let hired_refugee = AccountId::from([2; 32]);
            let position = String::from("Position");
            contract.register_account(employer_id, Category::Employer);
            contract.register_job_contract(
                position.clone(),
                String::from("Keyword"),
                100,
                40,
                String::from("Conditions"),
                hired_refugee,
            );
            let job_contract = contract.job_contracts.get(&employer_id).unwrap();
            assert_eq!(job_contract.position, position);
        }
    }
    
}
