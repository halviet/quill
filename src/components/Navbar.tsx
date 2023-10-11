import React from 'react';
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {
  getKindeServerSession,
  LoginLink,
  RegisterLink
} from "@kinde-oss/kinde-auth-nextjs/server";
import {ArrowRight} from "lucide-react";
import UserAccountNav from "@/components/UserAccountNav";

const Navbar = () => {
  const {getUser} = getKindeServerSession()
  const user = getUser()

  return (
      <nav className="sticky inset-x-0 top-0 z-30 h-14 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
        <MaxWidthWrapper>
          <div className="flex h-14 items-center justify-between border-b border-zinc-200">
            <Link href="/" className="z-40 flex font-semibold">
              <span>quill.</span>
            </Link>

            <div className="hidden items-center space-x-4 sm:flex">
              {!user
               ? <>
                 <Link className={buttonVariants({
                                                   variant: "ghost",
                                                   size: 'sm'
                                                 })}
                     href="/pricing">Pricing</Link>

                 <LoginLink className={buttonVariants({
                                                        variant: "ghost",
                                                        size: 'sm'
                                                      })}>Sign In</LoginLink>

                 <RegisterLink className={buttonVariants({
                                                           size: 'sm'
                                                         })}>
                   Get started <ArrowRight className="ml-1.5 h-5 w-5"/>
                 </RegisterLink>
               </>
               : <>
                 <Link className={buttonVariants({
                                                   variant: "ghost",
                                                   size: 'sm'
                                                 })}
                     href="/dashboard">Dashboard</Link>
                 <UserAccountNav
                     name={!user.given_name || !user.family_name
                           ? "Your account"
                           : `${user.given_name} ${user.family_name}`}
                     email={user.email ?? ''}
                     imageUrl={user.picture ?? ''}
                 />
               </>
              }
            </div>
          </div>
        </MaxWidthWrapper>
      </nav>
  );
};

export default Navbar;