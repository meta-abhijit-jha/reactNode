import React from 'react'
import axios from 'axios'
import { Button, Jumbotron } from 'react-bootstrap'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      responseBackend: ""
    }
  }

  handleClick(e) {
    axios.get('/home').then((res) => {
      this.setState({
        responseBackend: res.data.message
      })
    })
  }

  render() {
    return (
      <div className="Home">
        <Jumbotron>
          <h1>Homepage</h1>
          <h2>A Simple Vehicle Management App, where we can retrieve data of all the vehicles present in the database.</h2>
          <h3>The company is here to serve you.</h3>
          <Button bsStyle="primary" onClick={this.handleClick}>Check Server Connection</Button>
          <p>{this.state.responseBackend}</p>
        </Jumbotron>
      </div>
    )
  }
}

export default Home;