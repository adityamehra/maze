let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

let row = 50;
let column = 50;
let matrix = [];
let frontier = [];

let N = 1, S = 2, E = 4, W = 8;
let OPPOSITE = {
    1: 2,
    2: 1,
    4: 8,
    8: 4
}

let Cell = {
    x: -1,
    y: -1,
    in: false,
    frontier: false,
    passage: false,
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function mark(x, y){
    matrix[x][y].passage = true;
    addFrontier(x-2, y)
    addFrontier(x+2, y)
    addFrontier(x, y-2)
    addFrontier(x, y+2)
}

function addFrontier(x, y){
    if(x >= 1 && y >= 1 && x < matrix[0].length - 1 && y < matrix.length - 1 && matrix[x][y].passage === false){
        matrix[x][y].frontier = true
        matrix[x][y] = matrix[x][y];
        frontier.push(matrix[x][y])
    }
}

function getNeighbors(x, y){
    let n = []
    if( x >= 2 && matrix[x-2][y].passage === true) n.push(matrix[x-2][y])
    if( x < matrix[0].length - 2 && matrix[x+2][y].passage === true) n.push(matrix[x+2][y])
    if( y < matrix.length - 2 && matrix[x][y+2].passage === true) n.push(matrix[x][y+2])
    if( y >= 2 && matrix[x][y-2].passage === true) n.push(matrix[x][y-2])
    return n;
}

function setPassage(x, y, nx, ny){
    if(x > nx) matrix[nx+1][y].passage = true
    if(x < nx) matrix[nx-1][y].passage = true
    if(y < ny) matrix[x][ny-1].passage = true
    if(y > ny) matrix[x][ny+1].passage = true
}

function generateMaze(){

    for(let i = 0; i < row; i++){
        matrix[i] = [];
        for(let j = 0; j < column; j++){
            let cell = Object.create(Cell)
            cell.x = i, cell.y = j
            matrix[i][j] = cell
        }
    }

    mark(getRandomInt(0, matrix[0].length - 1), getRandomInt(0, matrix.length - 1))

    while(frontier.length != 0){
        let idx = getRandomInt(0, frontier.length - 1)
        let frontierCell = frontier[idx]
        frontier.splice(idx, 1)
        if (!frontierCell.passage) {
            let n = getNeighbors(frontierCell.x, frontierCell.y)
            idx = getRandomInt(0, n.length - 1)
            let neighborCell = n[idx]
            setPassage(frontierCell.x, frontierCell.y , neighborCell.x, neighborCell.y)
            mark(frontierCell.x, frontierCell.y)
        }
    }

    drawBricks()

}

function printMaze(){
    let maze = ""
    for(let i = 0; i < row; i++){
        for(let j = 0; j < column; j++){
            if(matrix[i][j].passage) maze += "P"
            else maze += "B"
        }
        maze += "\n"
    }
}

// printMaze()

function drawBricks() {
  let size = 10
  for(let i = 0; i < row; i++) {
      for(let j = 0; j < column; j++) {
          let brickX = (i * size + 0) + 0;
          let brickY = (j * size + 0) + 0;
          ctx.beginPath();
          if(matrix[i][j].passage === true){
              ctx.rect(brickX, brickY, size, size);
              ctx.fillStyle = "white";
          } else {
              ctx.rect(brickX, brickY, size, size);
              ctx.fillStyle = "black";
          }
          ctx.fill();
      }
  }
}