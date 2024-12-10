'use client';
import { useState, useEffect } from 'react';
import '../styles/venueList.css';
import Cookies from 'js-cookie';

const apiUrl = 'http://localhost:5000/venue';

export default function Home() {
    const [venues, setVenues] = useState([]);
    const [originalVenues, setOriginalVenues] = useState([]); // Store original unfiltered venues
    const [uniqueAddresses, setUniqueAddresses] = useState([]);
    const [filters, setFilters] = useState({
        address: '',
        seating_capacity: ''
    });

    const fetchVenues = async () => {
        try {
            const authToken = Cookies.get("auth_token");

            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                throw new Error('Error fetching venues');
            }

            const data = await response.json();
            const fetchedVenues = data.venues || [];


            setOriginalVenues(fetchedVenues);
            setVenues(fetchedVenues);

            // Extract unique addresses from fetched venues
            const addresses = [...new Set(fetchedVenues.map(venue => venue.address))];
            setUniqueAddresses(addresses);

        } catch (error) {
            console.error('Error fetching venues:', error);
            setVenues([]);
            setOriginalVenues([]);
        }
    };

    const applyFilters = () => {
        let filteredVenues = originalVenues;

        // Apply address filter
        if (filters.address) {
            filteredVenues = filteredVenues.filter(venue => venue.address === filters.address);
        }

        // Apply seating capacity filter
        if (filters.seating_capacity) {
            filteredVenues = filteredVenues.filter(venue =>
                venue.seating_capacity == parseInt(filters.seating_capacity)
            );
        }

        setVenues(filteredVenues);
    };



    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    useEffect(() => {
        fetchVenues();
    }, []); // Fetch venues only once on initial load

    useEffect(() => {
        applyFilters();
    }, [filters]); // Apply filters whenever filters change

    return (
        <div className="container px-4 md:px-8 py-6">
            <h1 className="title text-3xl font-semibold text-center mb-6">Venues in our Organization</h1>

            {/* Filter Section */}
            <div className="filterContainer flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                <select
                    name="address"
                    value={filters.address}
                    onChange={handleFilterChange}
                    className="filterDropdown p-2 border rounded-md"
                >
                    <option value="">All</option>
                    {uniqueAddresses.map((address) => (
                        <option key={address} value={address}>
                            {address}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    name="seating_capacity"
                    placeholder="Max seating capacity"
                    value={filters.seating_capacity}
                    onChange={handleFilterChange}
                    className="filterInput p-2 border rounded-md"
                />
            </div>

            {/* Venue Grid */}
            {venues.length > 0 ? (
                <div className="flex flex-col  md:flex-row flex-wrap gap-16 justify-center p-10">
                    {venues.map((venue) => (
                        <div
                            key={venue.id}
                            className="bg-white md:w-[20%] p-8 border-2 rounded-lg shadow-lg hover:shadow-xl transition-all"
                        >
                            <h3 className="text-2xl font-bold text-red-500 mb-4">{venue.name}</h3>

                            {venue.image ? (

                                <img
                                    src={`http://localhost:5000/get-image/${venue.image.images[0].url}`}
                                    alt="Venue"
                                    className="mb-4 w-full h-32 object-cover rounded-md"
                                />
                            ) : (
                                <img
                                    src="https://via.placeholder.com/150"
                                    alt="No Image Available"
                                    className="mb-4 w-full h-32 object-cover rounded-md"
                                />
                            )}

                            <p className="text-gray-600">Address: {venue.address}</p>
                            <p className="text-gray-600">Seating Capacity: {venue.seating_capacity}</p>

                            <button
                                className="mt-4 bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600"
                            >
                                Details
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div
                    style={{ width: '100%', height: '50vh' }}
                    className="flex flex-col justify-center items-center"
                >
                    <p>No Venues Available</p>
                </div>
            )}
        </div>
    );
}