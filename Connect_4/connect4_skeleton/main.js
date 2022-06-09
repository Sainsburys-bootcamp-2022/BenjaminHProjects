let boardLayout = [[null, null, null, null, null, null, null], 
                   [null, null, null, null, null, null, null],
                   [null, null, null, null, null, null, null],
                   [null, null, null, null, null, null, null],
                   [null, null, null, null, null, null, null],
                   [null, null, null, null, null, null, null]];
let player1Turn = true
let gameOver = false
const player1 = document.getElementById("player1-counter")
const player2 = document.getElementById("player2-counter")


function getBoard() {
    console.log("getBoard was called")
    return boardLayout
}


function getNewBoard() {
        return [[null, null, null, null, null, null, null], 
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null]]
}


function getBoard() {
    console.log("getBoard was called");
    return boardLayout;
}


document.getElementById("reset-button").addEventListener("click", resetGame)
function resetGame() {
    console.log("resetGame was called");
    boardLayout = getNewBoard()
    console.table(boardLayout)
    gameOver = false
    player1Turn = true
    window.location.reload()
}


function fallCheck(counter, row, column) {
    console.log("fallCheck was called")
    for (let index = 5; index < 6; index--) {
        if (boardLayout[index][column] === null) {
            return boardLayout[index][column] = counter
        }
    }
}


player1.setAttribute("draggable", true)
function takeTurn(row, column) {
    console.log("takeTurn was called with row: " + row + ", column:" + column);
    console.log(`takeTurn was called with row: ${row}, column: ${column}`);
    let currentSquare = boardLayout[row][column]
        if (player1Turn && currentSquare === null) {
            const yellowCounter = "player1"
            fallCheck(yellowCounter, row, column)
            player2.setAttribute("draggable", true)
            player1.setAttribute("draggable", false)
            player1Turn = false
        } else if (currentSquare === null) {
            const redCounter = "player2"
            fallCheck(redCounter, row, column)
            // boardLayout[row][column] = "player2"
            player2.setAttribute("draggable", false)
            player1.setAttribute("draggable", true)
            player1Turn = true
        } else {
            console.log("Try another square!")
        }
    console.table(boardLayout)
}


function positionDrop(rowIndex, columnIndex, event) {
    takeTurn(rowIndex, columnIndex);
    const board = getBoard();
    drawBoard(board);
    const winner = checkWinner(rowIndex, columnIndex);
    if (winner) {
        player2.setAttribute("draggable", false)
        player1.setAttribute("draggable", false)
        const winnerName = document.getElementById("winner-name");
        winnerName.innerText = winner;
        const winnerDisplay = document.getElementById("winner-display");
        winnerDisplay.style.display = "block";
    }
}


for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
    for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
        const gridPosition = document.getElementById(`row-${rowIndex}-column-${columnIndex}`);
        gridPosition.addEventListener("drop", positionDrop.bind(null, rowIndex, columnIndex));
    }
}

function drawBoard(board) {
    console.log("drawBoard was called")
    clearBoard();
    for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
        for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
            if (!board[rowIndex][columnIndex]) {
                continue;
            }
            const cellText = board[rowIndex][columnIndex] === "player1" ? "🟡" : "🔴";
            document.getElementById(`row-${rowIndex}-column-${columnIndex}`).innerText = cellText;
        }
    }
}


function clearBoard() {
    console.log("clearBoard was called")
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
        for (let columnIndex = 0; columnIndex < 3; columnIndex++) {
            document.getElementById(`row-${rowIndex}-column-${columnIndex}`).innerHTML = ""
        }
    }
}


function checkWinner(row, column) {
    console.log("checkWinner was called")
    checkHorizontal()
    checkVertical()
    checkDiagonal()
    checkFullBoard()
    console.log("this is the horizontal function: ", checkHorizontal())
    console.log("this is the vertical function: ", checkVertical())
    console.log("this is the diagonal function: ", checkDiagonal())

    if (gameOver == true) {
        if ((checkHorizontal() || checkVertical() || checkDiagonal()) == "player1") {
            console.log("player1 wins")
            return "player1"
        } else if ((checkHorizontal() || checkVertical() || checkDiagonalV2()) == "player2") {
            console.log("player2 wins")
            return "player2"
        } else if (checkFullBoard) {
            return "nobody"
        }
    } else {
        return null
    }
}

function checkHorizontal() {
    console.log("checkHorizontal was called")
    for (let row = 0; row < 6; row++) {
        for (let start = 0; start < 4; start++) {
            let end = start + 4
            let testArray = boardLayout[row].slice(start, end)
            console.log(testArray)
            let connect4 = allAreEqual(testArray, start)
            if (connect4 === true && testArray[0] === "player1") {
                gameOver = true
                return "player1"
            } else if (connect4 === true && testArray[0] === "player2") {
                gameOver = true
                return "player2"
            }
        }
    }
}

function checkVertical() {
    console.log("checkVertical was called")
    for (column = 0; column<3 ; column++ ){
        for (row = 0; row<6; row++){
            if (boardLayout[column][row] == "player1" && boardLayout[column+1][row] == "player1" && boardLayout[column+2][row] == "player1" && boardLayout[column+3][row] == "player1"){
                console.log("Player1 wins")
                gameOver = true
                return "player1";
            } else if (boardLayout[column][row] == "player2" && boardLayout[column+1][row] == "player2" && boardLayout[column+2][row] == "player2" && boardLayout[column+3][row] == "player2") {
                    gameOver = true
                    return "player2";
            }         
        }
    }
}

function checkDiagonal() {
    console.log("checkDiagonal was called")
    for (columnAsc=3; columnAsc<7; columnAsc++){
        for (rowAsc=0; rowAsc<6; rowAsc++){
            if (this.board[columnAsc][rowAsc] == "player1" && this.board[columnAsc-1][rowAsc+1] == "player1" && this.board[columnAsc-2][rowAsc+2] == "player1" && this.board[columnAsc-3][rowAsc+3] == "player1") {
                gameOver=true
                return "player1";
            } else if (this.board[columnAsc][rowAsc] == "player2" && this.board[columnAsc-1][rowAsc+1] == "player2" && this.board[columnAsc-2][rowAsc+2] == "player2" && this.board[columnAsc-3][rowAsc+3] == "player2") {
                gameOver=true
                return "player2";
            }
        }
    }
    for (i=3; i<7; i++){
        for (j=3; j<6; j++){
            if (this.board[i][j] == "player1" && this.board[i-1][j-1] == "player1" && this.board[i-2][j-2] == "player1" && this.board[i-3][j-3] == "player1") {
                gameOver=true
                return "player1";
            } else if (this.board[i][j] == "player2" && this.board[i-1][j-1] == "player2" && this.board[i-2][j-2] == "player2" && this.board[i-3][j-3] == "player2") {
                gameOver=true
                return "player2";
            }
        }
    }
}
function checkFullBoard() {
    let mergedBoard = [].concat.apply([], boardLayout)
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


function allAreEqual(array, startNum) {
    const result = array.every(element => {
      if (element === null) {
            return false
      } else if (element === array[startNum]) {
            return true
      }
    });
    console.log(`This is the result for ${array} with ${startNum}: ` + result )
    return result;
}