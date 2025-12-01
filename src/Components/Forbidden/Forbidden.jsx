import React from 'react';
import forbidden from '../../assets/animations/error.json'
import Lottie from 'react-lottie';

const Forbidden = () => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: forbidden,
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
            <h1>Forbidden</h1>
        </div>
    );
};

export default Forbidden;