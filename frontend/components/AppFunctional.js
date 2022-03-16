import React, { useState, useEffect } from 'react';
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

export default function AppFunctional(props) {

  const [state, setState] = useState(initialState)

  const newArray = () => { 
    if(state.x === 1 && state.y === 1) {return ["B", null, null, null, null, null, null, null, null]}
    else if(state.x === 2 && state.y === 1) {return [null, "B", null, null, null, null, null, null, null]}
    else if(state.x === 3 && state.y === 1) {return [null, null, "B", null, null, null, null, null, null]}
    else if(state.x === 1 && state.y === 2) {return [null, null, null, "B", null, null, null, null, null]}
    else if(state.x === 2 && state.y === 2) {return [null, null, null, null, "B", null, null, null, null]}
    else if(state.x === 3 && state.y === 2) {return [null, null, null, null, null, "B", null, null, null]}
    else if(state.x === 1 && state.y === 3) {return [null, null, null, null, null, null, "B", null, null]}
    else if(state.x === 2 && state.y === 3) {return [null, null, null, null, null, null, null, "B", null]}
    else if(state.x === 3 && state.y === 3) {return [null, null, null, null, null, null, null, null, "B"]}
    else {return "not found"}
  }

  useEffect(() => setState({...state, grid: newArray()}), [state.x, state.y])

  const moveRight = () => {
    let xCounter = state.x + 1;
    let stepsCounter = state.steps + 1;

    if(state.x < 3){
      setState({...state, x: xCounter, steps: stepsCounter, errorMessage: "", successMessage:""})}
    else {
      setState({...state, successMessage:"" ,errorMessage: "You can't go right"})
    }
  }

  const moveLeft = () => {

    let xCounter = state.x - 1;
    let stepsCounter = state.steps + 1;

    if(state.x > 1){
      setState({...state, x: xCounter, steps: stepsCounter, errorMessage: "", successMessage:""})}
    else {
      setState({...state, successMessage:"" ,errorMessage: "You can't go left"})
    }
  }

  const moveDown = () => {

    let yCounter = state.y + 1;
    let stepsCounter = state.steps + 1;

    if(state.y < 3){
      setState({...state, y: yCounter, steps: stepsCounter, errorMessage: "", successMessage:""})}
    else {
      setState({...state, successMessage:"" ,errorMessage: "You can't go down"})
    }
  }

  const moveUp = () => {

    let yCounter = state.y - 1;
    let stepsCounter = state.steps + 1;
    
    if(state.y > 1){
      setState({...state, y: yCounter, steps: stepsCounter, errorMessage: "", successMessage:""})}
    else {
      setState({...state, successMessage:"" ,errorMessage: "You can't go up"})
    }
  }

  const reset = () => {
    setState(initialState)
  }


  const changeInput = (evt) => {
    const { key, value } = evt.target
    setState({
      ...state,
      email: value 
    })
  }

  const onSubmit = (e) => {
    const newInfo = {
      "x": state.x,
      "y": state.y,
      "steps": state.steps,
      "email": state.email,
    }
    e.preventDefault()
    // console.log(newInfo)
    axios.post(URL, newInfo)
    .then(res => {
      console.log(res)
      setState({
        ...state,
        errorMessage: "",
        successMessage: [...state.successMessage, res.data.message]
      })
    })
    .catch(err => { console.log(err)
      setState({
        ...state,
        successMessage: "",
        errorMessage: err.response.data.message
      })
    })
  }

  /* ex. of newInfo: {x: 2, y: 1, steps: 1, email: 'bad@email'} */




  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({state.x}, {state.y})</h3>
        <h3 id="steps">You moved {state.steps} times</h3>
      </div>
      <div id="grid">
      { state.grid.map(location => {
            if(location === "B") {
              return <div className='square active'>B</div>
            } else {
              return <div className='square'></div>}})
      }
      </div>
      <div className="info">
      <h3 id="message">{state.errorMessage}{state.successMessage}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={() => moveLeft()}>LEFT</button>
        <button id="up"onClick={() => moveUp()}>UP</button>
          <button id="right" onClick={() => moveRight()}>RIGHT</button>
          <button id="down"onClick={() => moveDown()}>DOWN</button>
          <button id="reset" onClick={() => reset()}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
          <input id="email" type="email" onChange={changeInput} placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
    </div>
  )
}
