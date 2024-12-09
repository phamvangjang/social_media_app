import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

const Account = () => {
  return (
    <div className='container border-red-500 border mx-auto h-full'>
      <Outlet />
    </div>
  )
}

export default Account