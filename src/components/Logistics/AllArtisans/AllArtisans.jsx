import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function AllArtisans() {
    const [artisans, setArtisans] = useState([]);
    const backendurl = import.meta.env.VITE_URL;

    const fetchArtisans = useCallback(async () => {
        try {
            const res = await axios.get(`${backendurl}/logistics/artisan-detail`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('adminaccessToken')}`,
                },
            });
            console.log('current all Artisans =', res.data.data);
            setArtisans(res.data.data);
        } catch (error) {
            console.log('Error', error);
            toast.error(error.message);
        }
    }, [backendurl]);

    useEffect(() => {
        fetchArtisans();
    }, [fetchArtisans]);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">All Artisans</h1>
            <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead className="bg-three text-white">
                    <tr>
                        <th className="py-3 px-6 text-left font-semibold uppercase">SNO</th>
                        <th className="py-3 px-6 text-left font-semibold uppercase">Avatar</th>
                        <th className="py-3 px-6 text-left font-semibold uppercase">Name</th>
                        <th className="py-3 px-6 text-left font-semibold uppercase">DOB</th>
                        <th className="py-3 px-6 text-left font-semibold uppercase">Email</th>
                        <th className="py-3 px-6 text-left font-semibold uppercase">PhoneNo</th>
                    </tr>
                </thead>
                <tbody>
                    {artisans.map((artisan, index) => (
                        <tr key={artisan._id} className="border-b hover:bg-gray-100 transition-all cursor-pointer">
                            <td className="py-3 px-6 border">{index + 1}</td>
                            <td className="py-3 px-6 border"><img src={artisan.avatar} alt="" className="w-10 h-10 rounded-full" /></td>
                            <td className="py-3 px-6 border">{artisan.fullName}</td>
                            <td className="py-3 px-6 border">{artisan.DOB.slice(0, 10)}</td>
                            <td className="py-3 px-6 border">{artisan.email}</td>
                            <td className="py-3 px-6 border">{artisan.phoneNo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AllArtisans;
