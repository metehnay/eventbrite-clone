import React from 'react'
import {RiAddLine} from "react-icons/ri"
import {BsSuitHeart} from "react-icons/bs"
import {RiTicket2Line} from "react-icons/ri"
import {FiUser} from "react-icons/fi"
import {AiOutlineSearch} from "react-icons/ai"

const Header = () => {
  return (
    <div className="header-main">
        <div className="header-items">
            <div className="logo">
            <h1>eventbrite</h1>
            </div>
            <div className="search-box">
            <AiOutlineSearch className="search-icon" /> <input className="search" type="text" placeholder="Search events" /> 
            </div>
            <div className="header-links">
            <div className="link-1 blue-title">
            <div className="header-ikon"> <RiAddLine className="blue-ikon"/></div>
<p className="create">Create an event</p>
            </div>            <div className="link-1">
            <div className="header-ikon"> <BsSuitHeart /></div>
                <p>Likes</p>
</div>   <div className="link-1">
               <div className="header-ikon"> <RiTicket2Line /></div>
                <p>Tickets</p>

            </div>
        </div>
     <div className="header-login">
         <div className="user">
             <div className="user-icon"><FiUser className="fiuser" /></div>
             <p>oguzwst@gmail.com</p>
         </div>
     </div>
        </div>
    </div>
  )
}

export default Header