import { FC } from 'react'

export const HomePageStats: FC = () => {
  return (
    <>
      <div className="mt-[70px] flex flex-wrap justify-center gap-[40px] sm:flex-nowrap">
        <div
          className="flex-center flex h-[200px] w-[400px] flex-col justify-center gap-[10px] px-[15px] py-[10px]"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            boxShadow: ' 0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(4.7px)',
            border: '1px solid rgba(255, 255, 255, 0.24)',
            borderRadius: '10px',
          }}
        >
          <div className="uppercase tracking-[10px] opacity-[0.6]">Refugee</div>
          <div className="text-[22px] font-semibold">Already Employed</div>
          <div className="h-[3px] w-[200px] bg-[#fff] opacity-[0.6]"></div>
          <div className="text-[28px]">2,000</div>
        </div>
        <div
          className="flex-center flex h-[200px] w-[400px] flex-col justify-center gap-[10px] px-[15px] py-[10px]"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            boxShadow: ' 0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(4.7px)',
            border: '1px solid rgba(255, 255, 255, 0.24)',
            borderRadius: '10px',
          }}
        >
          <div className="uppercase tracking-[10px] opacity-[0.6]">Zealix</div>
          <div className="text-[22px] font-semibold">Active Employers</div>
          <div className="h-[3px] w-[140px] bg-[#fff] opacity-[0.6]"></div>
          <div className="text-[28px]">900+</div>
        </div>
      </div>
    </>
  )
}
