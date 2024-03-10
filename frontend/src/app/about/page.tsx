'use client'

import { IoHeartSharp } from 'react-icons/io5'

import TopBar from '../components/top-bar'

export default function About() {
  return (
    <>
      <TopBar />
      <div
        className="mt-[40px] flex h-full w-full flex-col items-center justify-center gap-[20px] overflow-hidden  md:max-h-[570px]"
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          boxShadow: ' 0 4px 30px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(4.7px)',
          border: '1px solid rgba(255, 255, 255, 0.24)',
          borderRadius: '10px',
        }}
      >
        <div className="font-monospace flex items-center justify-center gap-[20px] text-[50px]">
          Thank You <IoHeartSharp className="heartbeat text-warning" />
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="text-warning">For more information</div>
          <div>Github: https://github.com/Dynamic-Flakes/zealix</div>
        </div>
      </div>
    </>
  )
}
