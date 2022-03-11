import React from 'react'
import axios from 'axios';

const URL = 'http://localhost:9000/api/result';

const initialState = {
  x: 2,
  y: 2,
  matrix: [
    [0,0,0],
    [0,1,0],
    [0,0,0],
  ],
  steps: 0,
  errorMessage: ""
}

// { "x": 1, "y": 2, "steps": 3, "email": "lady@gaga.com" }

export default class AppClass extends React.Component {

  state = initialState;

  moveRight = () => {

    let xCounter = this.state.x + 1;
    let stepsCounter = this.state.steps + 1;

    if(this.state.x < 3){
      this.setState({...this.state, x: xCounter, steps: stepsCounter})}
    else {
      this.setState({...this.state, errorMessage: "You can't go right"})
    }
  }

  moveLeft = () => {

    let xCounter = this.state.x - 1;
    let stepsCounter = this.state.steps + 1;

    if(this.state.x > 1){
      this.setState({...this.state, x: xCounter, steps: stepsCounter})}
    else {
      this.setState({...this.state, errorMessage: "You can't go left"})
    }
  }

  moveUp = () => {

    let yCounter = this.state.y + 1;
    let stepsCounter = this.state.steps + 1;

    if(this.state.y < 3){
      this.setState({...this.state, y: yCounter, steps: stepsCounter})}
    else {
      this.setState({...this.state, errorMessage: "You can't go up"})
    }
  }

  moveDown = () => {

    let yCounter = this.state.y - 1;
    let stepsCounter = this.state.steps + 1;

    if(this.state.y > 1){
      this.setState({...this.state, y: yCounter, steps: stepsCounter})}
    else {
      this.setState({...this.state, errorMessage: "You can't go down"})
    }
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.x}, {this.state.y})</h3>
          <h3 id="steps">You moved {this.state.steps} times</h3>
        </div>
        <div id="grid">
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square active">B</div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
        </div>
        <div className="info">
          <h3 id="message">{this.state.errorMessage}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={() => this.moveLeft()}>LEFT</button>
          <button id="up"onClick={() => this.moveUp()}>UP</button>
          <button id="right" onClick={() => this.moveRight()}>RIGHT</button>
          <button id="down"onClick={() => this.moveDown()}>DOWN</button>
          <button id="reset">reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
