import React from 'react'
import FeedbackForm from '../component/FeedbackForm'
import { Button } from 'react-bootstrap'

function Feedback() {
  return (
    <div>
      <h1>Feedback Page</h1>
      <h2>Please provide us your valuable feedback</h2>
      <textarea cols="50" rows="10"></textarea>
      <FeedbackForm type="name"></FeedbackForm>
      <FeedbackForm type="email"></FeedbackForm>
      <Button bsStyle="success">Submit</Button>
    </div>
  );
}

export default Feedback;