import Link from 'next/link'
import { FC } from 'react'

export const HomePageTitle: FC = () => {
  return (
    <>
      <div className="mt-[40px] flex flex-col items-center gap-[30px] px-4 text-center">
        <div className="mantra text-[36px] font-semibold md:text-[50px] lg:text-[70px]">
          The Silo of Hope
        </div>
        <div className="md:text-[20px]">
          &quot;Each job is a beacon of hope for those displaced from their homes. Adding a job to
          this silo is a stand for humanity. Every job given is another brick, and together, brick
          by brick, we will build a better world.&quot; ~ Zealix
        </div>
        <div className="mmb-[10px] mt-[30px] flex gap-[20px]">
          <Link href={'/government'}>
            <div className="rounded-[4px] border px-4 py-2 hover:backdrop-blur-sm">
              Government Access
            </div>
          </Link>
          <Link href={'/employer'}>
            <div className="rounded-[4px] border bg-[#d6d3c7] px-4 py-2 text-[#181506]">
              Employer Access
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}
