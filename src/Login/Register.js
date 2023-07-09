import { Button } from 'flowbite-react';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider/AuthProvider';
import { toast } from 'react-hot-toast';

const Register = () => {
    const { createUser } = useContext(AuthContext)

    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    // const handleSignUp = data => {
    //     createUser(data.email, data.password)
    //         .then(result => {
    //             const user = result.user;
    //             navigate('/')
    //         })
    //         .then(error => console.error(error))
    // }

    const handleSignUp = data => {
        const userData = {
            name:data.name,
            email:data.email,
            password:data.password
        }
        fetch(`http://localhost:5000/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data) {
                    toast.success('User Add Successfully')
                }
            })
    }
    return (
        <div className='flex justify-center items-center dark:bg-gray-900 dark:text-white'>
            <div className='w-96 p-7'>
                <h2 className='text-xl text-center'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>


                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" {...register("name", { required: 'Name is required' })} className="dark:bg-gray-600 dark:text-white input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">E-mail</span>
                        </label>
                        <input type="email" {...register("email", { required: 'Email Address is required' })} className="dark:bg-gray-600 dark:text-white input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input type="password" {...register("password",
                            {
                                required: 'Password is required',
                                minLength: { value: 6, message: 'Password must be 6 caracter or longer' },
                                // pattern:{value: /(?=.*[a-z])(?=.*[A-Z])(?=.*[$@])/, message: 'Passwor should be strong'}
                            })
                        }
                            className="input input-bordered w-full max-w-xs dark:bg-gray-600 dark:text-white" />
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                    </div>

                    <Button type="submit" className='btn btn-accent w-full mt-5 hover:bg-emerald-500 p-2'>
                        Submit
                    </Button>
                </form>
                <p>Already have an account <Link className='text-green-400' to='/login'>Please Login</Link></p>
            </div>
        </div>
    );
};

export default Register;