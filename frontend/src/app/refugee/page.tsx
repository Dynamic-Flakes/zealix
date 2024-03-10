'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import TabButton from '@/components/ui/tabbutton'

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

  const AsylumContent: React.FC = () => {
    return <div>Seek Asylum Content</div>
  }

  const ResumeContent: React.FC = () => {
    return <div>My Resume Content</div>
  }

  const JobContent: React.FC = () => {
    return <div>Job Matches Content</div>
  }

  return (
    <>
      <TopBar />
      <div
        className="mt-[40px] flex h-[200px] w-full flex-col items-center justify-center overflow-hidden sm:flex-row"
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          boxShadow: ' 0 4px 30px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(4.7px)',
          border: '1px solid rgba(255, 255, 255, 0.24)',
          borderRadius: '10px',
        }}
      >
        <div
          className="flex h-[60px] w-[100%] flex-row pt-[30px] sm:h-full sm:w-1/3 sm:max-w-[40%] sm:flex-col"
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
        <div className="h-full w-2/3 sm:w-full">
          {/* {activeTab === 'asylum' && <SeekAsylumForm />} */}
          {activeTab === 'asylum' && <AsylumContent />}
          {activeTab === 'resume' && <ResumeContent />}
          {activeTab === 'job' && <JobContent />}
        </div>
      </div>
    </>
  )
}

export default Refugee
