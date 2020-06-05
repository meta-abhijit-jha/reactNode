import React from 'react'

function FeedbackForm(props) {
  return (
    <div>
        <h3>Enter {props.type}</h3>
        <input type="text"></input>
    </div>
  )
}

export default FeedbackForm