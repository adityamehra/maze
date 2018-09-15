function drawLine(sX, sY, eX, eY) {
    /*Draw a line from the starting X and Y positions to  the ending X and Y positions*/
    ctx.moveTo(sX, sY);
    ctx.lineTo(eX, eY);
  }

function drawCell(x, y, cell) {
    /* Draw cell based on wall properties */
    let left = cell.eastWall;
    let right = cell.westWall;
    let top = cell.northWall;
    let bottom = cell.southWall;

    let size = 25;
    ctx.beginPath();
    ctx.lineWidth=2;
    if (left) {
      drawLine(x, y, x, y + size);
    }

    if (right) {
      drawLine(x + size, y, x + size, y + size);
    }

    if (bottom) {
      drawLine(x, y + size, x + size, y + size)
    }

    if (top) {
      drawLine(x, y, x + size, y);
    }
    ctx.stroke();
    ctx.closePath();

    if(cell.breadcrumb === true){
      drawBreadcrumb({x: cell.y, y: cell.x, color: 'red'})
    }
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, c.width, c.height);
  }

function drawMatrix() {
    clearCanvas()
    var side = 25;
    for (var i = 0; i < row; i++) {
      for (var j = 0; j < column; j++) {
        drawCell(i * side, j * side, matrix[j][i]);
      }
    }
    drawProtagonist(protagonist1);
  }