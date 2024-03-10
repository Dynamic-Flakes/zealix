'use client'

import React, { useEffect, useState } from 'react'

import { ContractIds } from '@/deployments/deployments'
import { zodResolver } from '@hookform/resolvers/zod'
import ZealixContract from '@inkathon/contracts/typed-contracts/contracts/zealix'
import { Refugee } from '@inkathon/contracts/typed-contracts/types-arguments/zealix'
import {
  useInkathon,
  useRegisteredContract,
  useRegisteredTypedContract,
} from '@scio-labs/use-inkathon'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { contractTxWithToast } from '@/utils/contract-tx-with-toast'
import { countries } from '@/utils/countries'

type SeekAsylumFormData = {
  skill: string
  age: number
  countryOfOrigin: string
  countryOfAsylum: string
  status: 'true' | 'false'
  idType: 'NIN' | 'SSN' | 'Passport_ID' | 'Others'
  govIdNumber: string
  resumeUrl: string
  category: 'refugee' | 'employer' | 'government'
}

const formSchema = z.object({
  skill: z.string(),
  age: z.string(),
  countryOfOrigin: z.string(),
  countryOfAsylum: z.string(),
  status: z.enum(['false', 'true']),
  idType: z.enum(['NIN', 'SSN', 'Passport_ID', 'Others']),
  govIdNumber: z.string(),
  resumeUrl: z.string(),
})

