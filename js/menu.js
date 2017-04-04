window.onload=function(){ 
  drawMenu();
};
   
  function drawMenu() {
    canvas = document.getElementById("myMenu");
    ctx = canvas.getContext('2d');    
    ctx.lineWidth=5;
    //Primeiro botão
        ctx.rect(0,0,100,100);
        ctx.stroke();
        //Imagem
        img = document.getElementById("selecao");
        ctx.drawImage(img,0,0,100,100);
    //Segundo botão
        ctx.rect(0,100,100,100);
        ctx.stroke();
        //Imagem
        img = document.getElementById("lapis");
        ctx.drawImage(img,0,100,100,100);
    //Terceiro botão
        ctx.rect(0,200,100,100);
        ctx.stroke();
        //Imagem
        img = document.getElementById("borracha");
        ctx.drawImage(img,0,200,100,100);
    //Quarto botão
        ctx.rect(0,300,100,100);
        ctx.stroke();
        //Circulo => ponto
        ctx.beginPath();
        ctx.arc(50,350,10,0,2*Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
    //Quinto botão
        ctx.rect(0,400,100,100);
        ctx.stroke();
        //Linha
        ctx.moveTo(10,450);
        ctx.lineTo(90,450);
        ctx.stroke();
    //Sexto botão
        ctx.rect(0,500,100,100);
        ctx.stroke();
        //Triangulo
        ctx.moveTo(20,505);
        ctx.lineTo(5,535);
        ctx.lineTo(40,535);
        ctx.lineTo(20,505);
        ctx.stroke();
        //Quadrado
        ctx.rect(25,525,40,40);
        ctx.stroke();
        //Poligonal de 8
        ctx.moveTo(45,545);
        ctx.lineTo(75,545);
        ctx.lineTo(90,555);
        ctx.lineTo(90,575);
        ctx.lineTo(75,585);
        ctx.lineTo(45,585);
        ctx.lineTo(33,575);
        ctx.lineTo(33,555);
        ctx.lineTo(47,545);
        ctx.stroke();
    //Setimo botão
        ctx.rect(0,600,100,100);
        ctx.stroke();
        //Imagem
        img = document.getElementById("rotativa");
        ctx.drawImage(img,10,610,80,80);
    //Oitavo botão
        ctx.rect(0,700,100,100);
        ctx.stroke();
  }