import React from 'react'
import './TicketHeader.css'

const TicketHeader = () => {
    return (
        <div className="ticket-header row">
            <div className="col-md-4"><p>Subject</p></div>
            <div className="col-md-8 d-flex justify-content-between align-items-center ">
                <p >Priority</p>
                <p>Status</p>
                <p>Date</p>
                <p>Agent</p>
                <p>Updated</p>
                <input type="checkbox" />  
            </div>
        </div>
    )
}

export default TicketHeader
