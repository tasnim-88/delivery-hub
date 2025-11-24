import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { PuffLoader } from 'react-spinners';

const Payment = () => {

    const { parcelId } = useParams()
    const axiosSecure = useAxiosSecure()

    const { isLoading, data: parcel } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`)
            return res.data
        }
    })

    const handlePayment = async () => {
        const paymentInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName: parcel.parcelName
        }
        const res = await axiosSecure.post('/create-checkout-session', paymentInfo)
        console.log(res.data);
        window.location.href = res.data.url

    }

    if (isLoading) {
        return <PuffLoader size={24} />
    }

    return (
        <div>
            <h1>Please Pay for {parcel.parcelName} </h1>
            <button onClick={handlePayment} className='btn'>Pay</button>
        </div>
    );
};

export default Payment;