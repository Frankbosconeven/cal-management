import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useRouter} from "next/router"
import axios from 'axios';
import Link from "next/link"
import {useSession} from "next-auth/react"


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
        title: "Big Meeting",
        allDay: true,
        start: new Date(2021, 6, 0),
        end: new Date(2021, 6, 0),
    },
    {
        title: "Vacation",
        start: new Date(2021, 6, 7),
        end: new Date(2021, 6, 10),
    },
    {
        title: "Conference",
        start: new Date(2021, 6, 20),
        end: new Date(2021, 6, 23),
    },
];

const Cal_management = () => {
    const [newEvent, setNewEvent] = useState({ title: "", body: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState(events);
    const {data:session} = useSession()
    console.log(session)
    // const [data, setData] = useState({
    //     title: "",
    //     body: "",
    // });
    // const [error, setError] = useState("")
    // const router = useRouter();

    // const [state, setState] = useState(false);

    // const showDropdown = () => {
    //     setState(true);
    // }
    // const hideDropdown = () => {
    //     setState(false);
    // }

    // const handleChange = (e) => {
    //     setData({...data, [e.target.name]: e.target.value});
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events`, data,
    //         );

    //         router.push("/events")
    //     } catch (error) {
    //         setError(error.message);
    //     }
    // };


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
        <nav className="relative w-full flex items-center justify-between py-4 bg-gray-100 text-gray-500 
            hover:text-gray-700 focus:text-gray-700 navbar navbar-expand-lg shadow-lg navbar-light ">
                <div className="m-5 flex space-x-4">
                    <input type="file"  
                        class="shadow rounded-full max-w-5 h-10 align-middle border-none"/>
                    {/* class="shadow rounded-full max-w-5 h-10 align-middle border-none" */}
                    <h1 >{session?.user && <span>{session?.user.name}</span>}</h1>
                </div>
                <ul>
                    <li className="mr-2">
                        <Link href="">
                        <a>LogOut</a>
                        </Link>
                    </li>
                </ul>
                {/* <div className=" flex flex-col" onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
                    hhhh
                {
                    state ?
                    (<ul >
                        <Link href="">
                            <a >
                                Edit profile
                            </a>
                        </Link>
                        <Link href="">
                            <a >
                                Dashboard
                            </a>
                        </Link>
                        <Link href="">
                            <a >
                                LogOut
                            </a>
                        </Link>
                    </ul> ):
                    null
                }
                </div> */}
        </nav>



        <div className="flex">
            <div className="flex justify-center items-center mt-11 ml-5 ">
                <div className="flex flex-col justify-center content-center m-2">
                <h2 className="text-2xl text-yellow-200">Add New Event</h2>
                {/* <form onSubmit={handleSubmit}>
                    {error && <p>{error}</p>}</form> */}
                    
                <input 
                    className="shadow appearance-none border rounded w-64 py-2 px-3 
                  text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                    type="text" placeholder="Add Title" 
                     value={newEvent.title} 
                     onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                <DatePicker
                 className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 
                 leading-tight focus:outline-none focus:shadow-outline mb-2"
                 placeholderText="Start Date"  
                 selected={newEvent.start} 
                 onChange={(start) => setNewEvent({ ...newEvent, start })} />
                <DatePicker 
                    className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 
                    leading-tight focus:outline-none focus:shadow-outline mb-2"
                    placeholderText="End Date" 
                    selected={newEvent.end} 
                    onChange={(end) => setNewEvent({ ...newEvent, end })} />
                    <div class="mb-3 xl:w-96">
                        <label for="exampleFormControlTextarea1" class="justify-center items-center form-label inline-block mb-2 text-gray-700"
                        >Event description</label>
                        <textarea
                            value={newEvent.body} 
                            onChange={(e) => setNewEvent({ ...newEvent, body: e.target.value })}
                            class="form-control block w-64 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="body" name="body" rows="3" placeholder="Event description">
                        </textarea>
                    </div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white 
                            font-bold py-2 px-4 rounded mt-2" onClick={handleAddEvent}>
                            Add Event
                        </button>
                </div>
        </div>
            <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" 
                style={{ height: 500, margin: "50px" }} />
            </div>
    </div>
  )
}

export default Cal_management