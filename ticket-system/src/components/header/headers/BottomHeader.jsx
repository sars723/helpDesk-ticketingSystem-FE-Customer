import React from 'react'
import './BottomHeader.css'
const BottomHeader = () => {
    return (
        <div className="bottom-header">
           <ul className="bottom-header-ticket-menu">
               <li className="active"><a href="#" >Unanswerd <span>0</span></a></li>
               <li><a href="#">Unclosed <span>0</span></a></li>
               <li><a href="#">Unassigned <span>0</span></a></li>
               <li><a href="#">Assigned to you <span>0</span></a></li>
               <li><a href="#">All <span>0</span></a></li>
           </ul>
        </div>
    )
}

export default BottomHeader
