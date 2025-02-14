import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../../components'

const MemberLayout = () => {
    return (
        <div className='flex bg-gray-50 h-screen'>
            <div className='w-1/4'>
                <Sidebar />
            </div>
            <div className='w-3/4 h-full'>
                <Outlet />
            </div>
        </div>
    )
}

export default MemberLayout