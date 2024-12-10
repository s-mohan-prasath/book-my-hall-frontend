import React, { useMemo } from 'react';

export default function AcceptedBookingsTab({ events, searchTerm }) {
    // Filter confirmed events and apply search
    const filteredEvents = useMemo(() => {
        return events.filter(event =>
            event.status === "confirmed" &&
            (event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.hall.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.phoneNumber.includes(searchTerm))
        );
    }, [events, searchTerm]);

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse table-auto">
                <thead>
                    <tr className="bg-primary text-white">
                        <th className="py-2 px-4 border text-left">Name</th>
                        <th className="py-2 px-4 border text-left">Event</th>
                        <th className="py-2 px-4 border text-left">Hall</th>
                        <th className="py-2 px-4 border text-left">Email</th>
                        <th className="py-2 px-4 border text-left">Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEvents.map((event, index) => (
                        <tr
                            key={index}
                            className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}
                        >
                            <td className="py-2 px-4">{event.name}</td>
                            <td className="py-2 px-4">{event.eventName}</td>
                            <td className="py-2 px-4">{event.hall}</td>
                            <td className="py-2 px-4">{event.email}</td>
                            <td className="py-2 px-4">{event.phoneNumber}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}