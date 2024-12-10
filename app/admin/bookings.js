import Cookies from 'js-cookie';
import React, { useState, useEffect, useMemo } from 'react';

export default function BookingsTab({ searchTerm, filterStatus }) {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const adminAuthToken = Cookies.get("admin_auth_token");
                const response = await fetch('http://localhost:5000/admin/booking/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${adminAuthToken}`, // Adjust according to your auth setup
                    },
                });

                const data = await response.json();
                if (response.ok) {
                    setEvents(data.bookings);
                } else {
                    console.error('Failed to fetch bookings:', data.error);
                }
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, []);

    // Filtered and Searched Events
    const filteredEvents = useMemo(() => {
        return events.filter(event => {
            const matchesSearch =
                event.event_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.venue.name.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus =
                filterStatus === "all"
                    ? true
                    : filterStatus === event.status;

            return matchesSearch && matchesStatus;
        });
    }, [events, searchTerm, filterStatus]);

    const handleConfirm = (index) => {
        const updatedEvents = [...events];
        const eventToConfirm = filteredEvents[index];
        const originalIndex = events.findIndex(e => e === eventToConfirm);
        updatedEvents[originalIndex].status = "confirmed";
        setEvents(updatedEvents);
    };

    const handleDecline = (index) => {
        const updatedEvents = [...events];
        const eventToDecline = filteredEvents[index];
        const originalIndex = events.findIndex(e => e === eventToDecline);
        updatedEvents[originalIndex].status = "declined";
        setEvents(updatedEvents);
    };

    return (
        <>
            {filteredEvents.map((event, index) => (
                <div
                    key={index}
                    className="border mx-10 py-5 px-10 sm:flex justify-between rounded-md shadow-md bg-white mb-4"
                >
                    <div className="flex flex-col gap-2">
                        <h3 className="text-xl text-primary font-semibold">{event.venue.name}</h3>
                        <p><strong>Name :</strong> {event.event_name}</p>
                        <p><strong>Description :</strong> {event.event_desc}</p>
                        <p><strong>Start :</strong> {new Date(event.event_start).toLocaleString()}</p>
                        <p><strong>End :</strong> {new Date(event.event_end).toLocaleString()}</p>
                        <p><strong>People Count :</strong> {event.people_count}</p>
                        <p><strong>Status :</strong> {event.status}</p>
                    </div>

                    <div className="mt-5 flex sm:flex-col sm:my-auto gap-4">
                        {event.status === "confirmed" || event.status === "declined" ? (
                            <p className={`text-gray-500 font-semibold
                                ${event.status === "confirmed" ? "text-green-600" : "text-red-600"}`}>
                                {event.status === "confirmed" ? "Confirmed" : "Declined"}
                            </p>
                        ) : (
                            <>
                                <button
                                    onClick={() => handleConfirm(index)}
                                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                                >
                                    Confirm
                                </button>
                                <button
                                    onClick={() => handleDecline(index)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                >
                                    Decline
                                </button>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </>
    );
}
