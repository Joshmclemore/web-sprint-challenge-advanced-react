import React from 'react'
import axios from 'axios';

const URL = 'http://localhost:9000/api/result';

const initialState = {
  x: 2,
  y: 2,
  steps: 0,
  errorMessage: "",
  successMessage: "",
  email: "",
  grid: [
    null, null, null,
    null, "B", null,
    null, null, null ],
}


// built a component that maps and wrap that component in didupdate


// class Squares extends React.Component {
//   state = initialState

//   render(){
//     debugger
//     return (
      
//       this.state.grid.map(location => {
//         if(location === "B") {
//           return <div className='square active'>B</div>
//         } else {
//           return <div className='square'></div>
//         }
//       })

//     )
//   }
// }



export default class AppClass extends React.Component {

  state = initialState;


  newArray = () => { 
    if(this.state.x === 1 && this.state.y === 1) {return ["B", null, null, null, null, null, null, null, null]}
    else if(this.state.x === 2 && this.state.y === 1) {return [null, "B", null, null, null, null, null, null, null]}
    else if(this.state.x === 3 && this.state.y === 1) {return [null, null, "B", null, null, null, null, null, null]}
    else if(this.state.x === 1 && this.state.y === 2) {return [null, null, null, "B", null, null, null, null, null]}
    else if(this.state.x === 2 && this.state.y === 2) {return [null, null, null, null, "B", null, null, null, null]}
    else if(this.state.x === 3 && this.state.y === 2) {return [null, null, null, null, null, "B", null, null, null]}
    else if(this.state.x === 1 && this.state.y === 3) {return [null, null, null, null, null, null, "B", null, null]}
    else if(this.state.x === 2 && this.state.y === 3) {return [null, null, null, null, null, null, null, "B", null]}
    else if(this.state.x === 3 && this.state.y === 3) {return [null, null, null, null, null, null, null, null, "B"]}
    else {return "not found"}
  }

componentDidUpdate(prevProps, prevState){
  if (prevState.x !== this.state.x || prevState.y !== this.state.y) {
    this.setState({...this.state, grid: this.newArray()})
    // console.log('Old grid:', prevState.grid, 'New grid', this.state.grid)
  } else {
    console.log('up to date')
  }
}

  moveRight = () => {

    let xCounter = this.state.x + 1;
    let stepsCounter = this.state.steps + 1;
    // let emptyGrid = [null, null, null, null, null, null, null, null, null]
  

    if(this.state.x < 3){
      this.setState({...this.state, x: xCounter, steps: stepsCounter, errorMessage: "", successMessage: ""})}
    else {
      this.setState({...this.state, successMessage: "", errorMessage: "You can't go right"})
    }
  }

  moveLeft = () => {

    let xCounter = this.state.x - 1;
    let stepsCounter = this.state.steps + 1;

    if(this.state.x > 1){
      this.setState({...this.state, x: xCounter, steps: stepsCounter, errorMessage: "", successMessage: ""})}
    else {
      this.setState({...this.state, successMessage:"" ,errorMessage: "You can't go left"})
    }
  }

  moveDown = () => {

    let yCounter = this.state.y + 1;
    let stepsCounter = this.state.steps + 1;

    if(this.state.y < 3){
      this.setState({...this.state, y: yCounter, steps: stepsCounter, errorMessage: "", successMessage: ""})}
    else {
      this.setState({...this.state, successMessage: "" ,errorMessage: "You can't go down"})
    }
  }

  moveUp = () => {

    let yCounter = this.state.y - 1;
    let stepsCounter = this.state.steps + 1;
    
    if(this.state.y > 1){
      this.setState({...this.state, y: yCounter, steps: stepsCounter, errorMessage: "", successMessage: ""})}
    else {
      this.setState({...this.state, successMessage:"" ,errorMessage: "You can't go up"})
    }
  }
 
  reset = () => {
    this.setState(initialState)
  }

  changeInput = (evt) => {
    const { key, value } = evt.target
    this.setState({
      ...this.state,
      email: evt.target.value 
    })
  }

  onSubmit = (e) => {
    const newInfo = {
      "x": this.state.x,
      "y": this.state.y,
      "steps": this.state.steps,
      "email": this.state.email,
    }
    e.preventDefault()
    axios.post(URL, newInfo)
    .then(res => {
      console.log(res)
      this.setState({
        ...this.state,
        errorMessage: "",
        successMessage: [...this.state.successMessage, res.data.message]
      })
    })
    .catch(err => { console.log(err)
      this.setState({
        ...this.state,
        successMessage: "",
        errorMessage: err.response.data.message
      })
    })
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
          { this.state.grid.map(location => {
            if(location === "B") {
              return <div className='square active'>B</div>
            } else {
              return <div className='square'></div>
            }
            })
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.errorMessage}{this.state.successMessage}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={() => this.moveLeft()}>LEFT</button>
          <button id="up"onClick={() => this.moveUp()}>UP</button>
          <button id="right" onClick={() => this.moveRight()}>RIGHT</button>
          <button id="down"onClick={() => this.moveDown()}>DOWN</button>
          <button id="reset" onClick={() => this.reset()}>reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input id="email" type="email" onChange={this.changeInput} placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
