//Module Pattern
var DRAW = (function(){
	var my = {};			//Variaveis e funções públicas
	//Desenha um ponto
	my.drawPoint = function(ctx, x, y){
		ctx.beginPath();
	    ctx.arc(x,y,5,0,2*Math.PI);
	    ctx.fillStyle = "black";
	    ctx.fill();
	};

	my.drawCir = function(ctx, x, y, tm){
		ctx.beginPath();
	    ctx.arc(x,y,tm,0,2*Math.PI);
	    ctx.stroke();
	};

	//Desenha um segmento de reta
	my.drawLine = function(ctx, xi, yi, xf, yf){
		ctx.moveTo(xi,yi);
	    ctx.lineTo(xf,yf);
	    ctx.stroke();
	};

	//Função que desenha o menu
	my.drawMenu = function (ctx) { 
		ctx.lineWidth=2;
	    //Primeiro botão
        ctx.rect(0,0,100,100);
        ctx.stroke();
        //Mão
            //Polegar
            ctx.moveTo(10,70);
            ctx.lineTo(10,50);
            ctx.lineTo(25,50);
            ctx.lineTo(28,65);
            //Indicador
            ctx.lineTo(28,20);
            ctx.lineTo(43,20);
            ctx.lineTo(43,50);
            //Pai de Todos
            ctx.lineTo(43,42);
            ctx.lineTo(58,42);
            ctx.lineTo(58,50);
            //Anelar
            ctx.lineTo(58,45);
            ctx.lineTo(73,45);
            ctx.lineTo(73,53);
            //Mindinho
            ctx.lineTo(73,48);
            ctx.lineTo(86,48);
            ctx.lineTo(86,68);
            //Contorno
            ctx.lineTo(73,90);
            ctx.lineTo(28,90);
            ctx.lineTo(10,70);
        ctx.stroke();
	    //Segundo botão
        ctx.rect(0,100,100,100);
        ctx.stroke();
        //Lapis
            //Contorno
            ctx.moveTo(10,190);
            ctx.lineTo(22,165);
            ctx.lineTo(77,110);
            ctx.lineTo(93,130);
            ctx.lineTo(42,180);
            ctx.lineTo(10,190);
            //Divisoria Ponta - Corpo
            ctx.moveTo(22,165);
            ctx.lineTo(33,162);
            ctx.lineTo(29,170);
            ctx.lineTo(40,167);
            ctx.lineTo(34,176);
            ctx.lineTo(44,172);
            ctx.lineTo(38,180);
            //Detalhes Ponta
            ctx.moveTo(15,180);
            ctx.lineTo(19,186);
            //Detalhes Corpo
            ctx.moveTo(33,162);
            ctx.lineTo(80,115);
            ctx.moveTo(40,167);
            ctx.lineTo(86,121);
            ctx.moveTo(44,172);
            ctx.lineTo(89,127);
        ctx.stroke();
	    //Terceiro botão
        ctx.rect(0,200,100,100);
        ctx.stroke();
        //Borracha
            //Contorno
            ctx.moveTo(10,270);
            ctx.lineTo(11,250);
            ctx.lineTo(35,240);
            ctx.lineTo(35,238);
            ctx.lineTo(75,215);
            ctx.lineTo(93,233);
            ctx.lineTo(94,250);
            ctx.lineTo(64,270);
            ctx.lineTo(62,268);
            ctx.lineTo(35,285);
            ctx.lineTo(10,270);
            //Detalhes
            ctx.moveTo(11,250);
            ctx.lineTo(35,264);
            ctx.lineTo(35,285);
            ctx.moveTo(35,264);
            ctx.lineTo(60,254);
            ctx.lineTo(35,240);
            ctx.moveTo(62,268);
            ctx.lineTo(60,254);
            ctx.lineTo(93,233);
        ctx.stroke();
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
        //Circulo
	        ctx.beginPath();
	        ctx.arc(50,650,40,0,2*Math.PI);
	        ctx.fillStyle = "white";
	        ctx.fill();
	    //Oitavo botão
        ctx.rect(0,700,100,100);
        ctx.stroke();
        //Arco
	        ctx.beginPath();
	        ctx.arc(50,750,40,(7*Math.PI)/4,(5*Math.PI)/4);
	        ctx.fillStyle = "white";
	        ctx.fill();
        //Ponta
	        ctx.moveTo(88,718);
	        ctx.lineTo(70,720);
	        ctx.lineTo(80,735);
	        ctx.lineTo(88,718);
	        ctx.stroke();
	    //Nono botão
        ctx.rect(100,0,100,100);
        ctx.stroke(); 
        //Cruz
	        ctx.moveTo(125,50);
	        ctx.lineTo(175,50);
	        ctx.moveTo(150,25);
	        ctx.lineTo(150,75);
	        ctx.stroke();   
	    //Decimo botão
        ctx.rect(100,100,100,100);
        ctx.stroke();
        //Espelho
	        ctx.moveTo(155,120);
	        ctx.lineTo(195,110);
	        ctx.lineTo(195,185);
	        ctx.lineTo(155,175);
	        ctx.lineTo(155,120);
	        ctx.stroke();   
	        ctx.beginPath();
	        ctx.arc(130,150,5,0,2*Math.PI);
	        ctx.fillStyle = "black";
	        ctx.fill(); 
	        ctx.beginPath();
	        ctx.arc(175,150,4,0,2*Math.PI);
	        ctx.fillStyle = "black";
	        ctx.fill(); 
	    //Decimo Primeiro botão
        ctx.rect(100,200,100,100);
        ctx.stroke();    
        //Escala
	        ctx.font = "30px Arial";
	        ctx.fillText("2x",110,250);
	        ctx.rect(110,260,30,30);
	        ctx.stroke(); 
	        ctx.rect(145,220,50,50);
	        ctx.stroke(); 
	    //Decimo Segundo botão
        ctx.rect(100,300,100,100);
        ctx.stroke();
	    //Decimo Terceiro botão
        ctx.rect(100,400,100,100);
        ctx.stroke();
	    //Decimo Quarto botão
        ctx.rect(100,500,100,100);
        ctx.stroke();
	    //Decimo Quinto botão
        ctx.rect(100,600,100,100);
        ctx.stroke();
	    //Decimo Sexto botão
        ctx.rect(100,700,100,100);
        ctx.stroke();
	 };
	return my;
}());