window.onload=function(){ 
  drawMenu();
};
   
  function drawMenu() {
    canvas = document.getElementById("myMenu");
    ctx = canvas.getContext('2d');
    //Primeiro botão
    ctx.rect(0,0,100,100);
    ctx.stroke();
    img = document.getElementById("lapis");
    ctx.drawImage(img,0,0,100,100);
    //Segundo botão
    ctx.rect(0,100,100,100);
    ctx.stroke();
    ctx.rect(0,200,100,100);
    ctx.stroke();
    ctx.rect(0,300,100,100);
    ctx.stroke();
    ctx.rect(0,400,100,100);
    ctx.stroke();
    ctx.rect(0,500,100,100);
    ctx.stroke();
    ctx.rect(0,600,100,100);
    ctx.stroke();
    ctx.rect(0,700,100,100);
    ctx.stroke();
  }