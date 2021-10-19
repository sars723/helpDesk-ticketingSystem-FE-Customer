import React from 'react'
import './LeftSidebar.css'
import TicketCategories from './ticket-category-sort-status/TicketCategories'
import TicketSort from './ticket-category-sort-status/TicketSort'
import TicketStatus from './ticket-category-sort-status/TicketStatus'
const LeftSidebar = () => {
    return (
        <div className="col-12 col-md-3">
           <TicketCategories/>
           <TicketSort/>
           <TicketStatus/> 
        </div>
    )
}

export default LeftSidebar
