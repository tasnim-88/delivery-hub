import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import SocialLogin from '../SocialLogin/SocialLogin';
import { Link, useLocation, useNavigate } from 'react-router';

const Login = () => {

    const { signInUser } = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const location = useLocation()
    const navigate = useNavigate()


    const handleLogin = (data) => {
        signInUser(data.email, data.password)
            .then(result => {
                console.log(result.user);
                navigate(location?.state || '/')
            })
            .catch(error => {
                console.log(error.code);
            })
    }

    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(handleLogin)} className="card-body">
                <fieldset className="fieldset">
                    {/* Email */}
                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                    {
                        errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>
                    }
                    {/* Password */}
                    <label className="label">Password</label>
                    <input type="password" {...register('password', { required: true, minLength: 6 })} className="input" placeholder="Password" />
                    {
                        errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
                    }
                    {
                        errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 character or longer</p>
                    }
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Login</button>
                    <p>Don't have any account? <Link state={location.state} to={'/register'}>Register</Link></p>
                </fieldset>
            </form>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Login;