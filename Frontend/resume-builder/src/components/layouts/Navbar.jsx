import React from 'react'
import ProfileInfoCard from '../Cards/ProfileInfoCard'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    
    <div className='h-16 bg-white border border-b border-gray-200/50 backdrop-blur-{2px} px-4 md:px-8 lg:px-16 py-2.5 sticky top-0 z-30'>
        <div className='container mx-auto flex items-center justify-between gap-5'>
        <Link to='/'>
        <h2 className='text-lg md:text-xl font-medium text-black leading-5'> 
            Resume Builder
        </h2>
        </Link>

        <ProfileInfoCard/>
        </div>
    </div>
  )
}

export default Navbar