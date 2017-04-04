window.onload=function(){ 
  drawMenu();
};
   
  function drawMenu() {
    canvas = document.getElementById("myMenu");
    ctx = canvas.getContext('2d');
    //Primeiro botão
    ctx.rect(0,0,100,100);
    ctx.stroke();
    img = document.getElementById("selecao");
    ctx.drawImage(img,0,0,100,100);
    //Segundo botão
    ctx.rect(0,100,100,100);
    ctx.stroke();
    img = document.getElementById("lapis");
    ctx.drawImage(img,0,100,100,100);
    //Terceiro botão
    ctx.rect(0,200,100,100);
    ctx.stroke();
    img = document.getElementById("borracha");
    ctx.drawImage(img,0,200,100,100);
    //Quarto botão
    ctx.rect(0,300,100,100);
    ctx.stroke();
    //Quinto botão
    ctx.rect(0,400,100,100);
    ctx.stroke();
    //Sexto botão
    ctx.rect(0,500,100,100);
    ctx.stroke();
    //Setimo botão
    ctx.rect(0,600,100,100);
    ctx.stroke();
    //Oitavo botão
    ctx.rect(0,700,100,100);
    ctx.stroke();
  }