import React from 'react'
import { getEvents} from "../../utils/getEvents"
import {unstable_getServerSideSession} from "next-auth"
import {authOptions} from "../api/auth/[...nextauth]"
import Link from "next/link"

export async function getServerSideProps(req, res) {
    const events = await getEvents();

    const session = await unstable_getServerSideSession(req, res, authOptions)
    console.log(session)

    return {
        props: {
            events,
        },
    };
}

  const Events = ({events}) => {
    console.log(events)
  return (
    <div>
        {events?.map((event, idx) => (
            <p key={idx}>
                <div>
                    <Link href={`/events/${event._d}`}>{event.title}</Link>
                </div>
                
            </p>
        ))}
        <h1>Events</h1>
    </div>
  )
}

export default Events;