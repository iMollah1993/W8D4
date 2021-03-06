// DON'T TOUCH THIS CODE
if (typeof window === 'undefined'){
  var Piece = require("./piece");
}
// DON'T TOUCH THIS CODE

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */
function _makeGrid () {
  const board = Array.from({length:8}, () => Array.from({length:8}));
  board[3][4] = new Piece('black');
  board[4][3] = new Piece('black');
  board[3][3] = new Piece('white');
  board[4][4] = new Piece('white');
  return board;
}

/**
 * Constructs a Board with a starting grid set up.
 */
function Board () {
  this.grid = _makeGrid();
}

Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {     // [0, 1]
  // pos.forEach(el => {
  //   if (el < 0 || el > 7) { 
  //     return false 
  //   }
  // });
  for (let i = 0; i < pos.length; i++) {
    if (pos[i] < 0 || pos[i] > 7) {
      return false;
    }
  }

  return true;
};

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function (pos) {
  if (this.isValidPos(pos)){
    return this.grid[pos[0]][pos[1]];
  } else {
    throw new Error("Not valid pos!")
  };
}
/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
  const piece = this.getPiece(pos)

  if (piece) {
    return piece.color === color
  } else {
    return false
  }
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
  // if (this.getPiece(pos)) {
  //   return true
  // } else {
  //   return false
  // }

  return this.getPiece(pos) ? true : false
};

/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 *
 * Returns an empty array if it reaches the end of the board before finding another piece
 * of the same color.
 *
 * Returns empty array if it hits an empty position.
 *
 * Returns empty array if no pieces of the opposite color are found.
 */
Board.prototype._positionsToFlip = function(pos, color, dir, piecesToFlip){
  // debugger
  if (!this.isValidPos(pos)) {
    return [];
  }
  
  if (piecesToFlip === undefined) {
    piecesToFlip = [];
  }

  // get next position
  let nextPos = [pos[0]+dir[0], pos[1]+dir[1]]

  // check if next pos isvalid, notoccupied or ismine
  if (this.isValidPos(nextPos) === false) {
    return [];
  } else if (this.getPiece(nextPos) === undefined) {
      return [];
    } else if (this.isMine(nextPos, color)) {
      return piecesToFlip;
    } else {
      piecesToFlip.push(nextPos);
      return this._positionsToFlip(nextPos, color, dir, piecesToFlip)
    }
};

/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];
 */

Board.prototype.validMove = function (pos, color) {
  // debugger
  if (this.isOccupied(pos)){
    return false 
  } else {
    for (let i = 0; i < Board.DIRS.length; i++){
      // debugger
      if (this._positionsToFlip(pos, color, Board.DIRS[i]).length > 0 ) {
        return true 
      } 
    }
  }
  return false;
};

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
  let row = pos[0]
  let col = pos[1]
  
  // place a new piece
  if (this.validMove(pos, color)) {
    this.grid[row][col] = new Piece(color);

    // getting all flippable positions and flipping them
    for (let i = 0; i < Board.DIRS.length; i++) {
      this._positionsToFlip(pos, color, Board.DIRS[i]).forEach(flipPos => {
        let piece = this.grid[flipPos[0]][flipPos[1]];
        piece.color = color;
      });
    }
  } else {
    throw new Error("Invalid move!")
  };
};

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {
  
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {
};



/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
};




/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
};


// DON'T TOUCH THIS CODE
if (typeof window === 'undefined'){
  module.exports = Board;
}
// DON'T TOUCH THIS CODE