let protagonist = {
    x: 0,
    y: 0,
    color: 'blue'
  }
  
let protagonist1 = Object.create(protagonist);

function initilizeProtagonist(){
    protagonist1 = Object.create(protagonist);
}

function drawProtagonist(protagnist){
    if(protagnist.x == matrix.length - 1 && protagnist.y == matrix[0].length - 1){
        // alert("Solved the maze")
    }

    ctx.beginPath();
    ctx.shadowColor = "#fff";
    ctx.shadowBlur = 15;
    ctx.arc(protagnist.x * 25 + 12.5, protagnist.y * 25 + 12.5, 2, 0, Math.PI*2);
    ctx.fillStyle = protagnist.color;
    ctx.fill();
    ctx.shadowColor = null;
    ctx.shadowBlur = null;
    ctx.closePath();
}

function drawBreadcrumb(pos){
    ctx.beginPath();
    ctx.shadowColor = "#fff";
    ctx.shadowBlur = 15;
    ctx.arc(pos.x * 25 + 12.5, pos.y * 25 + 12.5, 2, 0, Math.PI*2);
    ctx.fillStyle = pos.color;
    ctx.fill();
    ctx.shadowColor = null;
    ctx.shadowBlur = null;
    ctx.closePath();
}