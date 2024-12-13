"use client";

import { Calendar, dayjsLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import dayjs from "dayjs";
import { useCallback, useEffect, useState, useMemo } from "react";
import Cookies from "js-cookie";

const DnDCalendar = withDragAndDrop(Calendar);

const EventCalendar = ({ venueId }) => {
    const localizer = dayjsLocalizer(dayjs);

    const authToken = useMemo(() => Cookies.get("auth_token"), []);

    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            if (!authToken) {
                console.error("Auth token is missing");
                return;
            }
            try {
                const requestOptions = {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                    },
                };
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/venue?id=${venueId}`, requestOptions);
                const bookingsData = await res.json();
                const eventsData = bookingsData?.bookings?.map((booking) => ({
                    title: booking.event_name,
                    start: dayjs(booking.event_start).toDate(),
                    end: dayjs(booking.event_end).toDate(),
                    id: booking._id,
                }));
                setEvents(eventsData);
                console.log(eventsData);
            } catch (error) {
                alert("Error fetching venue details: " + error.message);
            }
        };

        fetchEvents();
    }, [venueId, authToken]);

    const handleEventPropChange = useCallback(({ event, start, end }) => {
        setEvents((prevEvents) =>
            prevEvents.map((ev) =>
                ev.id === event.id ? { ...ev, start, end } : ev
            )
        );
    }, []);

    return (
        <div style={{ marginBottom: "100px", padding: "0" }}>
            <h1
                className="text-primary"
                style={{ fontWeight: "bold", fontSize: "40px", padding: "10px" }}
            >
                Event Calendar
            </h1>
            <DnDCalendar
                localizer={localizer}
                events={events}
                startAccessor={"start"}
                endAccessor={"end"}
                draggableAccessor={() => true}
                style={{ height: "80vh" }}
                onEventResize={handleEventPropChange}
                onEventDrop={handleEventPropChange}
                defaultView="week"
            />
        </div>
    );
};

export default EventCalendar;
