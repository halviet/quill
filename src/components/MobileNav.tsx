'use client'

import React, {useEffect, useState} from 'react';
import {ArrowRight, Menu} from "lucide-react";
import Link from "next/link";
import {usePathname} from "next/navigation";

const MobileNav = ({isAuth}: { isAuth: boolean }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const toggleOpen = () => setIsOpen((prevState) => !prevState)
  const pathname = usePathname()

  useEffect(() => {
    if (isOpen) toggleOpen()
  }, [pathname])

  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      toggleOpen()
    }
  }

  return (
      <div className="sm:hidden">
        <Menu
            onClick={toggleOpen}
            className="relative z-50 h-5 w-5 text-zinc-700"
        />

        {isOpen
         ? (
             <div className="fixed animate-in slide-in-from-top-5 fade-in-20 inset-0 z-0 w-full">
               <ul className="absolute bg-white border-b border-zinc-2000 shadow-xl grid w-full gap-3 px-10 pt-20 pb-8">
                 {!isAuth
                  ? (
                      <>
                        <li>
                          <Link
                              className="flex items-center w-full font-semibold text-green-600"
                              href="/sign-up"
                              onClick={() => closeOnCurrent('/sing-up')}
                          >
                            Get started
                            <ArrowRight className="ml-2 h-5 w-5"/>
                          </Link>
                        </li>
                        <li className="my-3 h-px w-full bg-gray-300"/>
                        <li>
                          <Link
                              className="flex items-center w-full font-semibold"
                              href="/sign-in"
                              onClick={() => closeOnCurrent('/sing-in')}
                          >
                            Sign in
                          </Link>
                        </li>
                        <li className="my-3 h-px w-full bg-gray-300"/>
                        <li>
                          <Link
                              className="flex items-center w-full font-semibold"
                              href="/pricing"
                              onClick={() => closeOnCurrent('/pricing')}
                          >
                            Pricing
                          </Link>
                        </li>
                      </>
                  )
                  : (
                      <>
                        <li>
                          <Link
                              className="flex items-center w-full font-semibold"
                              href="/dashboard"
                              onClick={() => closeOnCurrent('/dashboard')}
                          >
                            Dashboard
                          </Link>
                        </li>
                        <li className="my-3 h-px w-full bg-gray-300"/>
                        <li>
                          <Link
                              className="flex items-center w-full font-semibold"
                              href="/sign-out"
                          >
                            Sign Out
                          </Link>
                        </li>
                      </>
                  )
                 }
               </ul>
             </div>
         )
         : null
        }
      </div>
  );
};

export default MobileNav;