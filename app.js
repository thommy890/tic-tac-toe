// Variables to track the game state
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

// Winning combinations
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]            // Diagonals
];

const cells = document.querySelectorAll('.cell');

// Function to handle cell click
function handleCellClick(cell, cellIndex) {
    if (!gameActive || gameState[cellIndex] !== '') {
        return;
    }

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        gameActive = false;
        announceResult(`${currentPlayer} wins!`);
        return;
    }

    if (checkDraw()) {
        gameActive = false;
        announceResult("It's a draw!");
        return;
    }

    cell.style.backgroundColor = currentPlayer === 'X' ? 'blue' : 'red';
    cell.style.color = 'white'; // Set the text color to make it visible on the colored cell

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Function to check for a win
function checkWin() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return true;
        }
    }
    return false;
}

// Function to check for a draw
function checkDraw() {
    return gameState.every(cell => cell !== '');
}

// Function to announce the result
function announceResult(message) {
    const resultMessage = document.querySelector('.result-message');
    resultMessage.textContent = message;
  
    setTimeout(() => {
      resultMessage.textContent = ''; // Clear the result message
      resetGame();
    }, 1500);
  }
  

function resetGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
      cell.textContent = '';
      cell.style.backgroundColor = ''; // Reset background color
      cell.style.color = ''; // Reset text color
    });
  }

// Attach event listeners to cells
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(cell, index));
});

// Attach event listener to the board to reset the game
const board = document.getElementById('board');
board.addEventListener('click', () => {
    if (!gameActive) {
        resetGame();
    }
});

