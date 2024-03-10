'use client'

import { useEffect } from 'react'

import { useInkathon } from '@scio-labs/use-inkathon'
import { toast } from 'react-hot-toast'

import { HomePageStats } from './components/home-page-stats'
import { HomePageTitle } from './components/home-page-title'
import TopBar from './components/top-bar'

export default function HomePage() {
  // Display `useInkathon` error messages (optional)
  const { error } = useInkathon()
  useEffect(() => {
    if (!error) return
    toast.error(error.message)
  }, [error])

  return (
    <>
      <TopBar />
      <HomePageTitle />
      <HomePageStats />
    </>
  )
}
