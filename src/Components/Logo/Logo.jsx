import React from 'react';
import logo from '../../assets/logo.png'
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to={'/'} className='flex items-end'>
            <img src={logo} alt="" />
            <h1 className='text-2xl font-bold -ms-3.5'>ZapShift</h1>
        </Link>
    );
};

export default Logo;