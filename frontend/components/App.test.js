import AppClass from './AppClass';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})

beforeEach(() => {
  render(<AppClass />)
})


// - Test that the visible texts in headings, buttons, links... render on the screen.
test('heading, buttons, and links render to the screen', () => {
  const coordinates = document.querySelector('#coordinates')
  const up = document.querySelector('#up')
  const down = document.querySelector('#down')
  const left = document.querySelector('#left')
  const right = document.querySelector('#right')
  expect(coordinates).toBeInTheDocument();
  expect(up).toBeInTheDocument();
  expect(down).toBeInTheDocument();
  expect(left).toBeInTheDocument();
  expect(right).toBeInTheDocument();
})
// - Test that typing on the input results in its value changing to the entered text.
test('typing in the input changes its value', () => {
  const input = document.querySelector('#email')
  fireEvent.change(input, { target: { value: 'test' } })
  expect(input).toHaveValue('test');
})

test('clicking on buttons shows the proper coordinates', () => {
  const up = document.querySelector('#up')
  const down = document.querySelector('#down')
  const left = document.querySelector('#left')
  const right = document.querySelector('#right')
  const coordinates = document.querySelector('#coordinates')
  fireEvent.click(up)
  fireEvent.click(right)
  fireEvent.click(down)
  fireEvent.click(down)
  fireEvent.click(left)
  expect(coordinates).toHaveTextContent('Coordinates (2, 3)')
})

test('reset sets coordinates to (2,2) and steps to 0', () => {
  const up = document.querySelector('#up')
  const right = document.querySelector('#right')
  const coordinates = document.querySelector('#coordinates')
  const steps = document.querySelector('#steps')
  const resetButton = document.querySelector('#reset')
  fireEvent.click(up)
  fireEvent.click(right)
  fireEvent.click(resetButton)
  expect(coordinates).toHaveTextContent('Coordinates (2, 2)')
  expect(steps).toHaveTextContent('0')
})

test('step counter will not increase beyond set limits', () => {
  const up = document.querySelector('#up')
  const right = document.querySelector('#right')
  const input = document.querySelector('#email')
  const steps = document.querySelector('#steps')
  fireEvent.click(up)
  fireEvent.click(up)
  fireEvent.click(up)
  fireEvent.click(up)
  fireEvent.click(right)
  fireEvent.click(right)
  fireEvent.click(right)
  fireEvent.click(right)
  expect(steps).toHaveTextContent('You moved 2 times')
})