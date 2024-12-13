'use client';
import React, { useState, useEffect } from 'react';
import AddVenueModal from './addVenues.js';
import Cookies from 'js-cookie';
import Image from 'next/image.js';

const VenuesTab = () => {
    const [venues, setVenues] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVenueForEdit, setSelectedVenueForEdit] = useState(null);

    const handleAddVenueSubmit = (newVenue) => {
        // Add the new venue to the list
        setVenues(prevVenues => [...prevVenues, newVenue]);
    };

    const handleUpdateVenueSubmit = (updatedVenue) => {
        // Update the venue in the list
        setVenues(prevVenues =>
            prevVenues.map(venue =>
                venue._id === updatedVenue._id ? updatedVenue : venue
            )
        );
    };

    const fetchVenues = async () => {
        try {
            const adminAuthToken = Cookies.get("admin_auth_token");

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/venue`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${adminAuthToken}`,
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                throw new Error('Error fetching venues');
            }

            const data = await response.json();
            const fetchedVenues = data.venues || [];

            setVenues(fetchedVenues);
        } catch (error) {
            console.error('Error fetching venues:', error);
            setVenues([]);
        }
    };

    useEffect(() => {
        fetchVenues();
    }, []);

    const handleDeleteVenue = async (venueId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this venue?');

        if (confirmDelete) {
            try {
                const adminAuthToken = Cookies.get("admin_auth_token");

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/venue/${venueId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${adminAuthToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Error deleting venue');
                }

                // Remove venue from the list
                const updatedVenues = venues.filter(venue => venue._id !== venueId);
                setVenues(updatedVenues);

                alert('Venue deleted successfully');
            } catch (error) {
                console.error('Error deleting venue:', error);
                alert(`Failed to delete venue: ${error.message}`);
            }
        }
    };

    const handleEditVenue = (venue) => {
        // Set the selected venue for editing and open the modal
        setSelectedVenueForEdit(venue);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        // Reset the selected venue and close the modal
        setSelectedVenueForEdit(null);
        setIsModalOpen(false);
    };

    return (
        <div className="text-center">
            <div className="flex justify-center gap-4 mb-6">
                <button
                    className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark duration-300"
                    onClick={() => {
                        setSelectedVenueForEdit(null);
                        setIsModalOpen(true);
                    }}
                >
                    Add Venues
                </button>
            </div>
            <div className="flex flex-col md:flex-row flex-wrap gap-16 justify-center p-10">
                {venues.map((venue) => (
                    <div
                        key={venue._id}
                        className="bg-white sm:w-[35%] lg:w-[20%] p-8 border-2 rounded-lg shadow-lg hover:shadow-xl transition-all"
                    >
                        <h3 className="text-2xl font-bold text-red-500 mb-4">{venue.name}</h3>

                        {venue.image ? (
                            <Image
                                src={`${process.env.NEXT_PUBLIC_API_URL}/get-image/${venue["image"]["images"]?.at(0)["url"]}`}
                                alt="Venue"
                                className="mb-4 w-full h-52 object-cover rounded-md"
                                width={500}
                                height={500} fetchPriority='low'
                                loading='lazy'
                            />
                        ) : (
                            <Image
                                src="images/img3.jpg"
                                alt="No Image Available"
                                className="mb-4 w-full h-32 object-cover rounded-md"
                                width={500}
                                height={500}
                            />
                        )}

                        <div className="flex justify-center gap-2 mt-4">

                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded"
                                onClick={() => handleDeleteVenue(venue._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <AddVenueModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={selectedVenueForEdit ? handleUpdateVenueSubmit : handleAddVenueSubmit}
                initialVenueData={selectedVenueForEdit}
            />
        </div>
    );
};

export default VenuesTab;