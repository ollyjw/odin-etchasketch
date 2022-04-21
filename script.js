const container = document.querySelector('.container');
const newDiv = document.createElement("div");
// BTNS
const clearBtn = document.getElementById('clear');
const resizeBtn = document.getElementById('resize');
const randomColorBtn = document.getElementById('random-color');
const eraseBtn = document.getElementById('erase');
const drawBtn = document.getElementById('draw-mode');


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
}

// CLEAR - click clear button and remove bg color
clearBtn.addEventListener('click', e => {
  clearGrid();
})

// HOVER EFFECT - on mouseover add inline style to each item (div with square class)
function mouseOver() {
  // add square divs to square var
  const square = document.getElementsByClassName('square');
  // create array from square var (all divs with square class)
  const squaresArray = Array.from(square);

  // for each item in the array, add function with new declared parameter of 'sqr' (square)
  squaresArray.forEach(function(sqr) {
    sqr.addEventListener('mouseover', e => {
      sqr.style.backgroundColor = 'rgb(63, 63, 63)';
    })
  })
}

// call here so it runs by default
mouseOver();

// CLICK & DRAG to draw
function clickNDrag() {
  const square = document.getElementsByClassName('square');
  const squaresArray = Array.from(square);
  squaresArray.forEach(function(sqr) {
    sqr.removeEventListener('mouseover', mouseOver);
    
    sqr.addEventListener('mousedown', e => {
      sqr.style.backgroundColor = 'rgb(63, 63, 63)';
    })
  })
}

drawBtn.addEventListener('click', e => {
  drawBtn.classList.toggle("btn-active");
  drawMode();
})

// SWITCH BETWEEN MOUSE CLICK & DRAG AND MOUSE OVER
function drawMode() {
  let active = drawBtn.classList.contains('btn-active');

  const square = document.getElementsByClassName('square');
  const squaresArray = Array.from(square);

  squaresArray.forEach(function(sqr) {

    if (active) { // if draw button toggled to active go to click & drag mode      
      sqr.removeEventListener('mouseover', mouseOver, false);
      clickNDrag();
    } else { // else mouseover mode
        mouseOver();
    }
  })
}

// CLEAR ENTIRE GRID / remove inline bg color for squares
function clearGrid() {
  const square = document.getElementsByClassName('square');
  const squaresArray = Array.from(square);

  squaresArray.forEach(function (sqr) {
    sqr.style.backgroundColor = '';
  });
}

// - if  toggle random or erase btns have btn-active class, clicking eachother should remove the class

// ERASE MODE - click btn & remove / re-add bg color
function toggleErase() {
  const square = document.getElementsByClassName('square');
  const squaresArray = Array.from(square);

  squaresArray.forEach(function (sqr) {

    let active = eraseBtn.classList.contains('btn-active');
    // if btn has 'active' class remove style, else use default color
    if (active) {
      randomColorBtn.classList.remove("btn-active");
      drawBtn.classList.remove("btn-active");
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
  const square = document.getElementsByClassName('square');
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