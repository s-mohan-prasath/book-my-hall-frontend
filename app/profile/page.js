'use client';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

// Booking Card Component
const BookingCard = ({ booking }) => {
    const formatDate = (dateString) => {
        if (!dateString) {
            return 'No Date Available';
        }

        const parsedDate = new Date(dateString);

        if (parsedDate instanceof Date && !isNaN(parsedDate.getTime())) {
            const day = String(parsedDate.getDate()).padStart(2, '0');
            const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
            const year = parsedDate.getFullYear();

            return `${day}/${month}/${year}`;
        }

        return 'Invalid Date';
    };

    const formattedDate = formatDate(booking.event_start);

    return (
        <div className="p-4 border w-72 rounded-lg shadow-md bg-white group transition-all duration-300 hover:shadow-2xl">
            <h1 className="font-semibold text-primary text-lg mb-2">
                <strong>Venue: </strong>
                {booking.venue?.name || 'Venue Name Not Available'}
            </h1>
            <p className="text-sm mb-1">
                <strong>Place:</strong> {booking.venue?.address || 'N/A'}
            </p>
            <p className="text-sm mb-1">
                <strong>Date:</strong> {formattedDate}
            </p>
            <p className="text-sm">
                <strong>Seating Capacity:</strong> {booking.venue?.seating_capacity || 'N/A'}
            </p>
        </div>
    );
};

// Main Profile Page Component
const ProfilePage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const bookingsApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/booking/user`;

    const fetchBookings = async () => {
        const authToken = Cookies.get('auth_token');
        if (!authToken) throw new Error('Authentication token is missing.');

        const response = await fetch(bookingsApiUrl, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) throw new Error(`Failed to fetch bookings: ${response.statusText}`);
        const data = await response.json();
        return data.bookings || [];
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const userBookings = await fetchBookings();
                setBookings(userBookings);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <p className="text-lg font-medium">Loading your bookings...</p>
                    <div className="loader mt-4"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                    <strong className="font-bold">Error:</strong>{' '}
                    <span className="block sm:inline">{error}</span>
                </div>
            </div>
        );
    }

    return (
        <main className="container mx-auto px-4 py-6">
            <h1 className="text-3xl text-primary font-bold text-center mb-6">Your Bookings</h1>
            <section>
                {bookings.length > 0 ? (
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        maxWidth: "100%",
                        gap: "2rem",
                        flexWrap: "wrap"
                    }}
                    >
                        {bookings.map((booking) => (
                            <BookingCard key={booking._id} booking={booking} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No bookings found.</p>
                )}
            </section>
        </main>
    );
};

export default ProfilePage;
