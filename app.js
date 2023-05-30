// Define variables for the game board and message display
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');

// Define variables for the game state
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameWon = false;
let winner = '';

// Define functions to check for a win or draw
function checkWin() {
	const winPatterns = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];
	for (let pattern of winPatterns) {
		if (gameBoard[pattern[0]] === currentPlayer &&
			gameBoard[pattern[1]] === currentPlayer &&
			gameBoard[pattern[2]] === currentPlayer) {
			gameWon = true;
			winner = currentPlayer;
			break;
		}
	}
	if (gameWon) {
		message.textContent = `${winner} wins!`;
	} else if (!gameBoard.includes('')) {
		message.textContent = 'Draw!';
	}
}

// Add an event listener to each cell
cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

// Event listener function for cell clicks
function handleCellClick(event) {
  // Get the clicked cell and its index in the game board
  const clickedCell = event.target;
  const cellIndex = Array.from(cells).indexOf(clickedCell);

  // Check if the clicked cell is already marked or if the game has already ended
  if (gameBoard[cellIndex] || gameWon) {
    return;
  }

  // Mark the clicked cell with the current player's symbol
  clickedCell.textContent = currentPlayer;
  gameBoard[cellIndex] = currentPlayer;

  // Check for a win or draw
  checkWin();

  if (!gameWon) {
    // Switch to the other player's turn
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `${currentPlayer}'s turn`;
  }
}

