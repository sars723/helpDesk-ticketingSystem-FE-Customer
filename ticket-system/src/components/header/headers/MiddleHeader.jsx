import React from 'react'
import './MiddleHeader.css'
import { Form,FormControl,Button,Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const MiddleHeader = () => {
    return (
        <div className="middle-header" >
        
    <Nav className="mr-auto">
      <Nav.Link href="#home"><i class="fa fa-inbox"></i>Tickets</Nav.Link>
      <Nav.Link href="#link"><i class="far fa-chart-bar"></i>Reports</Nav.Link>
      <Nav.Link href="#home"><i class="fa fa-cog"></i>Administration</Nav.Link>
      
    </Nav>
    <div className="left-newTicket-search ">
       
         <Link to="" className="new-ticket-btn  d-flex align-items-center"><i class="fa fa-plus-square"></i>New ticket</Link>
    <Form inline className="search" >
      
      <Button variant="outline-success" ><i class="fa fa-search" ></i></Button>
      <FormControl type="text" placeholder="Search" id="search-input" />
    </Form>   
        
    
    </div>


           {/*  <ul>
                <li>
                    <a href=""><i class="fa fa-inbox"></i>Tickets</a>
                </li>
                <li>
                    <a href=""><i class="fa fa-bar-chart-o"></i>Reports</a>
                </li>
                <li>
                    <a href=""><i class="fa fa-bar-chart-o"></i>Administration</a>
                </li>
                <li>
                    <div className="new-ticket"><a href=""><i class="fa fa-plus-square"></i>New ticket</a></div>
                    <div className="search">

                    </div>
                </li>
            </ul> */}
        </div>
    )
}

export default MiddleHeader
