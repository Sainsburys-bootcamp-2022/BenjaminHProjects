// Make your changes to store and update game state in this file
let board = [[null, null, null],
             [null, null, null],
             [null, null, null]]

let gameOver = false
let winner = ""



let player1Turn = true
// const noughtsOrCrosses = Math.floor(Math.random() * 2)

function getNewBoard() {
    return [[null, null, null], 
            [null, null, null], 
            [null, null, null]];
}
// Take the row and column number between 0 and 2
// (inclusive) and update the game state.
function takeTurn(row, column) {
    console.log("takeTurn was called with row: " + row + ", column:" + column);
    console.log(`takeTurn was called with row: ${row}, column: ${column}`);
    let currentSquare = board[row][column]

    if (currentSquare === null && player1Turn) {
        board[row][column] = "nought"
        player1Turn = false
    } else if (currentSquare === null) {
        board[row][column] = "cross"
        player1Turn = true
    } else {
        console.log("Try another square!")
    }
    console.log(board)
}



// Return either "noughts", "crosses" or "nobody" if the game is over.
// Otherwise return null to continue playing.
function checkWinner() {
    console.log("checkWinner was called");

    checkHorizontal()
    checkVertical()
    checkDiagonalV2()
    checkFullBoard()
    console.log("this is the horizontal function: ", checkHorizontal())
    console.log("this is the vertical function: ", checkVertical())
    console.log("this is the diagonal function: ", checkDiagonalV2())

    if (gameOver == true) {
        if (checkHorizontal() == "noughts" || checkVertical() == "noughts" || checkDiagonalV2() == "noughts") {
            return "noughts"
        } else if (checkHorizontal() == "crosses" || checkVertical() == "crosses" || checkDiagonalV2() == "crosses") {
            return "crosses"
        } else if (checkFullBoard) {
            return "nobody"
        }
    } else {
        return null
    }
}


// checks for horizontal
function checkHorizontal() {
    
    for (let row = 0; row < 3;row++) {
        let noughtCheckScore = 0
        let crossCheckScore = 0
        
        for (let column = 0; column < 3; column++) {
            if (board[row][column] == "nought") {
                noughtCheckScore += 1
            } else if (board[row][column] == "cross") {
                crossCheckScore += 1
            }
            if (noughtCheckScore == 3) {
                gameOver = true
                return "noughts"
            } else if (crossCheckScore == 3) { 
                gameOver = true
                return "crosses"
            }
        }
    }
}



// checks for vertical
function checkVertical() {
    for (let row = 0; row < 3; row++) {
        let noughtCheckScore = 0
        let crossCheckScore = 0
        for (let column = 0; column < 3; column++) {
            
            if (board[column][row] == "nought") {
                noughtCheckScore += 1
            } else if (board[column][row] == "cross") {
                crossCheckScore += 1
            }
            if (noughtCheckScore == 3) {
                gameOver = true
                return "noughts"
            } else if (crossCheckScore == 3) { 
                gameOver = true
                return "crosses"
            }
        }
    }
}


function checkDiagonalV2() {
    let mergedBoard = [].concat.apply([], board)
    let leftDiagonal = [mergedBoard[0], mergedBoard[4],mergedBoard[8]]
    console.log(leftDiagonal)
    let rightDiagonal = [mergedBoard[2], mergedBoard[4], mergedBoard[6]]
    console.log(rightDiagonal)
    if (mergedBoard[4] === "nought" && (allAreEqual(leftDiagonal) || allAreEqual(rightDiagonal))) {
        console.log("Left DIag:" + leftDiagonal)
        console.log("RIght Diag:" + rightDiagonal)
        console.log("nouhgts wins")
        gameOver = true
        return "noughts"
    } else if (mergedBoard[4] === "cross" && (allAreEqual(leftDiagonal) || allAreEqual(rightDiagonal))) {
        console.log("crosses wins")
        gameOver = true
        return "crosses"
    }
}

function allAreEqual(array) {
    const result = array.every(element => {
      if (element === null) {
            return false
      } else if (element === array[0]) {
            return true
      }
    });
    console.log("This is the result:" + result )
    return result;
}

// // checks for diagonal
// function checkDiagonal() {
//     let noughtCheckScore = 0
//     let crossCheckScore = 0
//     for (let coordinate = 0; coordinate < 3; coordinate++) {
//         if (board[coordinate][coordinate] == "nought" || board[coordinate][2-coordinate] == "nought") {
//             noughtCheckScore += 1
//         } else if (board[coordinate][coordinate] == "cross" || board[coordinate][2-coordinate]) {
//             crossCheckScore += 1
//         }
//         if (noughtCheckScore == 3) {
//             gameOver = true
//             return "noughts"
//         } else if (crossCheckScore == 3) { 
//             gameOver = true
//             return "crosses"
//         }
//     }
// }




//checks for draw
function checkFullBoard() {
    let mergedBoard = [].concat.apply([], board)
    console.log(mergedBoard)
    let boardSpace = 0
    mergedBoard.forEach(element => {
        if (element != null) {
            boardSpace += 1
        } 
        if (boardSpace == 9)
            gameOver = true
            return true
    });
}
    

    
// Set the game state back to its original state to play another game.
function resetGame() {
    console.log("resetGame was called");
    board = getNewBoard()
    mergedBoard = getNewBoard()
    gameOver = false
    player1Turn = true
    

}

// Return the current board state with either a "nought" or a "cross" in
// each position. Put a null in a position that hasn't been played yet.
function getBoard() {
    console.log("getBoard was called");
    return board;
}

if (typeof exports === 'object') {
    console.log("Running in Node")
    // Node. Does not work with strict CommonJS, but only CommonJS-like
    // environments that support module.exports, like Node.
    module.exports = {
        takeTurn,
        checkWinner,
        resetGame,
        getBoard,
    }
} else {
    console.log("Running in Browser")
}

