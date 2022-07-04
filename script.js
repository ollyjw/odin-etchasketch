const container = document.querySelector('.container');
const newDiv = document.createElement("div");
// BTNS
const clearBtn = document.getElementById('clear');
const resizeBtn = document.getElementById('resize');
const randomColorBtn = document.getElementById('random-color');
const eraseBtn = document.getElementById('erase');
const drawBtn = document.getElementById('draw-mode');


// add square divs to square var
const square = document.getElementsByClassName('square');
// create array from square var (all divs with square class)
const squaresArray = Array.from(square);

createGrid(16);

// Create 16x16 grid of divs with square class
function createGrid(gridSize) {
  for (i = 1; i < gridSize * gridSize; i++) {
    // add div with square class to container
    container.appendChild(newDiv);
    newDiv.className = 'square';
    let cloneDiv = newDiv.cloneNode();
    container.appendChild(cloneDiv);
  }
  drawMode();
}

// CLEAR - click clear button and remove bg color
clearBtn.addEventListener('click', e => {
  clearGrid();
})

// Put event listener in a loop / background color in a named function

// ADD DARK GREY INLINE STYLE TO SQUARES
function defaultPen(sqr) {
  sqr.style.backgroundColor = 'rgb(63, 63, 63)';
}

// // CLICK & DRAG to draw
function clickNDrag() {
  for (let i = 0; i < square.length; i++) {
    // REMOVE MOUSEOVER EVENT
    square[i].removeEventListener("mouseover", () => defaultPen(square[i]));
    //REPLACE W/ CLICK & DRAG
    square[i].addEventListener("click", () => defaultPen(square[i]));
  }
  console.log("clickNDrag"); 
}

// DRAW BTN - add active class to itself & activate draw mode
drawBtn.addEventListener('click', e => {
  drawBtn.classList.toggle("btn-active");
  drawMode();
})

// SWITCH BETWEEN MOUSE CLICK & DRAG AND MOUSE OVER
function drawMode() {
  const active = drawBtn.classList.contains('btn-active');

  if (active) { // if draw mode btn contains active class go to click & drag mode  
    clickNDrag();
  } else { // otherwise default to mouseover mode
    console.log("mouseover mode"); 
    for (let i = 0; i < square.length; i++) {
      // ADD MOUSEOVER EVENT
      square[i].addEventListener("mouseover", () => defaultPen(square[i]));
      // REMOVE MOUSEDOWN EVENT
      square[i].removeEventListener("click", () => defaultPen(square[i]));
    }
  }
}

// CLEAR ENTIRE GRID / remove inline bg color for squares
function clearGrid() {
  // const square = document.getElementsByClassName('square');
  const squaresArray = Array.from(square);
  // for each item in the array, add function with new declared parameter of 'sqr' (square)
  squaresArray.forEach(function (sqr) {
    sqr.style.backgroundColor = '';
  });
}

// - if  toggle random or erase btns have btn-active class, clicking eachother should remove the class

// ERASE MODE - click btn & remove / re-add bg color
function toggleErase() {
  const squaresArray = Array.from(square);

  squaresArray.forEach(function (sqr) {

    let active = eraseBtn.classList.contains('btn-active');
    // if btn has 'active' class remove style, else use default color
    if (active) {
      randomColorBtn.classList.remove("btn-active");
      // drawBtn.classList.remove("btn-active");
      sqr.addEventListener('mouseover', e => {
        sqr.style.backgroundColor = '';
      })
    } else {
      sqr.addEventListener('mouseover', e => {
        sqr.style.backgroundColor = 'rgb(63, 63, 63)';
      })
    }
  });
}

// ERASE BTN activates toggle erase function and adds active class to itself
eraseBtn.addEventListener("click", e => {
  eraseBtn.classList.toggle("btn-active");
  toggleErase();
})

// generate random number for each rgb values
function randomColor() {
  // create empty color array
  let color = [];
  // create 3 random numbers (timesed by 256 for max rgb values) & place in array
  for (i = 0; i < 3; i++) {
    color[i] = (Math.floor(Math.random() * 256));
  }
  // take each item from color array and put into rgb css property
  const rgb = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;

  return rgb;
}

