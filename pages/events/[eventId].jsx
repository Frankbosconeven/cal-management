import React from 'react';
import {getEvents} from "../../utils/getEvents";

export async function getServerSideProps(context) {
    const event =  await getEvents(context.params.eventId);

    return {
        props: {
            event,
        }
    }
}

const EventDetails = ({event}) => {
  return (
    <div>
        <h1>EventDetails</h1>
        <hr/>
        {event.title}
    </div>
  )
}

export default EventDetails