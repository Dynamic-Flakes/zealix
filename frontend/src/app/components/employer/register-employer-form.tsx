'use client'

import React, { useEffect, useState } from 'react'

import { ContractIds } from '@/deployments/deployments'
import { zodResolver } from '@hookform/resolvers/zod'
import GreeterContract from '@inkathon/contracts/typed-contracts/contracts/greeter'
import {
  contractQuery,
  decodeOutput,
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

const formSchema = z.object({
  companyName: z.string(),
  registrationNumber: z.string(),
  website: z.string(),
  contactEmail: z.string(),
})

const RegisterEmployerForm: React.FC = () => {
  const { api, activeAccount, activeSigner } = useInkathon()
  const { contract, address: contractAddress } = useRegisteredContract(ContractIds.Greeter)
  const { typedContract } = useRegisteredTypedContract(ContractIds.Greeter, GreeterContract)
  const [greeterMessage, setGreeterMessage] = useState<string>()
  const [fetchIsLoading, setFetchIsLoading] = useState<boolean>()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const { register, reset, handleSubmit } = form

  // Fetch Greeting
  const fetchRefugeeData = async () => {
    if (!contract || !typedContract || !api) return

    setFetchIsLoading(true)
    try {
      const result = await contractQuery(api, '', contract, 'greet')
      const { output, isError, decodedOutput } = decodeOutput(result, contract, 'greet')
      if (isError) throw new Error(decodedOutput)
      setGreeterMessage(output)

      // Alternatively: Fetch it with typed contract instance
      const typedResult = await typedContract.query.greet()
      console.log('Result from typed contract: ', typedResult.value)
    } catch (e) {
      console.error(e)
      toast.error('Error while fetching greeting. Try again…')
      setGreeterMessage(undefined)
    } finally {
      setFetchIsLoading(false)
    }
  }
  useEffect(() => {
    // fetchRefugeeData()
  }, [typedContract])

  const updateRefugeeData: SubmitHandler<z.infer<typeof formSchema>> = async (formData) => {
    console.log(formData)
    if (!activeAccount || !contract || !activeSigner || !api) {
      toast.error('Wallet not connected. Try again…')
      return
    }

    const newFormData = { ...formData, accountId: activeAccount.address, category: 'employer' }

    try {
      console.log(newFormData)

      // await contractTxWithToast(api, activeAccount.address, contract, 'setMessage', {}, [skills])
      // reset()
    } catch (e) {
      console.error(e)
    } finally {
      // fetchRefugeeData()
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
                  Update Company Data
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
