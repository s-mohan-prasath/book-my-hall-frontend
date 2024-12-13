'use client';
import React, { use } from "react";
import Image from "next/image";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, user } from "@nextui-org/react";

import { useState, useEffect } from "react"
import Cookies from "js-cookie";

// ICONS
import { MdEventSeat } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";
import { MdOutlineSevereCold } from "react-icons/md";
import { LuProjector } from "react-icons/lu";
import BookingForm from "./bookingForm";
import EventCalendar from "./EventCalendar";

export default function VenuePage({ params }) {
    let { id } = use(params)
    let authToken = Cookies.get("auth_token")
    console.log(authToken)
    let [venue, setVenue] = useState({})
    useEffect(() => {
        const fetchVenue = async () => {
            try {
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    },
                };
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/venue/${id}`, requestOptions);
                const venueData = await res.json();
                setVenue(venueData?.venue);
            } catch (error) {
                alert("Error fetching venue details");
            }
        };
        fetchVenue();

    }, [id]);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [scrollBehavior, setScrollBehavior] = React.useState("inside");

    const { isOpen: isRequestModalOpen, onOpen: onOpenRequestModal, onOpenChange: onOpenRequestModalChange } = useDisclosure();

    return (
        <div className='mx-16 my-8'>
            <h1 className="text-primary text-3xl font-bold py-5 flex justify-center lg:justify-start">{venue?.name}</h1>
            <div className="flex flex-wrap justify-center lg:grid grid-cols-[1.8fr,1fr,1fr] grid-rows-[200px,200px] gap-5">
                {
                    venue?.image?.images?.map(({ url }, key) => {
                        console.log(url)
                        return <div className="box" key={key}>
                            <img className="w-full h-full object-cover rounded" src={`${process.env.NEXT_PUBLIC_API_URL}/get-image/` + url} alt='Venue Images' style={{ width: 500, height: 400 }} />
                        </div>
                    })
                }
                <div className="box flex justify-center items-center relative" onClick={onOpen} >
                    <Image className="w-full h-full object-cover rounded brightness-50" src='/images/img6.jpg' alt='Venue Images' width={500} height={400} />
                    <span className="absolute text-lg text-white cursor-pointer">See More</span>
                </div>
            </div>
            <div className=' border border-seconadary-outline rounded-sm mt-5 px-8'>
                <h2 className="p-3 text-2xl font-bold">Features</h2>
            </div>
            <div className='border border-seconadary-outline rounded-sm mt-5 px-8 flex justify-between items-center flex-wrap'>
                <div className='my-8 p-1 flex flex-col justify-center items-center w-64 text-seconadary-outline text-lg'><MdEventSeat size={60} style={{ color: "#cf1839" }} />
                    <p className='text-black text-lg font-bold mt-2'>Seating Capacity</p>
                    <p id='seat-count'>{venue?.seating_capacity}</p></div>
                <div className='my-8 p-1 flex flex-col justify-center items-center w-64 text-seconadary-outline text-lg'><FaBuilding size={60} style={{ color: "#cf1839" }} />
                    <p className='text-black text-lg font-bold mt-2'>Block Name</p>
                    <p id='block-name'>{venue?.address}</p></div>
                <div className='my-8 p-1 flex flex-col justify-center items-center w-64 text-seconadary-outline text-lg'><MdOutlineSevereCold size={60} style={{ color: "#cf1839" }} />
                    <p className='text-black text-lg font-bold mt-2'>AC / Non AC</p>
                    <p id='ac'>{(venue?.has_ac == true) ? "Available" : "Not Available"}</p></div>
                <div className='my-8 p-1 flex flex-col justify-center items-center w-64 text-seconadary-outline text-lg'><LuProjector size={60} style={{ color: "#cf1839" }} />
                    <p className='text-black text-lg font-bold mt-2'>Projector</p>
                    <p id='projector'>{(venue?.has_projector == true) ? "Available" : "Not Available"}</p></div>
            </div>
            <div className="flex flex-row justify-center md:justify-end m-8 "><button className='bg-primary text-white border border-primary p-2 rounded' onClick={onOpenRequestModal}>REQUEST FOR BOOKING </button></div>

            <EventCalendar venueId={id} />

            <Modal className='fixed z-10 md:top-72 max-xl top-1/2 left-[48%] transform -translate-x-1/2 -translate-y-1/2 w-full mx-auto mt-2.5 bg-black  border border-seconadary-outline' isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={scrollBehavior} isDismissable={false} isKeyboardDismissDisabled={true}>
                <ModalContent className='bg-white p-5 max-h-[95%] max-w-[85%] rounded text-center '>
                    {(onClose) => (
                        <>
                            <ModalHeader className="text-lg font-bold text-center mt-5 pb-0">Images</ModalHeader>
                            <ModalBody className='modal-body'>
                                <div className="flex flex-col justify-center gap-6 p-4 w-auto">
                                    {
                                        venue?.image?.images?.map(({ url }, key) => {
                                            return <Image key={key} className="rounded" src={`${process.env.NEXT_PUBLIC_API_URL}/get-image/` + url} alt="venue images" width={1400} height={400} />
                                        })
                                    }
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button className='bg-primary-light border border-primary rounded mx-auto text-white py-1 px-5 mt-2' onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <BookingForm
                venueId={id}
                isOpen={isRequestModalOpen}
                onOpenChange={onOpenRequestModalChange}
                scrollBehavior={scrollBehavior}
                onCloseRequestModal={onOpenRequestModalChange}
            />

        </div>


    );
}