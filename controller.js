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
		actionPaintClick(canvasPaint,ctxPaint, mousePos.x, mousePos.y);
	},false);

	canvasPaint.addEventListener('dblclick',function(evt){			//Funções do 'dblclick' do mouse no Canvas Principal
		mousePos = FUNCTIONS.getMousePos(canvasPaint, evt);
		actionPaintDBLClick(ctxPaint, mousePos.x, mousePos.y);
	},false);

	canvasPaint.addEventListener('mousemove',function(evt){			//Funções do 'mousemove' do mouse no Canvas Principal
		mousePos = FUNCTIONS.getMousePos(canvasPaint, evt);
		actionPaintMove(ctxPaint, mousePos.x, mousePos.y);
	},false);

	canvasPaint.addEventListener('mousedown',function(evt){			//Funções do 'mousedown' do mouse no Canvas Principal
		mousePos = FUNCTIONS.getMousePos(canvasPaint, evt);
		actionPaintDown(ctxPaint, mousePos.x, mousePos.y);
	},false);

	canvasPaint.addEventListener('mouseup',function(evt){			//Funções do 'mousedown' do mouse no Canvas Principal
		mousePos = FUNCTIONS.getMousePos(canvasPaint, evt);
		actionPaintUp(ctxPaint, mousePos.x, mousePos.y);
	},false);
}

function actionPaintClick(canvas,ctx, x, y){
	if(MODEACTIVE == 0){		//Seleção
		switch(PRIMITIVE){
			case 0: 			//Ponto
				for (var i = 0; i < PONTO.length; i++) {
					if(FUNCTIONS.pickPonto(i,x,y)){
						SELECTID = i;
						break;
					}
				}
				SELECTID = -1;					
				break;
			case 1: 			//Reta
				for (var i = 0; i < RETA.length; i++) {
					if(FUNCTIONS.pickReta(i,x,y)){
						SELECTID = i;
						break;
					}
				}	
				SELECTID = -1;
				break;
			case 2: 			//Area
				for (var i = 0; i < AREA.length; i++) {
					if(FUNCTIONS.pickArea(i,x,y)){
						SELECTID = i;
						break;
					}
				}	
				SELECTID = -1;
				break;
			case 3: 			//Circulo
				for (var i = 0; i < CIR.length; i++) {
					if(FUNCTIONS.pickCirculo(i,x,y)){
						SELECTID = i;
						break;
					}
				}	
				SELECTID = -1;
				break
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
						ctx.globalCompositeOperation = 'destination-over';		//Refaz fundo
						ctx.fillStyle = "white";
						ctx.fillRect(0,0,canvas.width,canvas.height);
						ctx.globalCompositeOperation = 'source-over';		//Retorna o modo de desenho para o modo padrão
						break;					
					}
				}
				break;
			case 1: 					//Reta
				for (var i = 0; i < RETA.length; i++) {
					if(FUNCTIONS.pickReta(i,x,y)){
						ctx.globalCompositeOperation = 'xor';			//Muda o modo de desenho para xor
						for (var j = 0; j < RETA[i].n - 1; j++) {		//Apaga as linhas e os pontos
							DRAW.drawLine(ctx, RETA[i].coord[j].x,RETA[i].coord[j].y, RETA[i].coord[j+1].x,RETA[i].coord[j+1].y);
							DRAW.drawPoint(ctx, RETA[i].coord[j].x, RETA[i].coord[j].y);	
						}
						DRAW.drawPoint(ctx, RETA[i].coord[j].x, RETA[i].coord[j].y);
						for (var j = 0; j < RETA[i].n; j++) {			//Deleta do array os pontos da reta
							for (var l = 0; l < PONTO.length; l++) {			//Percorre os pontos
								if(FUNCTIONS.pickPonto(l, RETA[i].coord[j].x,RETA[i].coord[j].y)){ 			//Verifica se é um ponto da reta
									Ponto.delete(l);
									break;
								}
							}
						}
						Reta.delete(i);			//Deleta a reta
						ctx.globalCompositeOperation = 'destination-over';		//Refaz fundo
						ctx.fillStyle = "white";
						ctx.fillRect(0,0,canvas.width,canvas.height);
						ctx.globalCompositeOperation = 'source-over';
						break;
					}
				}	
				break;
			case 2: 					//Area
				for (var i = 0; i < AREA.length; i++) {
					if(FUNCTIONS.pickArea(i,x,y)){
						ctx.globalCompositeOperation = 'xor';			//Muda o modo de desenho para xor
						var fst = AREA[i].n - 1;
						for (var j = 0; j < AREA[i].n; j++) {		//Apaga as linhas e os pontos
							DRAW.drawLine(ctx, AREA[i].coord[j].x,AREA[i].coord[j].y, AREA[i].coord[fst].x,AREA[i].coord[fst].y);
							DRAW.drawPoint(ctx, AREA[i].coord[j].x, AREA[i].coord[j].y);	
							fst = j;
						}
						for (var j = 0; j < AREA[i].n; j++) {			//Deleta do array os pontos da reta
							for (var l = 0; l < PONTO.length; l++) {			//Percorre os pontos
								if(FUNCTIONS.pickPonto(l, AREA[i].coord[j].x,AREA[i].coord[j].y)){ 			//Verifica se é um ponto da reta
									Ponto.delete(l);
									break;
								}
							}
						}
						Area.delete(i);			//Deleta a reta
						ctx.globalCompositeOperation = 'destination-over';		//Refaz fundo
						ctx.fillStyle = "white";	
						ctx.fillRect(0,0,canvas.width,canvas.height);
						ctx.globalCompositeOperation = 'source-over';
						break;
					}
				}
				break;
			case 3: 				//Circulo
				for (var i = 0; i < CIR.length; i++) {
					if(FUNCTIONS.pickCirculo(i,x,y)){
						ctx.globalCompositeOperation = 'xor';
						DRAW.drawPoint(ctx, CIR[i].coord.x, CIR[i].coord.y);
						DRAW.drawCir(ctx, CIR[i].coord.x, CIR[i].coord.y, CIR[i].raio);
						for (var j = 0; j < PONTO.length; j++) {
							if(FUNCTIONS.pickPonto(j, CIR[i].coord.x, CIR[i].coord.y)){
								Ponto.delete(j);
								break;
							}
						}
						Circulo.delete(i);
						ctx.globalCompositeOperation = 'destination-over';		//Refaz fundo
						ctx.fillStyle = "white";
						ctx.fillRect(0,0,canvas.width,canvas.height);
						ctx.globalCompositeOperation = 'source-over';
						break;
					}
				}
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

function actionPaintDown(ctx, x, y){
	if(MODEACTIVE == 0){
		if(SELECTID != -1)
			DRAWINGTRANS = 1;
	}
}

function actionPaintUp(ctx, x, y){
	if(MODEACTIVE == 0){
		if(DRAWINGTRANS == 1)
			DRAWINGTRANS = 0;
	}
}

function actionPaintMove(ctx, x, y){  //-------->Arrumar
	if(MODEACTIVE == 0){
		if(DRAWINGTRANS == 1)
			switch(MODETRANSFORM){
				case 0: 			//Translação
					break;
				case 1: 			//Espelhamento
					break;
				case 2: 			//Escala
					break;
				case 3: 			//Rotação
					break
			}	
	}
	else if(MODEACTIVE == 1){
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