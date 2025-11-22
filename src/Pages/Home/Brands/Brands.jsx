import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import amazon from '../../../assets/brands/amazon.png'
import amazon_vector from '../../../assets/brands/amazon_vector.png'
import casio from '../../../assets/brands/casio.png'
import moonstar from '../../../assets/brands/moonstar.png'
import randstad from '../../../assets/brands/randstad.png'
import star from '../../../assets/brands/star.png'
import start_people from '../../../assets/brands/start_people.png'

const brands = [amazon, amazon_vector, casio, moonstar, randstad, star, start_people]

const Brands = () => {
    return (
        <div className='max-w-6xl mx-auto mt-24'>
            <h1 className='text-center font-bold text-xl'>We've helped thousands of sales teams</h1>
            <Swiper
                className='mt-10'
                loop={true}
                slidesPerView={4}
                centeredSlides={true}
                spaceBetween={30}
                grabCursor={true}
                modules={[Autoplay]}
                autoplay={{
                    delay: 1000,
                    disableOnInteraction: false
                }}
            >
                {
                    brands.map((logo, index) =>
                    (
                        <SwiperSlide key={index}>
                            <img src={logo} alt="" />
                        </SwiperSlide>
                    ))
                }


            </Swiper>
        </div>
    );
};

export default Brands;