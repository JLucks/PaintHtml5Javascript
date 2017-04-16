window.onload = function () {
	canvasPaint = document.getElementById('myPaint');			//Canvas Principal
	ctxPaint = canvasPaint.getContext('2d');					//Contexto do Canvas Principal
	ctxPaint.fillStyle = "white";
	ctxPaint.fillRect(0,0,canvasPaint.width,canvasPaint.height);
	canvasMenu = document.getElementById('myMenu');				//Canvas do Menu
	ctxMenu = canvasMenu.getContext('2d');						//Contexto do Canvas do Menu
	ctxMenu.fillStyle = "white";
	ctxMenu.fillRect(0,0,canvasMenu.width,canvasMenu.height);
    DRAW.drawMenu(ctxMenu);									//Desenha o Menu

    canvasMenu.addEventListener('click', function(evt) {		//Função de Seleção do Menu
    	mousePos = FUNCTIONS.getMousePos(canvasMenu, evt);
    	MENUPAINT.selectOption(mousePos.x, mousePos.y);
    }, false);

	canvasPaint.addEventListener('click',function(evt){			//Funções do 'click' do mouse no Canvas Principal
		mousePos = FUNCTIONS.getMousePos(canvasPaint, evt);
		actionPaintClick(ctxPaint, mousePos.x, mousePos.y);
	},false);

	canvasPaint.addEventListener('dblclick',function(evt){			//Funções do 'dblclick' do mouse no Canvas Principal
		mousePos = FUNCTIONS.getMousePos(canvasPaint, evt);
		actionPaintDBLClick(ctxPaint, mousePos.x, mousePos.y);
	},false);

	canvasPaint.addEventListener('mousemove',function(evt){			//Funções do 'mousemmove' do mouse no Canvas Principal
		mousePos = FUNCTIONS.getMousePos(canvasPaint, evt);
		actionPaintMove(ctxPaint, mousePos.x, mousePos.y);
	},false);
}

function actionPaintClick(ctx, x, y){
	if(MODEACTIVE == 0){		//Seleção
		if(MODETRANSFORM == 0){			//Translação
			switch(PRIMITIVE){
				case 0: 					//Ponto
					break;
				case 1: 					//Reta
					break;
				case 2: 					//Area
					break;
				case 3: 					//Circulo
					break;
			}
		}
		else if(MODETRANSFORM == 1){		//Espelhamento
			switch(PRIMITIVE){
				case 0: 					//Ponto
					break;
				case 1: 					//Reta
					break;
				case 2: 					//Area
					break;
				case 3: 					//Circulo
					break;
			}
		}
		else if(MODETRANSFORM == 2){		//Escala
			switch(PRIMITIVE){
				case 0: 					//Ponto
					break;
				case 1: 					//Reta
					break;
				case 2: 					//Area
					break;
				case 3: 					//Circulo
					break;
			}
		}
		else if(MODETRANSFORM == 3){		//Rotação
			switch(PRIMITIVE){
				case 0: 					//Ponto
					break;
				case 1: 					//Reta
					break;
				case 2: 					//Area
					break;
				case 3: 					//Circulo
					break;
			}
		}
	}
	else if(MODEACTIVE == 1){		//Escrita
		switch(PRIMITIVE){
			case 0: 						//Ponto
				DRAW.drawPoint(ctx,x,y);
				Ponto.insert(x,y);
				break;
			case 1: 						//Reta
				if(DRAWINGRETA == 0){
					DRAW.drawPoint(ctx, x, y);
					Ponto.insert(x, y);
					Reta.create(PONTO.length - 1);
					DRAWINGRETA = 1;
				}
				else{
					DRAW.drawPoint(ctx, x, y);
					Ponto.insert(x, y);
					DRAW.drawLine(ctx, PONTO[PONTO.length - 2].coord.x, PONTO[PONTO.length - 2].coord.y, x, y);
					Reta.insert(RETA.length - 1, PONTO.length - 1);	
				}
				break;
			case 2: 						//Area
				if(DRAWINGAREA == 0){
					DRAW.drawPoint(ctx, x, y);
					Ponto.insert(x, y);
					Area.create(PONTO.length - 1);
					DRAWINGAREA = 1;
				}
				else{
					DRAW.drawPoint(ctx, x, y);
					Ponto.insert(x, y);
					DRAW.drawLine(ctx, PONTO[PONTO.length - 2].coord.x, PONTO[PONTO.length - 2].coord.y, x, y);
					Area.insert(AREA.length - 1, PONTO.length - 1);	
				}
				break;
			case 3: 						//Circulo
				if(DRAWINGCIR == 0){
					DRAW.drawPoint(ctx, x, y);
					Ponto.insert(x, y);
					Circulo.create(PONTO.length - 1);
					DRAWINGCIR = 1;
				}
				else{
					dist = Math.sqrt(Math.pow((x - PONTO[PONTO.length - 1].coord.x),2) + Math.pow((y - PONTO[PONTO.length - 1].coord.y),2));
					DRAW.drawCir(ctx,PONTO[PONTO.length - 1].coord.x, PONTO[PONTO.length - 1].coord.y, dist);
					Circulo.insert(CIR.length - 1, dist);
					DRAWINGCIR = 0;
				}
				break;
		}
	}
	else if(MODEACTIVE == 2){			//Exclusão
		switch(PRIMITIVE){
			case 0: 						//Ponto
				for (var i = 0; i < PONTO.length; i++) {			//Percorre os pontos
					if(FUNCTIONS.pickPonto(i,x,y)){ 			//Verifica se é um ponto
						ctx.globalCompositeOperation = 'xor';			//Muda o modo de desenho para xor
						DRAW.drawPoint(ctx,PONTO[i].coord.x,PONTO[i].coord.y);			//Redesenha
						Ponto.delete(i);							//Remove do array de pontos
						ctx.globalCompositeOperation = 'source-over';		//Retorna o modo de desenho para o modo padrão
						break;					
					}
				}
				break;
			case 1:
				break;
			case 2:
				break;
			case 3:
				break;
		}
	}
}

function actionPaintDBLClick(ctx, x, y){
	if(MODEACTIVE == 1){
		switch(PRIMITIVE){
			case 1: 						//Reta
				if(DRAWINGRETA == 1){
					DRAWINGRETA = 0;
				}
				break;
			case 2: 						//Area
				if(DRAWINGAREA == 1){
					if(!(FUNCTIONS.pickPontoA(AREA[AREA.length - 1].coord[0].x, AREA[AREA.length - 1].coord[0].y, x, y))){
						DRAW.drawLine(ctx, AREA[AREA.length - 1].coord[0].x, AREA[AREA.length -1].coord[0].y, x, y);
					}
					DRAWINGAREA = 0;
				}
				break;
		}
	}
}

function actionPaintMove(ctx, x, y){  //-------->Arrumar
	if(MODEACTIVE == 1){
		switch(PRIMITIVE){
			case 1: 						//Reta
				if(DRAWINGRETA == 1){
				}
				break;
			case 2: 						//Area
				if(DRAWINGAREA == 1){
				}
				break;
			case 3: 						//Circulo
				if(DRAWINGCIR == 1){
				}
				break;
		}
	}
}