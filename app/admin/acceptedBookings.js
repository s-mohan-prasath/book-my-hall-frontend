import React, { useMemo } from "react";

export default function AcceptedBookingsTab({ events, searchTerm }) {
    // Filter accepted events and apply the search term
    const filteredEvents = useMemo(() => {
        return events.filter(
            (event) =>
                event.status === "accepted" && // Match "accepted" status
                (
                    event.event_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    event.venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    event.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    event.phone_number.includes(searchTerm)
                )
        );
    }, [events, searchTerm]);

    return (
        <div className="overflow-x-auto mt-5">
            <table className="min-w-full border-collapse table-auto">
                <thead>
                    <tr className="bg-primary text-white">
                        <th className="py-2 px-4 border text-left">Venue</th>
                        <th className="py-2 px-4 border text-left">Event Name</th>
                        <th className="py-2 px-4 border text-left">Start</th>
                        <th className="py-2 px-4 border text-left">End</th>
                        <th className="py-2 px-4 border text-left">People Count</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEvents.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="text-center py-4">No accepted bookings found.</td>
                        </tr>
                    ) : (
                        filteredEvents.map((event, index) => (
                            <tr key={event._id} className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`}>
                                <td className="py-2 px-4">{event.venue?.name}</td>
                                <td className="py-2 px-4">{event.event_name}</td>
                                <td className="py-2 px-4">{new Date(event.event_start).toLocaleString()}</td>
                                <td className="py-2 px-4">{new Date(event.event_end).toLocaleString()}</td>
                                <td className="py-2 px-4">{event.people_count}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

