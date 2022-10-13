import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Nav from "./nav";
import Ical from "./avatar"


const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const events = [
    {
        title: "",
        allDay: true,
        start: new Date(2021, 6, 0),
        end: new Date(2021, 6, 0),
        body: "",
        timeFormat:"HH:mm",
        showTimeSelect : "",
        dateFormat:"MMMM d, yyyy h:mm aa",
        location: "",
    },
    {
        title: "",
        body: "",
        start: new Date(2021, 6, 7),
        end: new Date(2021, 6, 10),
        timeFormat:"HH:mm",
        showTimeSelect : "",
        dateFormat:"MMMM d, yyyy h:mm aa",
        location: "",
    },
    {
        title: "",
        start: new Date(2021, 6, 20),
        end: new Date(2021, 6, 23),
        body: "",
        timeFormat:"HH:mm",
        showTimeSelect : "",
        dateFormat:"MMMM d, yyyy h:mm aa",
        location: "",
    },
];

const Cal_management = () => {
    const [newEvent, setNewEvent] = useState({
         title: "", body: "", start: "", end: "" 
    });
    const [allEvents, setAllEvents] = useState(events);
  
    function handleAddEvent() {
        
        for (let i=0; i<allEvents.length; i++){

            const d1 = new Date (allEvents[i].start);
            const d2 = new Date(newEvent.start);
            const d3 = new Date(allEvents[i].end);
            const d4 = new Date(newEvent.end);
      /*
          console.log(d1 <= d2);
          console.log(d2 <= d3);
          console.log(d1 <= d4);
          console.log(d4 <= d3);
            */

             if (
              ( (d1  <= d2) && (d2 <= d3) ) || ( (d1  <= d4) &&
                (d4 <= d3) )
              )
            {   
                alert("CLASH"); 
                break;
             }
    
        }
        setAllEvents([...allEvents, newEvent]);
    }
  return (
    <div>
        <Nav />
        <div className="flex">
            <div className="flex justify-center items-center mt-11 ml-5 ">
                <div className="flex flex-col justify-center content-center m-2">
                <h2 className="text-2xl text-yellow-200">Add New Event</h2>
                {/* <form onSubmit={handleSubmit}>
                    {error && <p>{error}</p>}</form> */}
                    
                <input name="title"
                    className="shadow appearance-none border rounded w-64 py-2 px-3 
                  text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                    type="text" placeholder="Add Title" 
                     value={newEvent.title} 
                     onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                     <input name="location"
                    className="shadow appearance-none border rounded w-64 py-2 px-3 
                  text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                    type="location" placeholder="Location" 
                     value={newEvent.location} 
                     onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })} />
                <DatePicker
                 className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 
                 leading-tight focus:outline-none focus:shadow-outline mb-2"
                 placeholderText="Start Date"  
                 selected={newEvent.start} 
                 onChange={(start) => setNewEvent({ ...newEvent, start })} 
                 timeFormat="HH:mm"
                 showTimeSelect
                 dateFormat="MMMM d, yyyy h:mm aa"
                 />
                 
                <DatePicker 
                    className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 
                    leading-tight focus:outline-none focus:shadow-outline mb-2"
                    placeholderText="End Date" 
                    selected={newEvent.end} 
                    onChange={(end) => setNewEvent({ ...newEvent, end })}
                    timeFormat="HH:mm"
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                />
                    <div class="mb-3 xl:w-96">
                        <label htmlFor="body" class="justify-center items-center form-label inline-block mb-2 text-gray-700"
                        >Event description</label>
                        <textarea 
                            value={newEvent.body} 
                            onChange={(e) => setNewEvent({ ...newEvent, body: e.target.value })}
                            class="form-control block w-64 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="body" name="body" rows="3" placeholder="Event description">
                        </textarea>
                    </div>
                       <div>
                       <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white 
                            font-bold py-2 px-4 rounded mt-2" onClick={handleAddEvent}>
                            Add Event
                        </button>
                        <Ical />
                       </div>
                </div>
                
        </div>
            <Calendar localizer={localizer} events={allEvents} 
                startAccessor="start" endAccessor="end" 
                style={{ height: 700, margin: "50px" }} />
                <div>
                <button>Edit</button>
                <button>Delete</button>
            </div>
            </div>
            
    </div>
  )
}

export default Cal_management