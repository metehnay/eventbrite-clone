import React, {useState} from 'react'
import {demoData} from "./demoData"

export const EventsCard = () => {

    const [events, setEvents] = useState(demoData)
  return (
    <div className="card-container">
        <div className="card-inside">
            <div className="header">
<h2 style={{color: "#1E0A3C"}}>Events in New York</h2></div>
    
    <div className="cards">
        {events.map((event) => (
            <div className="single-card">
     <img className="card-img" src={event.image} />
        <h6 className="title">{event.title}</h6>
        <h6 className="date">{event.date}</h6>
        <h6 className="location">{event.location}</h6>
        <h6 className="price">{event.price}</h6>
        <h6 className="owner">{event.owner}</h6>
        <h6 className="follower">{event.follower}</h6>
        </div>
        ))}
 
        
        </div></div></div>
  )
}
