import { Metadata, Viewport } from 'next'
import Link from 'next/link'
import { PropsWithChildren } from 'react'

import { Analytics } from '@vercel/analytics/react'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { FaRegEnvelope } from 'react-icons/fa6'
import { PiYoutubeLogoDuotone } from 'react-icons/pi'

import { ToastConfig } from '@/app/toast-config'
import { TooltipProvider } from '@/components/ui/tooltip'
import { env } from '@/config/environment'
import { cn } from '@/utils/cn'

import './globals.css'
import ClientProviders from './providers'

export const viewport: Viewport = {
  themeColor: '#d6d3c7',
  // colorScheme: 'dark',
}

export const metadata: Metadata = {
  title: 'Zealix',
  description: 'The Silo of Hope',
  metadataBase: new URL(env.url),
  robots: env.isProduction ? 'all' : 'noindex,nofollow',
  openGraph: {
    type: 'website',
    locale: 'en',
    url: env.url,
    siteName: 'Zealix',
    images: [
      {
        url: '/images/inkathon-og-banner.jpg',
        width: 1280,
        height: 640,
      },
    ],
  },
  twitter: {
    site: '@scio_xyz',
    creator: '@scio_xyz',
    card: 'summary_large_image',
  },
}

const borderColor = {
  borderColor: '#65716f',
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={cn('zealix', GeistSans.variable, GeistMono.variable)}>
      <body>
        <ClientProviders>
          <TooltipProvider>
            <div className="relative flex flex-col md:flex-row md:justify-between">
              <div className="hidden flex-grow items-end lg:flex">
                <div
                  className="
                  flex 
                  h-[200px] 
                  w-full 
                  items-center
                  justify-center 
                  border-t-2"
                  style={borderColor}
                >
                  <Link href="/">
                    <PiYoutubeLogoDuotone style={{ color: '#65716f', fontSize: '54px' }} />
                  </Link>
                </div>
              </div>

              <div
                className="mx-auto h-screen w-[100vw] max-w-screen-lg overflow-y-auto border-b-0 border-t-0 lg:w-2/3 lg:border-l-2 lg:border-r-2"
                style={borderColor}
              >
                <div className="h-full px-4 py-8">{children}</div>
              </div>

              <div className="hidden flex-grow items-end lg:flex">
                <div
                  className="
                  flex h-[200px] 
                  w-full 
                  items-center 
                  justify-center 
                  border-t-2"
                  style={borderColor}
                >
                  <Link href="/">
                    <FaRegEnvelope style={{ color: '#65716f', fontSize: '42px' }} />
                  </Link>
                </div>
              </div>
            </div>
          </TooltipProvider>
          <ToastConfig />
        </ClientProviders>

        {!!env.isProduction && <Analytics />}
      </body>
    </html>
  )
}
