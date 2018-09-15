let row = 20;
let column = 20;
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
    direction: -1,
    northWall: true,
    southWall: true,
    eastWall: true,
    westWall: true,
    breadcrumb: false
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
    // return random() * max | 0
}

function mark(x, y){
    // console.log(x + ", " + y);
    matrix[x][y].in = true;
    addFrontier(x-1, y)
    addFrontier(x+1, y)
    addFrontier(x, y-1)
    addFrontier(x, y+1)
}

function addFrontier(x, y){
    if(x >= 0 && y >= 0 && x < matrix[0].length && y < matrix.length && matrix[x][y].in === false){
        matrix[x][y].frontier = true
        matrix[x][y] = matrix[x][y];
        frontier.push(matrix[x][y])
    }
}

function getNeighbors(x, y){
    let n = []

    if( x > 0 && matrix[x-1][y].in === true) n.push(matrix[x-1][y])

    if( x + 1 < matrix[0].length && matrix[x+1][y].in === true) n.push(matrix[x+1][y])

    if( y + 1 < matrix.length && matrix[x][y+1].in === true) n.push(matrix[x][y+1])

    if( y > 0 && matrix[x][y-1].in === true) n.push(matrix[x][y-1])

    return n;
}

function getDirections(x, y, nx, ny){
    if(x > nx) return N;
    if(x < nx) return S;
    if(y < ny) return W;
    if(y > ny) return E;
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

function generateMaze(){

    matrix = [];
    frontier = [];

    for(let i = 0; i < row; i++){
        matrix[i] = [];
        for(let j = 0; j < column; j++){
            let cell = Object.create(Cell)
            cell.x = i, cell.y = j
            matrix[i][j] = cell
        }
    }

    mark(getRandomInt(0, matrix[0].length - 1), getRandomInt(0, matrix.length - 1))

    // console.log(matrix);
    // console.log(frontier.length);

    while(frontier.length != 0){

        // frontier = shuffle(frontier)
        
        let idx = getRandomInt(0, frontier.length - 1)

        // console.log("Length of frontier - " + frontier.length);
        // console.log("Random Index - " + idx);

        let cell = frontier[idx]
        frontier.splice(idx, 1)

        if(!cell.in){
            let n = getNeighbors(cell.x, cell.y)
            idx = getRandomInt(0, n.length - 1)
            let neighborCell = n[idx]
            let dir = getDirections(cell.x, cell.y , neighborCell.x, neighborCell.y)
            cell.direction = dir
            demolishWall(cell)
            neighborCell.direction = OPPOSITE[dir]
            demolishWall(neighborCell)
            mark(cell.x, cell.y)
        }
    }

    initilizeProtagonist()
    drawMatrix()
}

function demolishWall(cell){
    if(cell.direction == 1 && cell.northWall) cell.northWall = false
    if(cell.direction == 2 && cell.southWall) cell.southWall = false
    if(cell.direction == 4 && cell.eastWall) cell.eastWall = false
    if(cell.direction == 8 && cell.westWall) cell.westWall = false
}

function displayMaze(){
    let copy = []
    for(let i = 0; i < row; i++){
        copy[i] = [];
        for(let j = 0; j < column; j++){
            if(matrix[i][j].northWall == false) copy[i][j] = "^"

            if(matrix[i][j].southWall == false) copy[i][j] = "/"

            if(matrix[i][j].eastWall == false) copy[i][j] = "<"

            if(matrix[i][j].westWall == false) copy[i][j] = ">"

        }
    }
}