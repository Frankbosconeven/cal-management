import React from 'react'
import Link from "next/link"
import {signOut, useSession} from "next-auth/react"
import {BiUserCircle} from "react-icons/bi"

const Nav = () => {
    const {data:session} = useSession()
    
  return (
    <div>
        <nav className="relative w-full flex items-center justify-between py-4 bg-gray-100 text-gray-500 
            hover:text-gray-700 focus:text-gray-700 navbar navbar-expand-lg shadow-lg navbar-light ">
                <div className="m-5 flex space-x-4">
                    <BiUserCircle class="w-8 h-8" />
                    {/* <input type="file"  
                        class="shadow rounded-full max-w-5 h-10 align-middle border-none"/> */}
                    {/* class="shadow rounded-full max-w-5 h-10 align-middle border-none" */}
                    <h1 >{session?.user && <span>{session?.user.name}</span>}</h1>
                </div>
                <ul>
                    <li className="mr-2">
                        <Link href="/login">
                        <button onClick={() => signOut({callbackUrl: "/login"})}>Sign out</button>
                        {/* <a onClick={(e) => {
                            e.preventDefault();
                         signOut()}}
                       
                        ></a> */}
                        
                        </Link>
                    </li>
                </ul>
        </nav>
    </div>
  )
}

export default Nav