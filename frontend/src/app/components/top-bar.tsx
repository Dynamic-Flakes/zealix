import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { FaBarsStaggered } from 'react-icons/fa6'

const TopBar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <div className=" py-4 text-white">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <div>
              <Image
                src="/images/zealix-logo-white.png"
                alt="Website Logo"
                width={140}
                height={140}
              />
            </div>
          </Link>
        </div>
        <div className="flex items-center">
          <div className="hidden space-x-4 md:flex">
            <Link href="/asylum">
              <div className="hover:text-gray-300">Asylum</div>
            </Link>
            <Link href="/profile">
              <div className="hover:text-gray-300">Profile</div>
            </Link>
            <Link href="/about">
              <div className="hover:text-gray-300">About</div>
            </Link>
          </div>
          <button className="ml-4 hidden rounded-md border border-white bg-transparent px-4 py-2 hover:bg-white hover:text-gray-800 md:block">
            Connect Wallet
          </button>

          <div className="md:hidden">
            <button className="text-xl" onClick={toggleMenu}>
              <FaBarsStaggered />
            </button>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div
          className="p-4 md:hidden"
          style={{
            background: 'rgba(255, 255, 255, 0.06)',
            boxShadow: ' 0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(5.7px)',
            border: '1px solid rgba(255, 255, 255, 0.24)',
          }}
        >
          <Link href="/asylum">
            <div className="block py-2">Asylum</div>
          </Link>
          <Link href="/profile">
            <div className="block py-2">Profile</div>
          </Link>
          <Link href="/about">
            <div className="block py-2">About</div>
          </Link>
        </div>
      )}
    </div>
  )
}

export default TopBar
