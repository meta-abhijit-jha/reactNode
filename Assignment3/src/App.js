import React from 'react';
import UpdateStateOfParent from './UpdateStateOfParent';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.updateState = this.updateState.bind(this);
    this.state = {output : "Welcome to my app"};
  }

  updateState() {
    this.setState(
      {output : "Bye!!!!!!!!"}
    );
  }

  render() {
    return (
      <div>
        <h1>Event Handler Example</h1>
        <UpdateStateOfParent updateStateprop = {this.updateState}/>
        <p>{this.state.output}</p>
      </div>
    );
  }
}

export default App;
