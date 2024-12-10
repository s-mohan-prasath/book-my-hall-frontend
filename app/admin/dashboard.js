import React from 'react';

export default function Dashboard({ events }) {
    const totalEvents = events.length;
    const confirmedEvents = events.filter(event => event.status === "confirmed").length;
    const pendingEvents = events.filter(event => !event.status).length;
    const declinedEvents = events.filter(event => event.status === "declined").length;

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
            <div className="border bg-white rounded-lg shadow-md p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Total Events</h3>
                <div className="text-3xl font-bold text-primary">{totalEvents}</div>
            </div>
            <div className="border bg-white rounded-lg shadow-md p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Confirmed Events</h3>
                <div className="text-3xl font-bold text-green-600">{confirmedEvents}</div>
            </div>
            <div className="border bg-white rounded-lg shadow-md p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Pending Events</h3>
                <div className="text-3xl font-bold text-yellow-600">{pendingEvents}</div>
            </div>
            <div className="border bg-white rounded-lg shadow-md p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Declined Events</h3>
                <div className="text-3xl font-bold text-red-600">{declinedEvents}</div>
            </div>
        </div>
    );
}