import React, { use } from 'react';
import reviewImg from '../../../assets/customer-top.png'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import ReviewCard from './ReviewCard';

const Reviews = ({ reviewsPromise }) => {
    const reviews = use(reviewsPromise)
    console.log(reviews);

    return (
        <div className='mt-24'>
            <div><img src={reviewImg} alt="" /></div>
            <h1>What our customers are sayings</h1>
            <p>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>

            <Swiper
                loop={true}
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={3}
                coverflowEffect={{
                    rotate: 30,
                    stretch: '50%',
                    depth: 200,
                    modifier: 1,
                    scale: 0.75,
                    slideShadows: true,
                }}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="mySwiper"
            >
                {
                    reviews.map(review =>
                        <SwiperSlide>
                            <ReviewCard key={review.id} review={review}></ReviewCard>
                        </SwiperSlide>
                    )
                }


            </Swiper>
        </div>
    );
};

export default Reviews;