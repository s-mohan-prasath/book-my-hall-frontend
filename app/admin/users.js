import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';

export default function UsersTab({ searchTerm }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const adminAuthToken = Cookies.get("admin_auth_token");
                // Replace with your actual backend API endpoint
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${adminAuthToken}`, // Assuming you store JWT in localStorage
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }

                const data = await response.json();
                setUsers(data.users);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Filter users based on search term
    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p>Loading users...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 text-center p-4">
                {error}
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-primary text-white">
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user, index) => (
                            <tr key={user._id || index} className="hover:bg-gray-100">
                                <td className="border p-2">{user.name}</td>
                                <td className="border p-2">{user.email}</td>
                                <td className="border p-2">{user.phoneNumber}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center p-4">
                                No users found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}