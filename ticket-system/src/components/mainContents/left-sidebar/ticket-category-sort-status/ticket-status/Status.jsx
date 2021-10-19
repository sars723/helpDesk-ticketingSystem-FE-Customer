import React from 'react'
import './Status.css'
const Status = ({icon,noOfTicket,status}) => {
    return (
        <div className="status">
            <div className="status-icon">
                <img src={icon} alt="" />
            </div>
            <div className="number-of-tickets">
               <span>{noOfTicket}</span>
            </div>
            <div className="status-type">
                {status}
            </div>
        </div>
    )
}

export default Status
