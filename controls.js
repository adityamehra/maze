document.addEventListener("keydown", keyDownHandler, false);
  
function keyDownHandler(e){

  let keyCode = e.keyCode;

  let X = protagonist1.x
  let Y = protagonist1.y
  let cell = matrix[Y][X]
  cell.breadcrumb = true

  let left = cell.eastWall
  let right = cell.westWall
  let top = cell.northWall
  let bottom = cell.southWall

  if(keyCode == 37 && !left){
    protagonist1.x -= 1
  } else if (keyCode == 39 && !right) {
    protagonist1.x += 1
  } else if (keyCode == 38 && !top) {
    protagonist1.y -= 1
  } else if (keyCode == 40 && !bottom) {
    protagonist1.y += 1
  }
  drawMatrix()
  drawProtagonist(protagonist1);
}