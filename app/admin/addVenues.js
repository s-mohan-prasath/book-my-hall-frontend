import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
function AddVenueModal({ isOpen, onClose, onSubmit, initialVenueData }) {
    // Hooks must be called at the top
    const [venueName, setVenueName] = useState('');
    const [venueType, setVenueType] = useState('hall');
    const [seatingCapacity, setSeatingCapacity] = useState('');
    const [blockName, setBlockName] = useState('');
    const [projector, setProjector] = useState(true);
    const [ac, setAc] = useState(true);
    const [images, setImages] = useState([]);
    const [existingImages, setExistingImages] = useState([]);
    const [errors, setErrors] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (!isOpen) return; // Ensure the effect only runs when modal is open
        if (initialVenueData) {
            setIsEditing(true);
            setVenueName(initialVenueData.name || '');
            setVenueType(initialVenueData.type || 'hall');
            setSeatingCapacity(initialVenueData.seating_capacity?.toString() || '');
            setBlockName(initialVenueData.address || '');
            setProjector(initialVenueData.has_projector ?? true);
            setAc(initialVenueData.has_ac ?? true);
            setExistingImages(initialVenueData.image?.images || []);
            setImages([]);
        } else {
            setIsEditing(false);
            setVenueName('');
            setVenueType('hall');
            setSeatingCapacity('');
            setBlockName('');
            setProjector(true);
            setAc(true);
            setImages([]);
            setExistingImages([]);
        }
        setErrors({});
    }, [initialVenueData, isOpen]);

    if (!isOpen) return null; // Now safe to return null


    const handleImageUpload = (e) => {
        const newImages = Array.from(e.target.files);
        setImages((prevImages) => [...prevImages, ...newImages]); // Append new images to the list
    };

    const handleImageDelete = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index)); // Remove the image at the specified index
    };

    const handleExistingImageDelete = (index) => {
        setExistingImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const validateForm = () => {
        const errors = {};
        if (!venueName) errors.venueName = 'Venue name is required';
        if (!seatingCapacity) errors.seatingCapacity = 'Seating capacity is required';
        if (!blockName) errors.blockName = 'Block name is required';
        return errors;
    };

    const handleSubmit = async () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            // Create FormData to send multipart form data
            const formData = new FormData();

            // Prepare venue data as JSON string
            const venueData = JSON.stringify({
                name: venueName,
                type: venueType,
                seating_capacity: parseInt(seatingCapacity),
                address: blockName,
                has_projector: projector,
                has_ac: ac,
                ...(isEditing && { _id: initialVenueData._id }) // Include ID for update
            });

            // Append venue data and images
            formData.append('venueData', venueData);

            // Append new images
            images.forEach((image) => {
                formData.append('venue-images', image);
            });

            // Set up headers with the Authorization token
            const adminAuthToken = Cookies.get("admin_auth_token");

            // Determine the endpoint and method based on whether we're adding or updating
            const endpoint = isEditing
                ? `${process.env.NEXT_PUBLIC_API_URL}/admin/venue/${initialVenueData._id}`
                : `${process.env.NEXT_PUBLIC_API_URL}/admin/venue/`;
            const method = isEditing ? 'PATCH' : 'POST';

            const requestOptions = {
                method: method,
                body: formData,
                headers: {
                    'Authorization': `Bearer ${adminAuthToken}`,
                },
            };

            // Make the request
            const response = await fetch(endpoint, requestOptions);
            const result = await response.json();

            if (response.ok) {
                console.log(result);
                onSubmit(result.venue); // Call the onSubmit callback with venue data
                onClose(); // Close the modal or form
                alert(isEditing ? "Venue updated Successfully." : "Venue added Successfully.");
            } else {
                console.error("Error response:", result);
                alert(`Error: ${result.error || 'Something went wrong'}`);
            }

        } catch (error) {
            console.error("Error submitting venue:", error.message);
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-full sm:w-11/12 md:w-9/12 lg:w-7/12 xl:w-5/12 max-w-4xl rounded-xl p-6 shadow-lg relative max-h-[80vh] overflow-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-xl font-bold text-gray-500 hover:text-gray-700"
                >
                    &times;
                </button>
                <h2 className="text-2xl font-semibold text-primary mb-4">
                    {isEditing ? 'Edit Venue' : 'Add Venue'}
                </h2>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Venue Name</label>
                        <input
                            type="text"
                            value={venueName}
                            onChange={(e) => setVenueName(e.target.value)}
                            className="w-full border rounded-md p-2"
                            placeholder="Enter venue name"
                        />
                        {errors.venueName && <p className="text-red-500 text-sm">{errors.venueName}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Venue Type</label>
                        <select
                            value={venueType}
                            onChange={(e) => setVenueType(e.target.value)}
                            className="w-full border rounded-md p-2"
                        >
                            <option value="classroom">Classroom</option>
                            <option value="lab">Lab</option>
                            <option value="hall">Hall</option>
                            <option value="auditorium">Auditorium</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Seating Capacity</label>
                        <input
                            type="number"
                            value={seatingCapacity}
                            onChange={(e) => setSeatingCapacity(e.target.value)}
                            className="w-full border rounded-md p-2"
                            placeholder="Enter seating capacity"
                        />
                        {errors.seatingCapacity && <p className="text-red-500 text-sm">{errors.seatingCapacity}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Address</label>
                        <input
                            type="text"
                            value={blockName}
                            onChange={(e) => setBlockName(e.target.value)}
                            className="w-full border rounded-md p-2"
                            placeholder="Enter block name"
                        />
                        {errors.blockName && <p className="text-red-500 text-sm">{errors.blockName}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Projector Availability</label>
                        <select
                            value={projector}
                            onChange={(e) => setProjector(e.target.value)}
                            className="w-full border rounded-md p-2"
                        >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">AC / Non-AC</label>
                        <select
                            value={ac}
                            onChange={(e) => setAc(e.target.value)}
                            className="w-full border rounded-md p-2"
                        >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Upload Images</label>
                        <input
                            type="file"
                            multiple
                            onChange={handleImageUpload}
                            className="w-full border rounded-md p-2"
                        />
                        {images.length > 0 && (
                            <div className="mt-2">
                                <h3 className="text-sm">Selected Images:</h3>
                                <ul className="list-disc pl-5">
                                    {images.map((image, index) => (
                                        <li key={index} className="flex items-center justify-between">
                                            {image.name}
                                            <button
                                                type="button"
                                                onClick={() => handleImageDelete(index)}
                                                className="text-red-500 ml-2"
                                            >
                                                &times;
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddVenueModal;