// - RANDOM COLOR BTN
randomColorBtn.addEventListener("click", () => {
  randomColorBtn.classList.toggle("btn-active");
  const square = document.getElementsByClassName('square');
  const squaresArray = Array.from(square);
  squaresArray.forEach(function (sqr) {

    let active = randomColorBtn.classList.contains('btn-active');
    // if btn has 'active' class remove style, else use default color
    if (active) {
      eraseBtn.classList.remove("btn-active");
      sqr.addEventListener('mouseover', e => {
        sqr.style.backgroundColor = randomColor();
      })
    } else {
      sqr.addEventListener('mouseover', e => {
        sqr.style.backgroundColor = 'rgb(63, 63, 63)';
      })
    }
  });
});

// DARKEN / LIGHTEN INK

// higher numbers closer to white (255) lower numbers closer to black (0)




// REMOVE OLD GRID - Deletes default / previous iteration of grid so that the resize btn doesnt add new one onto it
function removeOldGrid() {
  const squaresArray = Array.from(square);
  squaresArray.forEach(function (sqr) {
    sqr.remove();
  });
}

// RESIZE BTN - clicking resize button prompts you for a new grid number of squares per side - set max no. to 100
resizeBtn.addEventListener("click", e => {
  let newGridSize = prompt("How many squares per side? Please enter number between 1 & 100");
  // parseInt() function parses a string argument and returns an integer or NaN
  let newGridSizeInt = parseInt(newGridSize);

  // while nums arent between 1 & 100 keep prompting
  while (newGridSizeInt < 1 || newGridSizeInt > 100) {
    newGridSize = prompt("How many squares per side? Please enter number between 1 & 100");
    newGridSizeInt = parseInt(newGridSize);
  }

  // NEED to change css property 'grid-template-columns' to change columns according to user input
  container.style.gridTemplateColumns = `repeat(${newGridSizeInt}, auto)`;
  // changed auto to 1fr because it produced uneven rows
  container.style.gridTemplateRows = `repeat(${newGridSizeInt}, 1fr)`;

  clearGrid();
  removeOldGrid();
  createGrid(newGridSizeInt);
  drawMode();
})

resizeBtn.addEventListener("mousedown", e => {
  resizeBtn.classList.toggle("btn-active");
})
resizeBtn.addEventListener("mouseup", e => {
  resizeBtn.classList.toggle("btn-active");
})
clearBtn.addEventListener("mousedown", e => {
  clearBtn.classList.toggle("btn-active");
})
clearBtn.addEventListener("mouseup", e => {
  clearBtn.classList.toggle("btn-active");
})

// NOTES TO SELF

// To add
// - darker color ink
// - lighten color ink
// - make a btn to switch between mouseover & click n drag
// - clicking cancel on resize prompt deletes grid...
// - reduce lines by moving square variable declarations to global without breaking ?

// - removeeventlistener anonymous function
// - https://stackoverflow.com/questions/4950115/removeeventlistener-on-anonymous-functions-in-javascript

// https://stackoverflow.com/questions/32027935/addeventlistener-is-not-a-function-why-does-this-error-occur

// https://gomakethings.com/named-vs-anonymous-event-listener-functions/



// OLD
// --------------------------------------
// HOVER EFFECT - on mouseover add inline style to each item (div with square class)
// function mouseOver() {
//   // add square divs to square var
//   const square = document.getElementsByClassName('square');
//   // create array from square var (all divs with square class)
//   const squaresArray = Array.from(square);

//   // for each item in the array, add function with new declared parameter of 'sqr' (square)
//   squaresArray.forEach(function(sqr) {
//     // PUT THIS ANON FUNCTION INTO NAMED FUNCTION
//     sqr.addEventListener('mouseover', e => {
//       sqr.style.backgroundColor = 'rgb(63, 63, 63)';
//     })
//   })
// }

// call here so it runs by default
// mouseOver();