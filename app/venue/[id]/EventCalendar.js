"use client"
// EVENT CALENDAR

import { Calendar, dayjsLocalizer } from "react-big-calendar"
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import dayjs from "dayjs"
import { useCallback, useEffect, useState } from 'react'
import Cookies from "js-cookie"

const DnDCalendar = withDragAndDrop(Calendar)
const EventCalendar = ({ venueId }) => {
    // let venueId = "674ab713c8311fea922596a8"
    const localizer = dayjsLocalizer(dayjs)
    const handleCalendarViewNavigate = useCallback((date) => {
        console.log("Navigating to:", date);
    }, []);
    let authToken = Cookies.get("auth_token")
    const [events, setEvents] = useState([
        {
            id: 1,
            title: "WAD project discussion",
            start: new Date(2024, 10, 30, 19, 15, 0, 0),
            end: new Date(2024, 10, 30, 21, 0, 0, 0),
        }
    ])
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    },
                };
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/venue?id=${venueId}`, requestOptions);
                const bookingsData = await res.json();
                let eventsData = bookingsData?.bookings?.map(booking => { return { title: booking.event_name, start: dayjs(booking.event_start).toDate(), end: dayjs(booking.event_end).toDate(), id: booking._id } })
                setEvents(eventsData)
                console.log(eventsData)
            } catch (error) {
                alert("Error fetching venue details : " + error.message);
            }
        }
        fetchEvents()

    }, [venueId]);
    const handleEventPropChange = useCallback(({ event, start, end }) => {
        setEvents((prevEvents) => {
            let updatedEvents = prevEvents.map((ev) => {
                if (ev.id == event.id) {
                    return { ...ev, start, end }
                }
                return ev;
            })
            return updatedEvents
        })
    }, [events])
    return (
        <div style={{ marginBottom: "100px", padding: "0" }}>
            <h1 className="text-primary" style={{ fontWeight: "bold", fontSize: "40px", padding: "10px" }}>Event Calendar</h1>
            <DnDCalendar
                localizer={localizer}
                events={events}
                startAccessor={"start"}
                endAccessor={"end"}
                draggableAccessor={(event) => true}
                style={{ height: "80vh" }}
                onEventResize={handleEventPropChange}
                onEventDrop={handleEventPropChange}
                onNavigate={handleCalendarViewNavigate}
                defaultView="week"
            />
        </div>
    )
}
export default EventCalendar