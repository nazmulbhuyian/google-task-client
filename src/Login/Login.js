import { Button } from 'flowbite-react';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider/AuthProvider';
import Google from './Google';

const Login = () => {
    const { signIn } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();
    const location = useLocation()
    // const from = location.state?.from?.pathname || '/';

    const handleSignIn = (data) => {
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                // navigate(from, {replace: true})
                navigate('/')
            })
            .then(err => console.error(err));
    }
    return (
        <div className='flex justify-center items-center dark:bg-gray-900 dark:text-white'>
            <div className='w-96 p-7'>
                <h2 className='text-xl text-center'>Login</h2>
                <form onSubmit={handleSubmit(handleSignIn)}>


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

                    {/* {
                        signUpError && <p className='text-red-600'>{signUpError}</p>
                    } */}
                </form>
                <p>New to Google Tasks <Link className='text-red-400' to='/register'>Please Sign Up</Link></p>
                <div className="text-center">OR</div>
                <Google></Google>
            </div>
        </div>
    );
};

export default Login;