import Cookies from "js-cookie";
import React, { useState, useEffect, useMemo } from "react";

export default function BookingsTab({ events, updateEvents, searchTerm, filterStatus }) {
    const [loading, setLoading] = useState(false);

    // Fetch bookings when the component mounts (if not already passed as props)
    useEffect(() => {
        if (events.length === 0) {
            const fetchBookings = async () => {
                setLoading(true);
                try {
                    const adminAuthToken = Cookies.get("admin_auth_token");
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/booking/`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${adminAuthToken}`,
                        },
                    });

                    const data = await response.json();
                    if (response.ok) {
                        updateEvents(data.bookings); // Update events if not already set
                    } else {
                        console.error("Failed to fetch bookings:", data.error);
                    }
                } catch (error) {
                    console.error("Error fetching bookings:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchBookings();
        }
    }, [events.length, updateEvents]);

    // Update booking status in the backend
    const updateBookingStatus = async (id, newStatus) => {
        try {
            const adminAuthToken = Cookies.get("admin_auth_token");
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/booking/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${adminAuthToken}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });

            const data = await response.json();
            if (response.ok) {
                return true;
            } else {
                console.error("Failed to update booking:", data.error);
                return false;
            }
        } catch (error) {
            console.error("Error updating booking:", error);
            return false;
        }
    };

    // Filter events based on search term and status
    const filteredEvents = useMemo(() => {
        return events.filter((event) => {
            const matchesSearch =
                event.event_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.venue.name.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus =
                filterStatus === "all" ? true : filterStatus === event.status;
            console.log(event);
            return matchesSearch && matchesStatus;
        });
    }, [events, searchTerm, filterStatus]);

    // Confirm booking (set status to "accepted")
    const handleConfirm = async (index) => {
        const eventToConfirm = filteredEvents[index];
        const updated = await updateBookingStatus(eventToConfirm._id, "accepted");

        if (updated) {
            const updatedEvent = { ...eventToConfirm, status: "accepted" };
            updateEvents(updatedEvent); // Update the parent component with the confirmed event
        }
    };

    // Decline booking (set status to "declined")
    const handleDecline = async (index) => {
        const eventToDecline = filteredEvents[index];
        const updated = await updateBookingStatus(eventToDecline._id, "declined");

        if (updated) {
            const updatedEvent = { ...eventToDecline, status: "declined" };
            updateEvents(updatedEvent); // Update the parent component with the declined event
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {filteredEvents.map((event, index) => (
                <div
                    key={event._id}
                    className="border mx-10 py-5 px-10 sm:flex justify-between rounded-md shadow-md bg-white mb-4"
                >
                    <div className="flex flex-col gap-2">
                        <h1 className="text-xl text-primary font-semibold">
                            {event.venue?.name}
                        </h1>
                        <p>
                            <strong>Event Name :</strong> {event.event_name}
                        </p>
                        <p>
                            <strong>Description :</strong> {event.event_desc}
                        </p>
                        <p>
                            <strong>Start :</strong>{" "}
                            {new Date(event.event_start).toLocaleString()}
                        </p>
                        <p>
                            <strong>End :</strong>{" "}
                            {new Date(event.event_end).toLocaleString()}
                        </p>
                        <p>
                            <strong>People Count :</strong> {event.people_count}
                        </p>
                        <p>
                            <strong>Status :</strong> {event.status}
                        </p>
                    </div>

                    <div className="mt-5 flex sm:flex-col sm:my-auto gap-4">
                        {event.status === "accepted" || event.status === "declined" ? (
                            <p
                                className={`font-semibold ${event.status === "accepted"
                                    ? "text-green-600"
                                    : "text-red-600"
                                    }`}
                            >
                                {event.status === "accepted" ? "Accepted" : "Declined"}
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
