import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import SignInPage from '@/auth/sign-in'
import { UserButton, useUser } from '@clerk/clerk-react'
import Dashboard from '@/Dashboard'

function Header() {
  const {user,isSignedIn} =useUser();

  return (
    <div className='p-5 px-5 flex justify-between shadow-md'>
        <img src="/bitcodelogo.png" alt="" width={140} height={80} className='mx-3 hover:zoom-in-75' />

        {
          isSignedIn ?
          <div className='flex gap-4 items-center '>
            <Link to={'/Dashboard'}>
              <Button >Dashboard</Button>
            </Link>
            
            <UserButton/>
          </div>:
          <Link to="/auth/sign-in" >
            <Button>Get Started</Button>
        </Link>
        }

    
    </div>
  )
}

export default Header