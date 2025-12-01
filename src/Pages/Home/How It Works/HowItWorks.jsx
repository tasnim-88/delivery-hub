import React from 'react';
import bookingIcon from '../../../assets/bookingIcon.png'
const HowItWorks = () => {
    const howItWorks = [
        {
            imgIcon: bookingIcon,
            title: 'Booking Pick & Drop',
            description: 'From personal packages to business shipments — we deliver on time, every time.'
        },
        {
            imgIcon: bookingIcon,
            title: 'Cash On Delivery',
            description: 'From personal packages to business shipments — we deliver on time, every time.'
        },
        {
            imgIcon: bookingIcon,
            title: 'Delivery Hub',
            description: 'From personal packages to business shipments — we deliver on time, every time.'
        },
        {
            imgIcon: bookingIcon,
            title: 'Booking SME & Corporate',
            description: 'From personal packages to business shipments — we deliver on time, every time.'
        },
    ]
    return (
        <div className='max-w-6xl mx-auto mt-24'>
            <h1 className='text-2xl font-bold'>How it works</h1>
            <div className='flex justify-center items-center gap-2 mt-5'>
                {
                    howItWorks.map((data,i) =>
                        <div key={i} className='border rounded-3xl p-3 space-y-3'>
                            <img src={data.imgIcon} alt="" />
                            <h1 className='font-bold'>{data.title}</h1>
                            <p className='text-gray-500'>{data.description}</p>
                        </div>
                    )
                }
            </div>

        </div>
    );
};

export default HowItWorks;