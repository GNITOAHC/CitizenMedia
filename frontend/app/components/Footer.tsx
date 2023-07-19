import React from 'react'
import { FiFacebook, FiInstagram, FiHome } from 'react-icons/fi'
import Logo from '../../public/logo-blue.svg'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className="w-full h-full bg-[#133157] items-center sticky mb-0">
      <div className="h-7" />
      <div className="sm:flex flex-wrap">
        <div className="ml-20">
          <Image src={Logo} alt="here was a logo:(" />
        </div>
        <div className="mx-12 pl-5 w-1/3 text-white border-l-4 border-l-white">
          <p className="font-bold text-xl uppercase">about us</p>
          <div className="h-2" />
          <p className="text-sm text-ellipsis line-clamp-3">
            Lorem ipsum dolor sit amet consectetur. Morbi morbi at nisl sodales
            sit vitae orci felis. Commodo malesuada id est urna et.
          </p>
        </div>
        <div className="px-6 text-white justify-center">
          <div className="font-bold uppercase pb-1">about</div>
          <div className="w-16 h-2 border-t-2 border-r-white"></div>
          <div className="">
            <ul className="uppercase">
              <li className="mt-1">
                <a href="https://google.com">blog</a>
              </li>
              <li className="mt-1">
                <a href="https://google.com">status</a>
              </li>
              <li className="mt-1">
                <a href="https://google.com">career</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="px-6 text-white justify-center">
          <div className="font-bold uppercase pb-1">support</div>
          <div className="w-20 h-2 border-t-2 border-r-white"></div>
          <div>
            <ul className="uppercase">
              <li className="py-1">
                <a href="https://google.com">help</a>
              </li>
              <li className="py-1">
                <a href="https://google.com">privacy</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <a href="https://facebook.com">
          <FiFacebook className="text-white mx-1 my-1 w-5 h-5" />
        </a>
        <a href="https://instagram.com">
          <FiInstagram className="text-white mx-1 my-1 w-5 h-5" />
        </a>
        <Link href="/">
          <FiHome className="text-white mx-1 my-1 w-5 h-5" />
        </Link>
        <div className="w-5" />
      </div>
      <div className="h-5" />
    </div>
  )
}

export default Footer
