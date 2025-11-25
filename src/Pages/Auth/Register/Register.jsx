import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { registerUser, updateUser } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()

    const handleRegister = (data) => {
        console.log(data);

        const profileImg = data.photo[0]

        registerUser(data.email, data.password)
            .then(result => {
                console.log(result.user);
                // store the image in form data
                const formData = new FormData()
                formData.append('image', profileImg)
                // send the photo to store and get the url
                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`

                axios.post(image_API_URL, formData)
                    .then(res => {
                        const photoURL = res.data.data.url
                        // create user in the database
                        const userInfo = {
                            email: data.email,
                            displayName: data.name,
                            photoURL: photoURL
                        }
                        axiosSecure.post('/users', userInfo)
                        .then(res=>{
                            if(res.data.insertedId){
                                console.log('User created in the database.');
                                
                            }
                        })
                        // update user profile to firebase
                        const userProfile = {
                            displayName: data.name,
                            photoURL: photoURL
                        }
                        updateUser(userProfile)
                            .then(() => {
                                console.log('User profile updated');
                                navigate(location?.state || '/')

                            })
                            .catch(error => {
                                console.log(error.code);

                            })
                    })
            })
            .catch(error => {
                console.log(error);
            })

    }

    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleSubmit(handleRegister)}>
                <fieldset className="fieldset">
                    {/* Name */}
                    <label className="label">Name</label>
                    <input type="text" {...register('name', { required: true })} className="input" placeholder="Enter your name" />
                    {
                        errors.name?.type === 'required' && <p className='text-red-500'>Name is required.</p>
                    }
                    {/* Photo */}
                    <label className="label">Photo</label>
                    <input type='file' {...register('photo', { required: true })} className="file-input" placeholder="Enter your photo" />
                    {
                        errors.photo?.type === 'required' && <p className='text-red-500'>Photo is required.</p>
                    }
                    {/* Email */}
                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                    {
                        errors.email?.type === 'required' && <p className='text-red-500'>Email is required.</p>
                    }
                    {/* Password */}
                    <label className="label">Password</label>
                    <input type="password" {...register('password', { required: true, minLength: 6, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/ })} className="input" placeholder="Password" />
                    {
                        errors.password?.type === 'required' && <p className='text-red-500'>Password is required.</p>
                    }
                    {
                        errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 character or longer.</p>
                    }
                    {
                        errors.password?.type === 'pattern' && (
                            <p className='text-red-500'>
                                Password must contain an uppercase, lowercase, digit, and special character.
                            </p>
                        )
                    }
                    <button className="btn btn-neutral mt-4">Register</button>
                    <p>Already have an account? <Link state={location.state} to={'/login'}>Login</Link></p>
                </fieldset>
            </form>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;