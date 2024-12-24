import React from 'react'
import { ClipLoader } from 'react-spinners'

const Model = () => {
    return (
        <div className='absolute inset-0 w-full h-full bg-overlay z-[1000] flex items-center justify-center'>
            <ClipLoader size={100} color='#07b8ee' />
        </div>
    )
}

export default Model
