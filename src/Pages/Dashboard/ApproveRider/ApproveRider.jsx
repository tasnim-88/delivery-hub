import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaRegTrashAlt, FaUserCheck } from 'react-icons/fa';
import { IoPersonRemove } from "react-icons/io5";
import Swal from 'sweetalert2';


const ApproveRider = () => {
    const axiosSecure = useAxiosSecure()
    const { refetch, data: riders = [] } = useQuery({
        queryKey: ['riders', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders')
            return res.data
        }
    })

    const updateRiderStatus = (r, status) => {
        const updateInfo = { status: status, email: r.email }
        axiosSecure.patch(`/riders/${r._id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Rider status has been set to ${status}`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }

    const handleApproval = (r) => {
        updateRiderStatus(r, 'approved')
    }

    const handleRejection = (r) => {
        updateRiderStatus(r, 'rejected')
    }

    return (
        <div>
            <h2>Rider pending for approval: {riders.length}</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>District</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            riders.map((r, i) => <tr key={r._id}>
                                <th>{i + 1}</th>
                                <td>{r.name}</td>
                                <td>{r.email}</td>
                                <td>{r.district}</td>
                                <td>
                                    <p className={`${r.status === 'approved' ? 'badge badge-success' : 'badge badge-error'}`}>{r.status}</p>
                                </td>
                                <td>
                                    <button onClick={() => handleApproval(r)} className='btn'><FaUserCheck /></button>
                                    <button onClick={() => handleRejection(r)} className='btn mx-2'><IoPersonRemove /></button>
                                    <button className='btn'><FaRegTrashAlt /></button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApproveRider;