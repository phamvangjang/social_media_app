import { Button } from '@/components/ui/button';
import { FormInput } from '../../components/forms';
import { Form } from '@/components/ui/form';
import path from '@/utils/path';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { useDispatch, useSelector } from 'react-redux';
import { apiFinalRegister } from '@/apis/auth';
import { resetEmail } from '@/store/auth/authSlice';
import Swal from 'sweetalert2';

const formSchemaOTP = z.object({
    otp: z.string().min(6, { message: 'One time password must be at least six characters.' }),
})
const ConfirmOTP = () => {
    const dispatch = useDispatch()
    const email = useSelector((state) => state.auth.email)
    const formOTP = useForm({
        resolver: zodResolver(formSchemaOTP),
        defaultValues: {
            otp: '',
        }
    })
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        const response = await apiFinalRegister({ ...data, email })
        console.log(response);
        if (response?.success) {
            await dispatch(resetEmail());
            Swal.fire({
                title: 'Congratulations',
                text: response?.mes,
                icon: 'success',
                confirmButtonText: 'Go to login page'
            }).then(async (rs) => {
                if (rs.isConfirmed) navigate(`${path.ACCOUNTS}/${path.LOGIN}`);
            });
        } else {
            Swal.fire({
                title: 'Oops!!!',
                text: response?.mes,
                icon: 'error',
                confirmButtonText: 'Go on'
            }).then(async (rs) => {
                if (rs.isConfirmed) navigate(`${path.ACCOUNTS}/${path.CONFIRMOTP}`);
            });
        }
    }
    return (
        <div className='h-screen flex justify-center items-start pt-3'>
            <div className='w-[350px] flex items-center justify-start flex-col gap-3'>
                <div className='w-full border border-gray-400'>
                    <h1 className='text-3xl text-center py-5'>Confirm OTP code</h1>
                    <div className='mx-5'>
                        <Form {...formOTP}>
                            <form className='my-2 space-y-2'
                                onSubmit={formOTP.handleSubmit(onSubmit)}>
                                <FormInput
                                    form={formOTP}
                                    name='otp'
                                    label='OTP Code'
                                    placeholder='Enter your OTP code...' />
                                <Button type='submit' className='w-full top-3 relative'>Confirm</Button>
                            </form>
                        </Form>
                        <div className='flex flex-col items-center gap-3 pb-5'>
                            <p
                                onClick={() => navigate(`${path.ACCOUNTS}/${path.LOGIN}`)}
                                className='mt-5 hover:underline cursor-pointer text-[#0095f6]'>Go back</p>
                        </div>
                    </div>
                </div>
                <div className='w-full flex items-center justify-center border border-gray-400 py-3'>
                    <div className='flex items-center justify-center gap-1 my-4 text-sm'>
                        <p>You do not have an account yet?</p>
                        <p
                            onClick={() => navigate(`${path.ACCOUNTS}/${path.LOGIN}`)}
                            className='cursor-pointer hover:underline text-[#0095f6]'>Sign In</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmOTP