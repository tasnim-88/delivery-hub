import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';

const SendParcel = () => {
    const { register, handleSubmit, control } = useForm()

    const { user } = useAuth()

    const axiosSecure = useAxiosSecure()

    const serviceCenters = useLoaderData()
    const regionsDuplicate = serviceCenters.map(c => c.region)
    const regions = [...new Set(regionsDuplicate)]

    // Explore useMemo, useCallback
    // const senderRegion = watch('senderRegion')
    const senderRegion = useWatch({ control, name: 'senderRegion' })
    const receiverRegion = useWatch({ control, name: 'receiverRegion' })

    const districtByRegion = (region) => {
        const regionDistricts = serviceCenters.filter(c => c.region === region)
        const districts = regionDistricts.map(d => d.district)
        return districts
    }

    const handleSendParcel = (data) => {
        console.log(data);
        const isDocument = data.parcelType === 'document'
        const isSameDistrict = data.senderDistrict === data.receiverDistrict
        const parcelWeight = parseFloat(data.parcelWeight)

        let cost = 0
        if (isDocument) {
            cost = isSameDistrict ? 60 : 80
        }
        else {
            if (parcelWeight < 3) {
                cost = isSameDistrict ? 110 : 150
            }
            else {
                const minCharge = isSameDistrict ? 110 : 150
                const extraWeight = parcelWeight - 3
                const extraCharge = isSameDistrict ? extraWeight * 40 : extraWeight * 40 + 40

                cost = minCharge + extraCharge
            }
        }
        console.log('cost', cost);
        Swal.fire({
            title: "Agree with the cost?",
            text: `You will be charged ${cost} taka.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "I agree."
        }).then((result) => {
            if (result.isConfirmed) {

                // Save the parcel info to the database
                axiosSecure.post('/parcels', data)
                    .then(res => {
                        console.log('After saving parcel', res.data);

                    })

                // Swal.fire({
                //     title: "Deleted!",
                //     text: "Your file has been deleted.",
                //     icon: "success"
                // });
            }
        });

    }
    return (
        <div>
            <h1 className='text-3xl font-bold'>Send a Parcel</h1>
            <form className='mt-10 p-4' onSubmit={handleSubmit(handleSendParcel)}>
                {/* Parcel Type */}
                <div>
                    <label className='label mr-4'>
                        <input type="radio" value='document' {...register('parcelType')} className="radio" defaultChecked />
                        Document
                    </label>
                    <label className='label'>
                        <input type="radio" value='non-document' {...register('parcelType')} className="radio" />
                        Non-Document
                    </label>
                </div>

                {/* Parcel info */}
                <div className='grid grid-cols-2 gap-5'>
                    <fieldset className="fieldset">
                        <label className="label">Parcel Name</label>
                        <input type="text" {...register('parcelName')} className="input w-full" placeholder="Enter parcel  name" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <label className="label">Parcel Weight(kg)</label>
                        <input type="number" {...register('parcelWeight')} className="input w-full" placeholder="Enter parcel  weight" />
                    </fieldset>
                </div>
                {/* Two columns */}
                <div className='grid grid-cols-2 gap-5'>
                    {/* Sender Details */}
                    <fieldset className="fieldset">
                        <h2 className='text-xl'>Sender Details</h2>
                        <label className="label">Sender Name</label>
                        <input type="text" {...register('senderName')} defaultValue={user?.displayName} className="input w-full" placeholder="Enter  name" />
                        <label className="label">Sender Email</label>
                        <input type="email" {...register('senderEmail')} defaultValue={user?.email} className="input w-full" placeholder="Enter email" />

                        {/* Sender Region */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Sender Region</legend>
                            <select {...register('senderRegion')} defaultValue="Pick a region" className="select">
                                <option disabled={true}>Pick a region</option>
                                {
                                    regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                }

                            </select>

                        </fieldset>

                        {/* Sender District */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Sender Districts</legend>
                            <select {...register('senderDistrict')} defaultValue="Pick a District" className="select">
                                <option disabled={true}>Pick a District</option>
                                {
                                    districtByRegion(senderRegion)?.map((d, i) => <option key={i} value={d}>{d}</option>)
                                }

                            </select>

                        </fieldset>

                        <label className="label">Sender Address</label>
                        <input type="text" {...register('senderAddress')} className="input w-full" placeholder="Enter Address" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <h2 className='text-xl'>Receiver Details</h2>
                        <label className="label">Receiver Name</label>
                        <input type="text" {...register('receiverName')} className="input w-full" placeholder="Enter name" />
                        <label className="label">Sender Email</label>
                        <input type="email" {...register('senderEmail')} className="input w-full" placeholder="Enter email" />

                        {/* Receiver Region */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Receiver Region</legend>
                            <select {...register('receiverRegion')} defaultValue="Pick a region" className="select">
                                <option disabled={true}>Pick a region</option>
                                {
                                    regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                }

                            </select>

                        </fieldset>

                        {/* Receiver District */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Receiver Districts</legend>
                            <select {...register('receiverDistrict')} defaultValue="Pick a District" className="select">
                                <option disabled={true}>Pick a District</option>
                                {
                                    districtByRegion(receiverRegion)?.map((d, i) => <option key={i} value={d}>{d}</option>)
                                }

                            </select>

                        </fieldset>

                        <label className="label">Receiver Adderss</label>
                        <input type="text" {...register('receiverAddress')} className="input w-full" placeholder="Enter address" />

                    </fieldset>

                </div>
                <input type="submit" value="Send Parcel" className='btn' />
            </form>
        </div>
    );
};

export default SendParcel;