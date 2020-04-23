import React from 'react';
import './App.css';

class InputBox extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      isDisable: false,
      mark: ""
    };
  }

  handleClick(e) {
    e.preventDefault();
    let currentMark = null;
    if (this.props.winner) {
      return;
    }
    if (this.state.isDisable) {
      return;
    } else {
      if (this.props.value % 2 == 0) {
        currentMark = "X";
      } else {
        currentMark = "O";
      }
      this.setState({
        isDisable: true,
        mark: currentMark
      })
      this.props.onClick(this.props.position, currentMark);
    }
  }

  render() {
    return (
      <button type="button" onClick={this.handleClick}>{this.state.mark}</button>
    );
  }
}

export default InputBox;