const SeekAsylumForm: React.FC = () => {
  const { api, activeAccount, activeSigner } = useInkathon()
  const { contract, address: contractAddress } = useRegisteredContract(ContractIds.Zealix)
  const { typedContract } = useRegisteredTypedContract(ContractIds.Zealix, ZealixContract)
  const [zealixMessage, setZealixMessage] = useState<string>()
  const [fetchIsLoading, setFetchIsLoading] = useState<boolean>()
  const [currentUserData, setCurrentUserData] = useState<Refugee>()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const { register, reset, handleSubmit } = form

  const fetchRefugeeData = async () => {
    if (!contract || !typedContract || !api) return

    setFetchIsLoading(true)
    try {
      // const result = await contractQuery(api, '', contract, 'zealix')
      // const { output, isError, decodedOutput } = decodeOutput(result, contract, 'zealix')
      // if (isError) throw new Error(decodedOutput)
      // setZealixMessage(output)

      console.log('Ok')
      // Alternatively: Fetch it with typed contract instance
      let typedResult
      if (activeAccount && 'address' in activeAccount) {
        typedResult = await typedContract.query.getRefugeeById(activeAccount.address)
        console.log('Result from typed contract: ', typedResult.value)

        if (typedResult.value.ok) {
          setCurrentUserData(typedResult.value.ok)
        }
      }
    } catch (e: any) {
      console.error(e)
      if (e['issue'] == 'FAIL_AFTER_CALL::RESULT_NOT_OK')
        toast.error('To Proceed, register as Refugee')
      else toast.error('Error while fetching data. Try again…')
      setZealixMessage(undefined)
    } finally {
      setFetchIsLoading(false)
    }
  }
  useEffect(() => {
    fetchRefugeeData()
  }, [typedContract])

  const updateRefugeeData: SubmitHandler<z.infer<typeof formSchema>> = async (formData) => {
    if (!activeAccount || !contract || !activeSigner || !api) {
      toast.error('Wallet not connected. Try again…')
      return
    }

    const newFormData = {
      ...formData,
      status: false,
      accountId: activeAccount.address,
      category: 'refugee',
    }
    const {
      skill,
      age,
      countryOfOrigin,
      countryOfAsylum,
      status,
      idType,
      govIdNumber,
      resumeUrl,
      accountId,
      category,
    } = newFormData

    try {
      console.log(newFormData)

      await contractTxWithToast(api, activeAccount.address, contract, 'registerRefugee', {}, [
        accountId,
        skill,
        age,
        status,
        idType,
        govIdNumber,
        countryOfOrigin,
        countryOfAsylum,
        resumeUrl,
        category,
      ])
      reset()
    } catch (e) {
      console.error(e)
    } finally {
      fetchRefugeeData()
    }
  }

  if (!api) return null

  return (
    <div className="h-[80vh] overflow-y-auto">
      <div className="w-full p-[20px] text-[25px] sm:px-[60px] sm:pt-[40px]">
        Refugee Registeration
      </div>
      <div className="form-container w-full p-[20px] sm:p-[60px] sm:pt-[10px]">
        <Form {...form}>
          <form
            onSubmit={handleSubmit(updateRefugeeData)}
            className="flex flex-col justify-end gap-2"
          >
            <div className="flex flex-wrap gap-[20px]">
              <div className="grid flex-grow gap-[20px] md:flex-1">
                <FormItem>
                  <FormLabel className="text-base">Skills</FormLabel>
                  <FormControl>
                    <Input type="text" {...register('skill')} />
                  </FormControl>
                </FormItem>

                <FormItem>
                  <FormLabel className="text-base">Age</FormLabel>
                  <FormControl>
                    <Input type="number" {...register('age')} />
                  </FormControl>
                </FormItem>

                <FormItem>
                  <FormLabel className="text-base">Country of Origin</FormLabel>
                  <FormControl>
                    <Select
                      {...register('countryOfOrigin')}
                      options={countries.map((country) => ({ label: country, value: country }))}
                    />
                  </FormControl>
                </FormItem>

                <FormItem>
                  <FormLabel className="text-base">Country of Asylum</FormLabel>
                  <FormControl>
                    <Select
                      {...register('countryOfAsylum')}
                      options={countries.map((country) => ({ label: country, value: country }))}
                    />
                  </FormControl>
                </FormItem>
              </div>

              <div className="grid flex-grow gap-[20px] md:flex-1">
                <FormItem>
                  <FormLabel className="text-base">Status</FormLabel>
                  <FormControl>
                    <Select
                      {...register('status')}
                      disabled={true}
                      value={'false'}
                      options={[
                        { label: 'Not Verified', value: 'false' },
                        { label: 'Verified', value: 'true' },
                      ]}
                    />
                  </FormControl>
                </FormItem>

                <FormItem>
                  <FormLabel className="text-base">ID Type</FormLabel>
                  <FormControl>
                    <Select
                      {...register('idType')}
                      options={[
                        { label: 'NIN', value: 'NIN' },
                        { label: 'SSN', value: 'SSN' },
                        { label: 'Passport ID', value: 'Passport_ID' },
                        { label: 'Others', value: 'Others' },
                      ]}
                    />
                  </FormControl>
                </FormItem>

                <FormItem>
                  <FormLabel className="text-base">Government ID Number</FormLabel>
                  <FormControl>
                    <Input type="text" {...register('govIdNumber')} />
                  </FormControl>
                </FormItem>

                <FormItem>
                  <FormLabel className="text-base">Resume URL</FormLabel>
                  <FormControl>
                    <Input type="text" {...register('resumeUrl')} />
                  </FormControl>
                </FormItem>

                {/* <FormItem>
                  <FormLabel className="text-base">Category</FormLabel>
                  <FormControl>
                    <Select
                      {...register('category')}
                      options={[
                        { label: 'Refugee', value: 'refugee' },
                        { label: 'Employer', value: 'employer' },
                        { label: 'Government', value: 'government' },
                      ]}
                    />
                  </FormControl>
                </FormItem> */}
              </div>
            </div>

            <div className="flex justify-end pt-[20px]">
              <FormItem>
                <Button
                  type="submit"
                  className="bg-primary font-bold"
                  disabled={fetchIsLoading || form.formState.isSubmitting}
                  isLoading={form.formState.isSubmitting}
                >
                  Register as Refugee
                  {/* {currentUserData?.category == 'Refugee' ? 'Update My Data' : 'Register'} */}
                </Button>
              </FormItem>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default SeekAsylumForm
