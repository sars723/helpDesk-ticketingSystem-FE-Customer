import React from 'react'
import { Form,Button } from 'react-bootstrap'
import './NewTicket.css'
const NewTicket = () => {
    return (
        <div className="new-ticket container-fluid  ">
            <div className="row flex-column">
          <div className="col-8 mx-auto mt-5 new-ticket-wrapper">
          <div className="new-ticket-header  ">
                <p className="mb-0 p-3">New Ticket</p>
            </div>
            <Form className=" new-ticket-form p-3">
            <Form.Group>
                <Form.Label>Your email address</Form.Label>
                <Form.Control type="email" />
            </Form.Group>
           <div className="new-ticket-form-select">
           <Form.Group className="mr-2">
                <Form.Control as="select">
                    <option>General Issues</option>
                    {/* <hr />
                    <Form.Label>Sales</Form.Label> */}
                    <option value="General Sales">General Sales</option>
                    <option value="Payment Issues">Payment Issues</option>
                 {/*    <Form.Label>Technical</Form.Label> */}
                    <option value="Software Issues">Software Issues</option>
                    <option value="Hardware Issues">Hardware Issues</option>
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Control as="select">
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="Critical">Critical</option>
                </Form.Control>
            </Form.Group>
           </div>
           <Form.Group>
               <Form.Control type="text" placeholder="Subject" />
           </Form.Group>
           <Form.Group>
               <Form.Control as="textarea" rows={3}/>
           </Form.Group>
            <Form.Group>
    <Form.File placeholder="attach file"  />
  </Form.Group>
  <Button className="btn-submit" type="submit">
            submit
          </Button>
            </Form>
          </div>
            </div>
        </div>
    )
}

export default NewTicket
