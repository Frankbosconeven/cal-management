import React from 'react'
import { getEvents} from "../../utils/getEvents"
import Link from "link/next"



export async function getStaticProps() {
    const posts = await getEvents();

    return {
        props: {
            posts
        },
    };
    
}
    console.log(posts)
  const Events = ({events}) => {
  return (
    <div>
        {events?.map((event, idx) => (
            <p key={idx}>
                <div>
                    <Link href={`/events/${event._id}`}>{event.title}</Link>
                </div>
                
            </p>
        ))}
        <h1>Events</h1>
    </div>
  )
}

export default Events;