import React from 'react'
import './TicketCategories.css'
const TicketCategories = () => {
    return (
        <div className="ticket-categories ">
            <div className="ticket-categories-title">
                <p>Ticket Categories</p>
            </div>
            <div className="categories">
                <ul>
                    <li className="category"><p>All categories</p><p>7</p></li>
                    <ul>
                        <li className="category"><p>General Issues</p> <p>7</p></li>
                        <li className="category"><p>Sales</p> <p>7</p></li>
                        <li className="category"><p>Payment Issues</p> <p>7</p></li>
                    </ul>
                </ul>
            </div>
            
        </div>
    )
}

export default TicketCategories
