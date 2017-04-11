function drawPoint(ctx, x, y){
	ctx.beginPath();
    ctx.arc(x,y,2,0,2*Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
}

function drawLine(ctx, xi, yi, xf, yf){
	ctx.moveTo(xi,yi);
    ctx.lineTo(xf,yf);
    ctx.stroke();
}

function drawArea(ctx){
	
}