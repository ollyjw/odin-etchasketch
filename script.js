const container = document.querySelector('.container');
const newDiv = document.createElement("div");

const clearBtn = document.getElementById('clear');
const resizeBtn = document.getElementById('resize');
const randomColorBtn = document.getElementById('random-color');
const eraseBtn = document.getElementById('erase');


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

  // add square divs to square var
  const square = document.getElementsByClassName('square');
  // create array from square var (all divs with square class)
  const squaresArray = Array.from(square);

  // for each item in the array, add function with new declared parameter of 'sqr' (square)
  squaresArray.forEach(function (sqr) {
    // Hover effect - grid adds bg color class to each item (div with square class) as mouse passes over
    sqr.addEventListener('mouseenter', e => {
      sqr.classList.add("bg-dark-grey");
    })
  });

  // - click clear button and remove bg color class
  clearBtn.addEventListener('click', e => {
    clearGrid();
  })

}

// clears entire grid / remove dark grey bg color for squares
function clearGrid() {
  const square = document.getElementsByClassName('square');
  const squaresArray = Array.from(square);

  squaresArray.forEach(function (sqr) {
    sqr.classList.remove("bg-dark-grey");
  });
}

// erase mode - click btn & remove / re-add bg color classes on mouseclick/mouseover
function toggleErase() {
  const square = document.getElementsByClassName('square');
  const squaresArray = Array.from(square);

  squaresArray.forEach(function (sqr) {
    // Hover effect - grid adds bg color class to each item (div with square class) as mouse passes over
    sqr.addEventListener('mouseenter', e => {
      sqr.classList.toggle("bg-dark-grey");
    })
  });
}


eraseBtn.addEventListener("click", e => {
  toggleErase();
})



// Deletes default / previous iteration of grid so that the resize btn doesnt add new one onto it
function removeOldGrid() {
    // add square divs to square var
    const square = document.getElementsByClassName('square');
    // create array from square var (all divs with square class)
    const squaresArray = Array.from(square);
    squaresArray.forEach(function (sqr) {
      sqr.remove();
    });
}

// clicking  resize button prompts you for a new grid number of squares per side - set max no. to 100

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

  removeOldGrid();
  clearGrid();
  removeOldGrid();
  createGrid(newGridSizeInt);

})

// NOTES TO SELF

// To add 
// - darker color ink - left click
// - lighten color ink - right click
// - random color - take rgb CSS property and generate random number for each value
// - erase mode - click btn & remove classes on mouseclick/mouseover
// - instead of mouseover make it so you have to click to draw
// - mb make a btn to switch between mouseover & click
