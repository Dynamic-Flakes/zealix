'use client'

import { useEffect, useState } from 'react'

import { ContractIds } from '@/deployments/deployments'
import { zodResolver } from '@hookform/resolvers/zod'
import ZealixContract from '@inkathon/contracts/typed-contracts/contracts/zealix'
import { Government, Refugee } from '@inkathon/contracts/typed-contracts/types-arguments/zealix'
import {
  useInkathon,
  useRegisteredContract,
  useRegisteredTypedContract,
} from '@scio-labs/use-inkathon'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as z from 'zod'

import { contractTxWithToast } from '@/utils/contract-tx-with-toast'

const formSchema = z.object({
  name: z.string(),
  country: z.string(),
})

export default function VerifyRefugee() {
  const { api, activeAccount, activeSigner } = useInkathon()
  const { contract, address: contractAddress } = useRegisteredContract(ContractIds.Zealix)
  const { typedContract } = useRegisteredTypedContract(ContractIds.Zealix, ZealixContract)
  const [zealixMessage, setZealixMessage] = useState<string>()
  const [fetchIsLoading, setFetchIsLoading] = useState<boolean>()
  const [currentUserData, setCurrentUserData] = useState<Government>()
  const [refugeesProfiles, setRefugeesProfiles] = useState<Refugee[]>()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const { register, reset, handleSubmit } = form

  const fetchGovData = async () => {
    if (!contract || !typedContract || !api) return

    setFetchIsLoading(true)
    try {
      // Alternatively: Fetch it with typed contract instance
      let typedResult
      if (activeAccount && 'address' in activeAccount) {
        typedResult = await typedContract.query.getGovernmentById(activeAccount.address)
        console.log('Result from typed contract: ', typedResult.value)

        if (typedResult.value.ok) {
          setCurrentUserData(typedResult.value.ok)
        }
      }
    } catch (e: any) {
      console.log(e)
      if (e['issue'] == 'FAIL_AFTER_CALL::RESULT_NOT_OK')
        toast.error('To proceed, register as Government')
      else toast.error('Error while fetching data. Try again…')
      setZealixMessage(undefined)
    } finally {
      setFetchIsLoading(false)
      fetchRefugeesData()
    }
  }

  useEffect(() => {
    fetchGovData()
  }, [typedContract])

  const fetchRefugeesData = async () => {
    if (!contract || !typedContract || !api) return

    setFetchIsLoading(true)
    try {
      let typedResult
      if (activeAccount && 'address' in activeAccount) {
        typedResult = await typedContract.query.getAllRefugeeProfiles()
        console.log('Result from typed contract: ', typedResult.value)

        if (typedResult.value.ok) {
          setRefugeesProfiles(typedResult.value.ok)
        }
      }
    } catch (e: any) {
      console.log(e)
      toast.error('Error while fetching Refugee Profiles. Try again…')
      setZealixMessage(undefined)
    } finally {
      setFetchIsLoading(false)
    }
  }

  const verifyRefugeeProfile: SubmitHandler<z.infer<typeof formSchema>> = async (formData) => {
    console.log(formData)
    if (!activeAccount || !contract || !activeSigner || !api) {
      toast.error('Wallet not connected. Try again…')
      return
    }

    const newFormData = { ...formData, accountId: activeAccount.address, newStatus: 'true' }
    const { accountId, newStatus } = newFormData

    try {
      console.log(newFormData)

      await contractTxWithToast(api, activeAccount.address, contract, 'toogleRefugeeStatus', {}, [
        accountId,
        newStatus,
      ])
      reset()
    } catch (e) {
      console.error(e)
    } finally {
      fetchGovData()
    }
  }

  if (!api) return null

  return (
    <div className="h-[80vh] overflow-y-auto">
      <div className="w-full p-[20px] text-[25px] sm:px-[60px] sm:pt-[40px]">Verify Refugee</div>
      <div className="t-[18px] flex flex-col gap-[20px] p-[20px]">
        {refugeesProfiles?.map((refugee, index) => (
          <div
            key={index}
            className="flex w-full justify-between border-b-[1px] border-[#ffffff36] pb-[10px]"
          >
            <div className="block">
              <div className="flex">
                {refugee.idType}:{' '}
                <div className="pl-[5px] font-semibold">{refugee.govIdNumber}</div>
              </div>
              <div className="flex">
                Country of Asylum:{' '}
                <div className="pl-[5px] font-semibold">{refugee.countryOfAsylum}</div>
              </div>
            </div>
            <div className="flex items-center">
              <button
                // onClick={() => verifyRefugeeProfile(refugee.)}
                disabled={refugee.status}
                className="rounded-[5px] border px-2 hover:backdrop-blur-md"
              >
                {!refugee.status ? 'Verify Refugee' : 'Verified'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
