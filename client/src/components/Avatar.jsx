import { apiUpdateCurrent } from '@/apis';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'

const Avatar = () => {
    const { register, formState: { errors, isDirty }, handleSubmit, reset } = useForm()
    const current = useSelector((state) => state.user.current);
    const handleUpdateInfor = async (data) => {
        console.log(data)
        const formData = new FormData()
        if (data.avatar.length > 0) formData.append('avatar', data.avatar[0])
        delete data.avatar
        for (let i of Object.entries(data)) formData.append(i[0], i[1])
        const response = await apiUpdateCurrent(formData, current?._id)
        console.log(response)
    }
    return (
        <div>
            <form
                onSubmit={handleSubmit(handleUpdateInfor)}
                className='flex items-center justify-between'>
                <div className='flex items-center justify-start gap-2'>
                    <span>
                        <label htmlFor="file">
                            <img
                                className='h-10 w-10 rounded-full cursor-pointer'
                                alt={current?._id}
                                src={current?.avatar} />
                        </label>
                        <input type='file' id='file' hidden {...register('avatar')} />
                    </span>
                    <div className='flex flex-col gap-2 items-start justify-start'>
                        <span className='text-base font-semibold'>{current?.username}</span>
                        <span className='text-sm'>{`${current?.firstName} ${current?.lastName}`}</span>
                    </div>
                </div>
                <div>
                    <button
                        type='submit'
                        className='p-2 bg-blue-500 cursor-pointer text-white rounded-md'>Đổi ảnh</button>
                </div>
            </form>
        </div>
    )
}

export default Avatar