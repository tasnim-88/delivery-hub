import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../../Hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';

const SocialLogin = () => {

    const { googleLogin } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    const handleGoogle = () => {
        googleLogin()
            .then(result => {
                console.log(result.user);
                navigate(location?.state || '/')
            })
            .catch(error => {
                console.log(error.code);
            })
    }

    return (
        <div className='px-6'>
            <p className='text-center mb-2'>Or</p>
            <button onClick={handleGoogle} className="w-full mb-8 btn bg-white text-black border-[#e5e5e5]">
                <FcGoogle size={24} />
                Login with Google
            </button>
        </div>
    );
};

export default SocialLogin;