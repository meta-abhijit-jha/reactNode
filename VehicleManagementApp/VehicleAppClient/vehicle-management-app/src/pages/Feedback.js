import React from 'react'
import { Button, FormControl, Alert } from 'react-bootstrap'

class Feedback extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      feedback: '',
      headline: '',
      alert: '',
      warning: ''
    }
    this.handleHeadline = this.handleHeadline.bind(this)
    this.handleFeedback = this.handleFeedback.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.showWarning = this.showWarning.bind(this)
  }

  handleFeedback(e) {
    this.setState({
      feedback: e.target.value,
    })
  }

  handleHeadline(e) {
    this.setState({
      headline: e.target.value,
    })
  }

  handleClick() {
    const { headline, feedback } = this.state
    if (feedback == '') {
      this.setState({ warning: "Feedback field is mandatory to Submit form" })
      return
    }

    window.open('mailto:abhijeetjha0@gmail.com?subject=' + headline + '&body=' + feedback, '_blank')

    this.setState({
      feedback: '',
      headline: '',
      warning: '',
      alert: 'Please refresh to submit another feedback'
    })
  }

  showWarning() {
    const {warning} = this.state
    if(warning == '') {
      return
    }
    return (
      <Alert bsStyle="warning">{this.state.warning}</Alert>
    )
  }

  render() {
    const { alert, feedback, headline, warning } = this.state
    if (alert != '') {
      return <h1>{alert}</h1>
    }
    return (
      <div>
        <h1>Feedback Page</h1>
        <FormControl.Static>Enter your feedback</FormControl.Static>
        <FormControl componentClass="textarea" rows="10" onChange={this.handleFeedback} value={feedback} placeholder="Please provide us your valuable feedback"></FormControl>
        <FormControl.Static>Headline for your feedback</FormControl.Static>
        <FormControl type="text" onChange={this.handleHeadline} value={headline}></FormControl>
        <Button bsStyle="primary" onClick={this.handleClick}>Redirect to your mail</Button>
        {this.showWarning()}
      </div>
    )
  }
}
export default Feedback