import React from 'react';
import laodingAnimation from '../../assets/animations/loading.json'
import Lottie from 'react-lottie';

const Loading = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: laodingAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    return (
        <div>
            <Lottie
                options={defaultOptions}
                height={400}
                width={400}
            />
        </div>
    );
};

export default Loading;