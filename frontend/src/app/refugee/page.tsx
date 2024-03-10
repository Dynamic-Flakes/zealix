'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import TabButton from '@/components/ui/tab-button'

import JobMatch from '../components/refugee/job-match'
import MyResume from '../components/refugee/my-resume'
import SeekAsylumForm from '../components/refugee/seek-asylum-form'
import TopBar from '../components/top-bar'

const Refugee: React.FC = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<string>('asylum')

  useEffect(() => {
    const tabFromQuery = new URLSearchParams(window.location.search).get('tab')
    if (tabFromQuery) {
      setActiveTab(tabFromQuery)
    }
  }, [])

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
    router.push(`/refugee/?tab=${tab}`)
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
          <TabButton tab="asylum" activeTab={activeTab} onClick={handleTabClick}>
            Seek Asylum
          </TabButton>
          <TabButton tab="resume" activeTab={activeTab} onClick={handleTabClick}>
            My Resume
          </TabButton>
          <TabButton tab="job" activeTab={activeTab} onClick={handleTabClick}>
            Job Matches
          </TabButton>
        </div>
        <div className="h-full w-full sm:w-full">
          {activeTab === 'asylum' && <SeekAsylumForm />}
          {activeTab === 'resume' && <MyResume />}
          {activeTab === 'job' && <JobMatch />}
        </div>
      </div>
    </>
  )
}

export default Refugee
