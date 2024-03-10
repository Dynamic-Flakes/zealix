'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import TabButton from '@/components/ui/tab-button'

import RegisterGovForm from '../components/government/register-gov-form'
import SupportRefugees from '../components/government/support'
import VerifyRefugee from '../components/government/verify-refugee'
import TopBar from '../components/top-bar'

const Government: React.FC = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<string>('register')

  useEffect(() => {
    const tabFromQuery = new URLSearchParams(window.location.search).get('tab')
    if (tabFromQuery) {
      setActiveTab(tabFromQuery)
    }
  }, [])

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
    router.push(`/government/?tab=${tab}`)
  }

  return (
    <>
      <TopBar />
      <div
        className="mt-[40px] flex h-full w-full flex-col items-center justify-center overflow-hidden sm:flex-row md:max-h-[570px]"
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          boxShadow: ' 0 4px 30px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(4.7px)',
          border: '1px solid rgba(255, 255, 255, 0.24)',
          borderRadius: '10px',
        }}
      >
        <div
          className="flex h-[60px] w-[100%] flex-row sm:h-full sm:w-1/3 sm:max-w-[40%] sm:flex-col sm:pt-[30px]"
          style={{
            background: 'rgba(255, 255, 255, 0.06)',
            boxShadow: ' 0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(6.7px)',
          }}
        >
          <TabButton tab="register" activeTab={activeTab} onClick={handleTabClick}>
            Register Here
          </TabButton>
          <TabButton tab="verify-refugee" activeTab={activeTab} onClick={handleTabClick}>
            Verify Refugee
          </TabButton>
          <TabButton tab="support-refugees" activeTab={activeTab} onClick={handleTabClick}>
            Support Refugees
          </TabButton>
        </div>
        <div className="h-full w-full sm:w-full">
          {activeTab === 'register' && <RegisterGovForm />}
          {activeTab === 'verify-refugee' && <VerifyRefugee />}
          {activeTab === 'support-refugees' && <SupportRefugees />}
        </div>
      </div>
    </>
  )
}

export default Government
