const container = document.querySelector('.container');
const newDiv = document.createElement("div");
let gridSize = 16;

const clearBtn = document.getElementById('clear');
const resizeBtn = document.getElementById('resize');


// Create 16x16 grid of divs with square class
function createGrid() {

  // container.style.gridTemplateColumns = `repeat(${userSelection, 1fr})`;
  // container.style.gridTemplateRows = `repeat(${userSelection, 1fr})`;
  
  for (i = 1; i < gridSize * gridSize; i++) {
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
  squaresArray.forEach(function(sqr) {

    // Hover effect - grid adds bg color class as mouse passes over
    sqr.addEventListener('mouseenter', e => {
      sqr.classList.add("bg-dark-grey");
    })

    // click a clear button and it clears the current grid - think i wanna put this in a function of its own so I can use it on the resize button too?

    // - click clear button and remove class
    clearBtn.addEventListener('click', e => {
      sqr.classList.remove("bg-dark-grey");
    })


  });
}

createGrid();
