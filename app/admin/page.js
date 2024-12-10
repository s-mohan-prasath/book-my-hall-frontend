"use client";
import React, { useState } from "react";
import AddVenueModal from './addVenues.js';
import Dashboard from './dashboard.js';
import BookingsTab from './bookings.js';
import AcceptedBookingsTab from './acceptedBookings.js';
import UsersTab from './users.js';
import VenuesTab from './venues.js'; // Import the new VenuesTab component

export default function Admin() {
    const [activeTab, setActiveTab] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("pending");

    const eventsData = [
        { name: "Jane Smith", hall: "Conference Room", email: "example2@example.com", eventName: "Tech Conference", phoneNumber: "234-567-8901" },
        { name: "Mike Johnson", hall: "Banquet Hall", email: "example3@example.com", eventName: "Birthday Party", phoneNumber: "345-678-9012" },
        { name: "Alice Williams", hall: "Ballroom", email: "alice@example.com", eventName: "Gala Dinner", phoneNumber: "456-789-0123" },
        { name: "Emily Davis", hall: "Meeting Room A", email: "emily@example.com", eventName: "Business Workshop", phoneNumber: "678-901-2345" },
        { name: "Chris Martin", hall: "Outdoor Pavilion", email: "chris@example.com", eventName: "Music Concert", phoneNumber: "789-012-3456" },
        { name: "Olivia Lee", hall: "Lounge Area", email: "olivia@example.com", eventName: "Networking Event", phoneNumber: "890-123-4567" },
        { name: "David Harris", hall: "Small Conference Room", email: "david@example.com", eventName: "Team Meeting", phoneNumber: "901-234-5678" },
        { name: "Sophia Wilson", hall: "Rooftop Terrace", email: "sophia@example.com", eventName: "Sunset Party", phoneNumber: "012-345-6789" }
    ];

    const [events, setEvents] = useState(eventsData.map(event => ({ ...event, status: null })));

    const tabs = [
        { name: "Dashboard", content: <Dashboard events={events} /> },
        { name: "Bookings", content: null },
        { name: "Accepted Bookings", content: null },
        { name: "Users", content: null },
        { name: "Venues", content: null },
    ];

    const renderSearchAndFilter = () => (
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 px-10">
            <input
                type="text"
                placeholder="Search events or users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-2/5 p-2 border border-black rounded-md mb-2 md:mb-0 "
            />
            {(activeTab === 1) && (
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full md:w-1/5 p-2 border rounded-md border-black"
                >
                    <option value="pending">Pending</option>
                    <option value="all">All Events</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="declined">Declined</option>
                </select>
            )}
        </div>
    );

    return (
        <div className="m-0 p-0 w-full">
            <div className="bg-black p-5 flex flex-wrap gap-2 justify-center">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setActiveTab(index);
                            setSearchTerm("");
                            setFilterStatus("pending");
                        }}
                        className={`bg-black rounded px-3 py-2 duration-300 text-white text-sm md:text-xl
                            ${activeTab === index ? 'bg-primary' : 'bg-black border border-primary'}`}
                    >
                        {tab.name}
                    </button>
                ))}
            </div>

            <div className="mt-10 p-5 md:w-full mx-auto rounded">
                {/* Add search functionality for Bookings and Users */}
                {(activeTab === 1 || activeTab === 2 || activeTab === 3) && renderSearchAndFilter()}

                {activeTab === 0 ? (
                    tabs[activeTab].content
                ) : activeTab === 1 ? (
                    <BookingsTab
                        searchTerm={searchTerm}
                        filterStatus={filterStatus}
                    />
                ) : activeTab === 2 ? (
                    <AcceptedBookingsTab
                        events={events}
                        searchTerm={searchTerm}
                    />
                ) : activeTab === 3 ? (
                    <UsersTab
                        searchTerm={searchTerm}
                    // usersData={eventsData}
                    />
                ) : activeTab === 4 ? (
                    <VenuesTab /> // Replace previous venues rendering with VenuesTab component
                ) : (
                    <p>{tabs[activeTab].content}</p>
                )}
            </div>
        </div>
    );
}
