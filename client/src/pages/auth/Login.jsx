import { Form } from '@/components/ui/form'
import React, { useState } from 'react'
import { FormInput } from '../../components/forms'
import { useForm } from 'react-hook-form'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '@/components/ui/button';
import { FaFacebook } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { apiLogin, apiRegister } from '@/apis/auth';
import path from '@/utils/path';
import { useDispatch } from 'react-redux';
import { setEmail } from '@/store/auth/authSlice';
import Swal from 'sweetalert2';
import { login } from '@/store/user/userSlice';


const formSchemaSignUp = z.object({
    email: z.string().min(1, { message: 'This feilds must not is empty.' }),
    password: z.string().min(6, { message: 'Password must be at least six characters.' }),
    fullname: z.string().min(1, { message: 'This feilds must not is empty.' }),
    username: z.string().min(1, { message: 'This feilds must not is empty.' })
})
const formSchemaSignIn = z.object({
    email: z.string().min(1, { message: 'This feilds must not is empty.' }),
    password: z.string().min(6, { message: 'Password must be at least six characters.' }),
})
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [variant, setVariant] = useState('SIGNIN')
    const toggleVariant = () => {
        if (variant === 'SIGNIN') {
            setVariant('SIGNUP');
            formSignUp.reset();
        }
        else {
            setVariant('SIGNIN')
            formSignUp.reset();
        }
    }
    const formSignUp = useForm({
        resolver: zodResolver(variant === 'SIGNIN' ? formSchemaSignIn : formSchemaSignUp),
        defaultValues: {
            email: '',
            password: '',
            fullname: '',
            username: ''
        }
    })
    const onSubmit = async (data) => {
        if (variant === 'SIGNUP') {
            await dispatch(setEmail(data?.email));
            const response = await apiRegister(data);
            console.log(response)
            if (response?.success) {
                navigate(`${path.ACCOUNTS}/${path.CONFIRMOTP}`);
            } else {
                console.log('register was false')
            }
        } else {
            const response = await apiLogin(data)
            if (response?.success) {
                dispatch(login(response));
                Swal.fire({
                    title: 'Successfully',
                    text: 'Login was success',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(async (rs) => {
                    if (rs.isConfirmed) navigate(`/`);
                });
            }
        }
    };
    return (
        <div className='h-screen flex justify-center items-start pt-3'>
            <div className='w-[350px] flex items-center justify-start flex-col gap-3'>
                <div className='w-full border border-gray-400'>
                    <h1 className='text-3xl text-center py-5'>instagram</h1>
                    <div className='mx-5'>
                        <Form {...formSignUp} >
                            <form className='my-2 space-y-2'
                                onSubmit={formSignUp.handleSubmit(onSubmit)}>
                                <FormInput
                                    form={formSignUp}
                                    name='email'
                                    label='Email'
                                    placeholder='Enter your email...' />
                                {variant === 'SIGNUP' && <FormInput
                                    form={formSignUp}
                                    name='fullname'
                                    label='Full Name'
                                    placeholder='Enter your full name...' />}
                                {variant === 'SIGNUP' && <FormInput
                                    form={formSignUp}
                                    name='username'
                                    label='User Name'
                                    placeholder='Enter your user name...' />}
                                <FormInput
                                    form={formSignUp}
                                    name='password'
                                    label='Password'
                                    placeholder='Enter your password...'
                                    type='password' />
                                <Button type='submit' className='w-full top-3 relative'>{variant === 'SIGNUP' ? 'Sign Up' : 'Sign In'}</Button>
                            </form>
                        </Form>
                        <div className='flex flex-col items-center gap-3 pb-5'>
                            <p className='mt-5'>or</p>
                            <div className='flex items-center justify-center gap-1 cursor-pointer'>
                                <FaFacebook color='blue' size={18} />
                                <h2 className='text-[#385185] text-sm'>Sign In with Facebook</h2>
                            </div>
                            {variant === 'SIGNUP' ? '' : <p className='text-xs cursor-pointer'>Forgot Password?</p>}
                        </div>
                    </div>
                </div>
                <div className='w-full flex items-center justify-center border border-gray-400 py-3'>
                    <div className='flex items-center justify-center gap-1 my-4 text-sm'>
                        <p>{variant === 'SIGNUP' ? 'You already have an account' : 'You do not have an account yet?'}</p>
                        <p onClick={toggleVariant} className='cursor-pointer text-[#0095f6]'>{variant === 'SIGNUP' ? 'Sign In' : 'Sign Up'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login