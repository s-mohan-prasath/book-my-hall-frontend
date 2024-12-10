import React, { useState, useEffect } from 'react';

function AddVenueModal({ isOpen, onClose, onSubmit, initialVenueData }) {
    // Initialize hooks outside of any conditional statements
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

    // Reset form when modal is opened or closed
    useEffect(() => {
        if (initialVenueData) {
            // Editing an existing venue
            setIsEditing(true);
            setVenueName(initialVenueData.name || '');
            setVenueType(initialVenueData.type || 'hall');
            setSeatingCapacity(initialVenueData.seating_capacity?.toString() || '');
            setBlockName(initialVenueData.address || '');
            setProjector(initialVenueData.has_projector ?? true);
            setAc(initialVenueData.has_ac ?? true);

            // Handle existing images
            if (initialVenueData.image && initialVenueData.image.images) {
                setExistingImages(initialVenueData.image.images);
            } else {
                setExistingImages([]);
            }
            setImages([]);
        } else {
            // Adding a new venue
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

    const handleImageUpload = (e) => {
        const newImages = Array.from(e.target.files);
        setImages((prevImages) => [...prevImages, ...newImages]);
    };

    const handleImageDelete = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
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
            const formData = new FormData();
            const venueData = JSON.stringify({
                name: venueName,
                type: venueType,
                seating_capacity: parseInt(seatingCapacity),
                address: blockName,
                has_projector: projector,
                has_ac: ac,
                ...(isEditing && { _id: initialVenueData._id }),
            });

            formData.append('venueData', venueData);
            images.forEach((image) => {
                formData.append('venue-images', image);
            });

            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjc1MmI5NDBjN2UyN2Y3OWVkYjFjOTRhIiwiaWF0IjoxNzMzNTkyODg1LCJleHAiOjE3MzM1OTY0ODV9.zVzxTBZZylTJx-EPU08MN7dqj3iuccZY2DMu18Qqxog";
            const endpoint = isEditing
                ? `http://localhost:5000/admin/venue/${initialVenueData._id}`
                : "http://localhost:5000/admin/venue/";
            const method = isEditing ? 'PATCH' : 'POST';

            const requestOptions = {
                method: method,
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await fetch(endpoint, requestOptions);
            const result = await response.json();

            if (response.ok) {
                console.log(result);
                onSubmit(result.venue);
                onClose();
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

    // Conditionally render the modal content
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            {/* Modal Content */}
        </div>
    );
}

export default AddVenueModal;
