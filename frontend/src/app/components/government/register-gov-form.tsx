'use client'

import React, { useEffect, useState } from 'react'

import { ContractIds } from '@/deployments/deployments'
import { zodResolver } from '@hookform/resolvers/zod'
import ZealixContract from '@inkathon/contracts/typed-contracts/contracts/zealix'
import { Government } from '@inkathon/contracts/typed-contracts/types-arguments/zealix'
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

const formSchema = z.object({
  name: z.string(),
  country: z.string(),
})

const RegisterGovForm: React.FC = () => {
  const { api, activeAccount, activeSigner } = useInkathon()
  const { contract, address: contractAddress } = useRegisteredContract(ContractIds.Zealix)
  const { typedContract } = useRegisteredTypedContract(ContractIds.Zealix, ZealixContract)
  const [zealixMessage, setZealixMessage] = useState<string>()
  const [fetchIsLoading, setFetchIsLoading] = useState<boolean>()
  const [currentUserData, setCurrentUserData] = useState<Government>()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const { register, reset, handleSubmit } = form

  // Fetch ing
  const fetchGovData = async () => {
    if (!contract || !typedContract || !api) return

    setFetchIsLoading(true)
    try {
      // const result = await contractQuery(api, '', contract, 'zealix')
      // const { output, isError, decodedOutput } = decodeOutput(result, contract, 'zealix')
      // if (isError) throw new Error(decodedOutput)
      // setZealixMessage(output)

      // Alternatively: Fetch it with typed contract instance
      let typedResult
      if (activeAccount && 'address' in activeAccount) {
        typedResult = await typedContract.query.getGovernmentById(activeAccount.address)
        console.log('Result from typed contract: ', typedResult.value)

        if (typedResult.value.ok) {
          setCurrentUserData(typedResult.value.ok)
        }
      }
    } catch (e) {
      console.error(e)
      toast.error('Error while fetching data. Try again…')
      setZealixMessage(undefined)
    } finally {
      setFetchIsLoading(false)
    }
  }
  useEffect(() => {
    fetchGovData()
  }, [typedContract])

  const updateRefugeeData: SubmitHandler<z.infer<typeof formSchema>> = async (formData) => {
    console.log(formData)
    if (!activeAccount || !contract || !activeSigner || !api) {
      toast.error('Wallet not connected. Try again…')
      return
    }

    const newFormData = { ...formData, accountId: activeAccount.address, category: 'government' }
    const { name, country, accountId, category } = newFormData

    try {
      console.log(newFormData)

      await contractTxWithToast(api, activeAccount.address, contract, 'registerGovernment', {}, [
        name,
        country,
        accountId,
        category,
      ])
      // reset()
    } catch (e) {
      console.error(e)
    } finally {
      fetchGovData()
    }
  }

  if (!api) return null

  return (
    <div className="h-[80vh] overflow-y-auto">
      <div className="w-full p-[20px] text-[25px] sm:px-[60px] sm:pt-[40px]">
        Government Registeration
      </div>
      <div className="form-container w-full p-[20px] sm:p-[60px] sm:pt-[10px]">
        <Form {...form}>
          <form
            onSubmit={handleSubmit(updateRefugeeData)}
            className="flex flex-col justify-end gap-2"
          >
            <FormItem>
              <FormLabel className="text-base">Agency Name</FormLabel>
              <FormControl>
                <Input type="text" {...register('name')} />
              </FormControl>
            </FormItem>

            <FormItem>
              <FormLabel className="text-base">Country</FormLabel>
              <FormControl>
                <Select
                  {...register('country')}
                  options={countries.map((country) => ({ label: country, value: country }))}
                />
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
                  Register
                  {/* {currentUserData?.category == 'Government' ? 'Update My Data' : 'Register'} */}
                </Button>
              </FormItem>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default RegisterGovForm
