"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
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
    const [events, setEvents] = useState([]);

    // Fetch events when the component mounts
    useEffect(() => {
        const fetchBookings = async () => {
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
                    setEvents(data.bookings);
                } else {
                    console.error("Failed to fetch bookings:", data.error);
                }
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        fetchBookings();
    }, []);

    const updateEvents = (updatedEvent) => {
        // Update events state when a booking is confirmed or declined
        const updatedEvents = events.map((event) =>
            event._id === updatedEvent._id ? updatedEvent : event
        );
        setEvents(updatedEvents);
    };

    const tabs = [
        { name: "Dashboard", content: <Dashboard events={events} /> },
        { name: "Bookings", content: <BookingsTab events={events} updateEvents={updateEvents} searchTerm={searchTerm} filterStatus={filterStatus} /> },
        { name: "Accepted Bookings", content: <AcceptedBookingsTab events={events} searchTerm={searchTerm} /> },
        { name: "Users", content: <UsersTab searchTerm={searchTerm} /> },
        { name: "Venues", content: <VenuesTab /> },
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
            <div className="bg-black p-5 pt-0 flex flex-wrap gap-2 justify-center">
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
                {(activeTab === 1 || activeTab === 2 || activeTab === 3) && renderSearchAndFilter()}

                {tabs[activeTab].content}
            </div>
        </div>
    );
}
