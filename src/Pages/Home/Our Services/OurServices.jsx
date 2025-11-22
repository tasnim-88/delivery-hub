import React from 'react';
import serviceIcon from '../../../assets/service.png'

const OurServices = () => {
    const services = [
        {
            imgIcon: serviceIcon,
            title: 'Express  & Standard Delivery',
            description: 'We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi.Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.'
        },
        {
            imgIcon: serviceIcon,
            title: 'Nationwide Delivery',
            description: 'We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.'
        },
        {
            imgIcon: serviceIcon,
            title: 'Fulfillment Solution',
            description: 'We also offer customized service with inventory management support, online order processing, packaging, and after sales support.'
        },
        {
            imgIcon: serviceIcon,
            title: 'Cash on Home Delivery',
            description: '100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.'
        },
        {
            imgIcon: serviceIcon,
            title: 'Corporate Service / Contract In Logistics',
            description: 'Customized corporate services which includes warehouse and inventory management support.'
        },
        {
            imgIcon: serviceIcon,
            title: 'Parcel Return',
            description: 'Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.'
        },
    ]
    return (
        <div className='mt-24 bg-[#03373D] p-10 rounded-4xl space-y-3.5'>
            <h1 className='text-2xl font-bold text-center text-white'>Our Services</h1>
            <p className='text-gray-400 text-center'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to <br /> business shipments — we deliver on time, every time.</p>

            <div className='grid grid-cols-3 gap-3'>
                {
                    services.map(data =>
                        <div className='border rounded-3xl p-5 space-y-3 bg-white text-center'>
                            <div className='flex justify-center'><img className='glass rounded-full p-3' src={data.imgIcon} alt="" /></div>
                            <h1 className='font-bold'>{data.title}</h1>
                            <p className='text-gray-500'>{data.description}</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default OurServices;