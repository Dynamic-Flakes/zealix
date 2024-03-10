'use client'

import { ChainInfo } from '@/components/web3/chain-info'
import { ConnectButton } from '@/components/web3/connect-button'
import { GreeterContractInteractions } from '@/components/web3/greeter-contract-interactions'

import TopBar from '../components/top-bar'

export default function Profile() {
  return (
    <>
      <TopBar />

      <div className="mt-12">
        {/* Connect Wallet Button */}
        <ConnectButton showBalance={true} />
      </div>

      <div className="mt-12 flex w-full flex-wrap items-start justify-center gap-4">
        {/* Chain Metadata Information */}
        <ChainInfo />

        {/* Greeter Read/Write Contract Interactions */}
        <GreeterContractInteractions />
      </div>
    </>
  )
}
