'use client'

import React, { useEffect, useState } from 'react'

import { ContractIds } from '@/deployments/deployments'
import { zodResolver } from '@hookform/resolvers/zod'
import ZealixContract from '@inkathon/contracts/typed-contracts/contracts/zealix'
import { Employer } from '@inkathon/contracts/typed-contracts/types-arguments/zealix'
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
import { contractTxWithToast } from '@/utils/contract-tx-with-toast'

const formSchema = z.object({
  companyName: z.string(),
  registrationNumber: z.string(),
  website: z.string(),
  contactEmail: z.string(),
})

const RegisterEmployerForm: React.FC = () => {
  const { api, activeAccount, activeSigner } = useInkathon()
  const { contract, address: contractAddress } = useRegisteredContract(ContractIds.Zealix)
  const { typedContract } = useRegisteredTypedContract(ContractIds.Zealix, ZealixContract)
  const [zealixMessage, setZealixMessage] = useState<string>()
  const [fetchIsLoading, setFetchIsLoading] = useState<boolean>()
  const [currentUserData, setCurrentUserData] = useState<Employer>()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const { register, reset, handleSubmit } = form

  // Fetch Greeting
  const fetchRefugeeData = async () => {
    if (!contract || !typedContract || !api) return

    setFetchIsLoading(true)
    try {
      // const result = await contractQuery(api, '', contract, 'greet')
      // const { output, isError, decodedOutput } = decodeOutput(result, contract, 'greet')
      // if (isError) throw new Error(decodedOutput)
      // setGreeterMessage(output)

      // Alternatively: Fetch it with typed contract instance
      let typedResult
      if (activeAccount && 'address' in activeAccount) {
        typedResult = await typedContract.query.getEmployerById(activeAccount.address)
        console.log('Result from typed contract: ', typedResult.value)

        if (typedResult.value.ok) {
          setCurrentUserData(typedResult.value.ok)
        }
      }
    } catch (e: any) {
      console.error(e)
      if (e['issue'] == 'FAIL_AFTER_CALL::RESULT_NOT_OK')
        toast.error('To Proceed, register as Employer')
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
    console.log(formData)
    if (!activeAccount || !contract || !activeSigner || !api) {
      toast.error('Wallet not connected. Try again…')
      return
    }

    const newFormData = { ...formData, accountId: activeAccount.address, category: 'employer' }
    const { accountId, companyName, registrationNumber, website, contactEmail, category } =
      newFormData

    try {
      console.log(newFormData)

      await contractTxWithToast(api, activeAccount.address, contract, 'registerEmployer', {}, [
        accountId,
        companyName,
        registrationNumber,
        website,
        contactEmail,
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
        Employer Registeration
      </div>
      <div className="form-container w-full p-[20px] sm:p-[60px] sm:pt-[10px]">
        <Form {...form}>
          <form
            onSubmit={handleSubmit(updateRefugeeData)}
            className="flex flex-col justify-end gap-2"
          >
            <FormItem>
              <FormLabel className="text-base">Company Name</FormLabel>
              <FormControl>
                <Input type="text" {...register('companyName')} />
              </FormControl>
            </FormItem>

            <FormItem>
              <FormLabel className="text-base">Company Registration Number</FormLabel>
              <FormControl>
                <Input type="text" {...register('registrationNumber')} />
              </FormControl>
            </FormItem>

            <FormItem>
              <FormLabel className="text-base">Company Website</FormLabel>
              <FormControl>
                <Input type="text" {...register('website')} />
              </FormControl>
            </FormItem>

            <FormItem>
              <FormLabel className="text-base">Contact Email</FormLabel>
              <FormControl>
                <Input type="email" {...register('contactEmail')} />
              </FormControl>
            </FormItem>

            <div className="flex justify-end pt-[20px]">
              <FormItem>
                <Button
                  type="submit"
                  className="bg-primary font-bold"
                  disabled={fetchIsLoading || form.formState.isSubmitting}
                  isLoading={form.formState.isSubmitting}
                >
                  Register as Employer
                  {/* {currentUserData?.category == 'Employer' ? 'Update My Data' : 'Register'} */}
                </Button>
              </FormItem>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default RegisterEmployerForm
