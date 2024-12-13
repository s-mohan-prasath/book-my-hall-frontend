"use client"
import React, { useState } from "react";
import { Modal, ModalContent, ModalBody, Button } from "@nextui-org/react";
import Cookies from "js-cookie";

export default function BookingForm({ venueId, isOpen, onOpenChange, scrollBehavior, onCloseRequestModal }) {
    const [eventName, setEventName] = useState("");
    const [eventDesc, setEventDesc] = useState("");
    const [eventStart, setEventStart] = useState("");
    const [eventEnd, setEventEnd] = useState("");
    const [eventImage, setEventImage] = useState("");
    const [peopleCount, setPeopleCount] = useState(0);
    const [requestNote, setRequestNote] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const bookingData = {
            venue: venueId,
            event_name: eventName,
            event_desc: eventDesc,
            event_start: eventStart,
            event_end: eventEnd,
            event_image: eventImage,
            people_count: peopleCount,
            request_note: requestNote
        };

        try {
            const authToken = Cookies.get("auth_token");

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`
                },
                body: JSON.stringify(bookingData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to create booking.");
            }

            const data = await response.json();
            alert("Booking created successfully!");
            onCloseRequestModal(); // Close the modal after successful submission
        } catch (error) {
            console.error("Error creating booking:", error);
            alert("Failed to create booking. Please try again.");
        }
    };

    return (
        <Modal
            className='fixed z-10 md:top-72 max-xl top-1/2 left-[48%] transform -translate-x-1/2 -translate-y-1/2 w-full mx-auto mt-2.5 bg-black border border-seconadary-outline'
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            scrollBehavior={scrollBehavior}
            isDismissable={false}
        >
            <ModalContent className='bg-white sm:p-5 max-h-[95%] max-w-[85%] rounded text-center '>
                {(onClose) => (
                    <>
                        <ModalBody className='modal-body w-full'>
                            <form onSubmit={handleSubmit} className="shadow-custom max-w-[100%] border-3 border-primary-dark  bg-primary-sign my-[10vh] rounded-md p-8">
                                <h1 className='text-primary mb-8 text-3xl font-bold'>Booking Form</h1>
                                <div className="flex flex-col mb-4">
                                    <label className="w-full mb-1 text-start font-semibold" htmlFor="ename">Event Name</label>
                                    <input
                                        className='border-2 [border-color:#222222] p-3 w-full h-9 rounded bg-transparent text-seconadary focus:outline-none text-s[15px] placeholder-black'
                                        type="text"
                                        id="ename"
                                        name="ename"
                                        value={eventName}
                                        onChange={(e) => setEventName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label className="w-full mb-1 text-start font-semibold" htmlFor="edesc">Event Description</label>
                                    <textarea
                                        className='border-2 [border-color:#222222] p-3 w-full h-24 rounded bg-transparent text-seconadary focus:outline-none text-s[15px] placeholder-black'
                                        id="edesc"
                                        name="edesc"
                                        value={eventDesc}
                                        onChange={(e) => setEventDesc(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label className="w-full mb-1 text-start font-semibold" htmlFor="date">Event Start Date & Time</label>
                                    <input
                                        className='border-2 [border-color:#222222] p-3 w-full h-9 rounded bg-transparent text-seconadary focus:outline-none text-s[15px] placeholder-black'
                                        type="datetime-local"
                                        id="date"
                                        name="date"
                                        value={eventStart}
                                        onChange={(e) => setEventStart(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label className="w-full mb-1 text-start font-semibold" htmlFor="etime">Event End Date & Time</label>
                                    <input
                                        className='border-2 [border-color:#222222] p-3 w-full h-9 rounded bg-transparent text-seconadary focus:outline-none text-s[15px] placeholder-black'
                                        type="datetime-local"
                                        id="etime"
                                        name="etime"
                                        value={eventEnd}
                                        onChange={(e) => setEventEnd(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label className="w-full mb-1 text-start font-semibold" htmlFor="eimage">Event Image URL</label>
                                    <input
                                        className='border-2 [border-color:#222222] p-3 w-full h-9 rounded bg-transparent text-seconadary focus:outline-none text-s[15px] placeholder-black'
                                        type="text"
                                        id="eimage"
                                        name="eimage"
                                        value={eventImage}
                                        onChange={(e) => setEventImage(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label className="w-full mb-1 text-start font-semibold" htmlFor="pcount">Required Capacity</label>
                                    <input
                                        className='border-2 [border-color:#222222] p-3 w-full h-9 rounded bg-transparent text-seconadary focus:outline-none text-s[15px] placeholder-black'
                                        type="number"
                                        id="pcount"
                                        name="pcount"
                                        value={peopleCount}
                                        onChange={(e) => setPeopleCount(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label className="w-full mb-1 text-start font-semibold" htmlFor="rnote">Request Note</label>
                                    <textarea
                                        className='border-2 [border-color:#222222] p-3 w-full h-24 rounded bg-transparent text-seconadary focus:outline-none text-s[15px] placeholder-black'
                                        id="rnote"
                                        name="rnote"
                                        value={requestNote}
                                        onChange={(e) => setRequestNote(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                                <div className="flex justify-center">
                                    <Button className='bg-primary border border-primary rounded mx-1 text-white py-1 mt-2' onPress={onCloseRequestModal}>
                                        Cancel
                                    </Button>
                                    <Button className='bg-primary border border-primary rounded mx-1 text-white py-1 mt-2' type="submit">
                                        Submit Request
                                    </Button>
                                </div>
                            </form>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
