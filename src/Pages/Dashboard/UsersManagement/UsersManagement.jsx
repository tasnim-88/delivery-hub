import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaUserShield } from 'react-icons/fa';
import { BiSolidShieldMinus } from "react-icons/bi";
import Swal from 'sweetalert2';


const UsersManagement = () => {
    const axiosSecure = useAxiosSecure()
    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })

    const handleMakeAdmin = user => {
        const roleInfo = { role: 'admin' }
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.displayName} marked as an admin.`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }

    const handleRemoveAdmin = user => {
        const roleInfo = { role: 'user' }
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.displayName} removed as an admin`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }

    return (
        <div>
            <h1>Manage Users: {users.length}</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Admin Actions</th>
                            <th>Other Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u, i) => <tr key={u._id}>
                            <th>
                                {i + 1}
                            </th>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={u.photoURL}
                                                alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{u.displayName}</div>
                                        <div className="text-sm opacity-50">United States</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {u.email}
                            </td>
                            <td>{u.role}</td>
                            <th>
                                {u.role === 'admin' ?
                                    <button onClick={() => handleRemoveAdmin(u)} className='btn btn-xs bg-red-400'>
                                        <BiSolidShieldMinus size={18} />
                                    </button>
                                    :
                                    <button onClick={() => handleMakeAdmin(u)} className='btn btn-xs bg-green-400'>
                                        <FaUserShield size={18} />
                                    </button>
                                }
                            </th>
                            <th>
                                <button>x</button>
                            </th>
                        </tr>)}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersManagement;