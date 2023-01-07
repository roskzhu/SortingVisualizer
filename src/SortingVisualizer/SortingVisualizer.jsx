import React from "react";
// Sorting Algorithms
import { getMergeSortAnimations } from '../sortingAlgorithms/mergeSort.js';
import { getInsertionSortAnimations } from '../sortingAlgorithms/insertionSort.js';
import { getBubbleSortAnimations } from "../sortingAlgorithms/bubbleSort.js";
import { getQuickSortAnimations } from "../sortingAlgorithms/quicksSort.js";
// Styles
import './SortingVisualizer.css';

// Make responsive on all screens
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 2;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = screenWidth/5;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'lightblue';
// const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';
// const SECONDARY_COLOR = 'pink';

let anSpeed = 1; // animation speed *************
if (screenWidth < 700) {
  anSpeed = 3;
}



export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);




    // Util variables *************
    this.animationSpeed = ANIMATION_SPEED_MS;
    this.numberOfBars = screenWidth / 4 - 20;
    this.primaryColor = "pink";
    this.secondaryColor = "red";
    this.barHeight = screenHeight - 100;





    this.state = {
      // this is our main array
      array: [],
    };
  }
  
  // when the app reloads or when the page is visited
  componentDidMount() {
    this.resetArray();
  }

  // generate new array button
  resetArray() {
    // creates array with random numbers
    const array = [];
    // 310 bars of 2 pixels fit the page
    // 310 bars or less depending on screen size
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      // pushes random values into array
      // 730 or less depending on screen size
      array.push(randomIntFromInterval(5, screenHeight - 200));
    }
    // resets state tabs new array
    this.setState({array});
  }

  mergeSort() {
    // Merge sort animations
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {
  // Quick sort animations
  const animations = getQuickSortAnimations(this.state.array);
  for (let i = 0; i < animations.length; i++) {
    const isColorChange =
      animations[i][0] === "comparison1" ||
      animations[i][0] === "comparison2";
    const arrayBars = document.getElementsByClassName("array-bar");
    if (isColorChange === true) {
      const color =
        animations[i][0] === "comparison1"
          ? this.secondaryColor
          : this.primaryColor;
      const [, barOneIndex, barTwoIndex] = animations[i];
      const barOneStyle = arrayBars[barOneIndex].style;
      const barTwoStyle = arrayBars[barTwoIndex].style;
      setTimeout(() => {
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
      }, i * this.animationSpeed);
    } else {
      const [, barIndex, newHeight] = animations[i];
      if (barIndex === -1) {
        continue;
      }
      const barStyle = arrayBars[barIndex].style;
      setTimeout(() => {
        barStyle.height = `${newHeight}px`;
      }, i * this.animationSpeed);
    }
  }


  }

  insertionSort() {
    // Insertion sort animations
    const animations = getInsertionSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const isColorChange =
        animations[i][0] === "comparison1" ||
        animations[i][0] === "comparison2";
      const arrayBars = document.getElementsByClassName("array-bar");
      if (isColorChange === true) {
        const color =
          animations[i][0] === "comparison1"
            ? this.secondaryColor
            : this.primaryColor;
        const [, barOneIndex, barTwoIndex] = animations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.animationSpeed);
      } else {
        const [, barIndex, newHeight] = animations[i];
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * this.animationSpeed);
      }
    }
    
  }

  bubbleSort() {
    // Handles displaying bubble sort animations
    const animations = getBubbleSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const isColorChange =
        animations[i][0] === "comparison1" ||
        animations[i][0] === "comparison2";
      const arrayBars = document.getElementsByClassName("array-bar");
      if (isColorChange) {
        const color =
          animations[i][0] === "comparison1"
            ? this.secondaryColor
            : this.primaryColor;
        const [, barOneIndex, barTwoIndex] = animations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.animationSpeed);
      } else {
        const [, barIndex, newHeight] = animations[i];
        if (barIndex === -1) {
          continue;
        }
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * this.animationSpeed);
      }
    }
  }
   

  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getMergeSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    }
  }

  render() {
    const {array} = this.state;

    return (
      // left position of arrays
      <div className="array-container">
        {/* map values to divs with class array-bar */}
        {array.map((value, idx) => (
          <div 
          className="array-bar" 
          key={idx}
          style={{height: `${value}px`}}>
          </div>
        ))}
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.quickSort()}>Quick Sort</button>
        <button onClick={() => this.insertionSort()}>Insertion Sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>


      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
export function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) return false;
  }
  return true;
} 