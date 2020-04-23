import React from 'react';
import './App.css';
import InputBox from './InputBox.js'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.calculateWinner = this.calculateWinner.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      counter: 0,
      boxes: Array(9).fill(null),
      currentMark: ""
    };
  }

  handleClick(currentPosition, mark) {
    this.setState(
      {
        currentMark: mark
      }
    );
    const newBoxes = this.state.boxes.slice();
    if (this.calculateWinner(newBoxes) || newBoxes[currentPosition]) {
      return;
    }
    newBoxes[currentPosition] = mark;
    this.setState(
      {
        boxes: newBoxes,
        counter: ++this.state.counter
      }
    );
  }

  calculateWinner(boxes) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (boxes[a] && boxes[a] === boxes[b] && boxes[a] === boxes[c]) {
        return boxes[a];
      }
    }
    return null;
  }

  render() {
    const { counter } = this.state;
    const winner = this.calculateWinner(this.state.boxes);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    }
    return (
      <div className="App">
        <h1>Tic Tac Toe Game</h1>
        <div className="inputDiv">
          <InputBox onClick={this.handleClick} value={counter} position="0" winner={winner}></InputBox>
          <InputBox onClick={this.handleClick} value={counter} position="1" winner={winner}></InputBox>
          <InputBox onClick={this.handleClick} value={counter} position="2" winner={winner}></InputBox>
        </div>
        <div className="inputDiv">
          <InputBox onClick={this.handleClick} value={counter} position="3" winner={winner}></InputBox>
          <InputBox onClick={this.handleClick} value={counter} position="4" winner={winner}></InputBox>
          <InputBox onClick={this.handleClick} value={counter} position="5" winner={winner}></InputBox>
        </div>
        <div className="inputDiv">
          <InputBox onClick={this.handleClick} value={counter} position="6" winner={winner}></InputBox>
          <InputBox onClick={this.handleClick} value={counter} position="7" winner={winner}></InputBox>
          <InputBox onClick={this.handleClick} value={counter} position="8" winner={winner}></InputBox>
        </div>
        <div>
          <h2>Hello</h2>
          <h2>{status}</h2>
        </div>
      </div>
    );
  }
}

export default App;
