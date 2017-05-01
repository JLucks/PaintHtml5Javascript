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
		actionPaintMove(canvasPaint,ctxPaint, mousePos.x, mousePos.y);
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
						COORDSEL.x = x;
						COORDSEL.y = y;
						ULTCOORD.x = x;
						ULTCOORD.y = y;
						if(SELECTID == i)
							break;
						SELECTID = i;		
						REF = 0;		
						return;
					}
				}				
				break;
			case 1: 			//Reta
				for (var i = 0; i < RETA.length; i++) {
					if(FUNCTIONS.pickReta(i,x,y)){
						COORDSEL.x = x;
						COORDSEL.y = y;
						ULTCOORD.x = x;
						ULTCOORD.y = y;
						if(SELECTID == i)
							break;
						SELECTID = i;
						REF = 0;
						return;
					}
				}	
				
				break;
			case 2: 			//Area
				for (var i = 0; i < AREA.length; i++) {
					if(FUNCTIONS.pickArea(i,x,y)){
						COORDSEL.x = x;
						COORDSEL.y = y;
						ULTCOORD.x = x;
						ULTCOORD.y = y;
						if(SELECTID == i)
							break;
						SELECTID = i;
						REF = 0;
						return;
					}
				}	
				break;
			case 3: 			//Circulo
				for (var i = 0; i < CIR.length; i++) {
					if(FUNCTIONS.pickCirculo(i,x,y)){					
						COORDSEL.x = x;
						COORDSEL.y = y;
						ULTCOORD.x = x;
						ULTCOORD.y = y;
						if(SELECTID == i)
							break;
						SELECTID = i;	
						REF = 0;
						return;
					}
				}	
				break
		}
		if(MODETRANSFORM != 1 && MODETRANSFORM != 2){
			SELECTID = -1;
		}				
		if(MODETRANSFORM == 1){
			if(REF == 0){
				COORDSEL.x = x;
				COORDSEL.y = y;
				ULTCOORD.x = x;
				ULTCOORD.y = y;
				REF = 1;
			}
			else{
				SELECTID = -1;
			}	
		}
		else if(MODETRANSFORM == 2){
			if(REF == 0){
				COORDSEL.x = x;
				COORDSEL.y = y;
				REF++;
			}
			else if(REF == 1){				
				ULTCOORD.x = x;
				ULTCOORD.y = y;
				REF++;
			}
			else{
				SELECTID = -1;
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
					if(!(FUNCTIONS.pickPontoA(PONTO[PONTO.length - 1].coord.x, PONTO[PONTO.length - 1].coord.y, x, y))){
						DRAW.drawPoint(ctx, x, y);
						DRAW.drawLine(ctx, x, y,  PONTO[PONTO.length - 1].coord.x, PONTO[PONTO.length - 1].coord.y);
						Ponto.insert(x, y);
						Reta.insert(RETA.length - 1, PONTO.length - 1);	
					}
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
					if(!(FUNCTIONS.pickPontoA(PONTO[PONTO.length - 1].coord.x, PONTO[PONTO.length - 1].coord.y, x, y))){
						DRAW.drawPoint(ctx, x, y);
						DRAW.drawLine(ctx, PONTO[PONTO.length - 1].coord.x, PONTO[PONTO.length - 1].coord.y, x, y);
						Ponto.insert(x, y);					
						Area.insert(AREA.length - 1, PONTO.length - 1);	
					}
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
						Ponto.delete(i);							//Remove do array de pontos
						DRAW.drawUpdate(canvas);
						break;					
					}
				}
				break;
			case 1: 					//Reta
				for (var i = 0; i < RETA.length; i++) {
					if(FUNCTIONS.pickReta(i,x,y)){
						for (var j = 0; j <= RETA[i].n; j++) {			//Deleta do array os pontos da reta
							for (var l = 0; l < PONTO.length; l++) {			//Percorre os pontos
								if(FUNCTIONS.pickPonto(l, RETA[i].coord[j].x,RETA[i].coord[j].y)){ 			//Verifica se é um ponto da reta
									Ponto.delete(l);
									break;
								}
							}
						}
						Reta.delete(i);			//Deleta a reta
						DRAW.drawUpdate(canvas);
						break;
					}
				}	
				break;
			case 2: 					//Area
				for (var i = 0; i < AREA.length; i++) {
					if(FUNCTIONS.pickArea(i,x,y)){
						for (var j = 0; j <= AREA[i].n; j++) {			//Deleta do array os pontos da reta
							for (var l = 0; l < PONTO.length; l++) {			//Percorre os pontos
								if(FUNCTIONS.pickPonto(l, AREA[i].coord[j].x,AREA[i].coord[j].y)){ 			//Verifica se é um ponto da reta
									Ponto.delete(l);
									break;
								}
							}
						}
						Area.delete(i);			//Deleta a reta
						DRAW.drawUpdate(canvas);
						break;
					}
				}
				break;
			case 3: 				//Circulo
				for (var i = 0; i < CIR.length; i++) {
					if(FUNCTIONS.pickCirculo(i,x,y)){
						for (var j = 0; j < PONTO.length; j++) {
							if(FUNCTIONS.pickPonto(j, CIR[i].coord.x, CIR[i].coord.y)){
								Ponto.delete(j);
								break;
							}
						}
						Circulo.delete(i);
						DRAW.drawUpdate(canvas);
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
					DRAWINGAREA = 0;
				}
				break;
		}
	}
}

function actionPaintDown(ctx, x, y){
	if(MODEACTIVE == 0){
		if(SELECTID > -1){
			DRAWINGTRANS = 1;
		}
	}
}

function actionPaintUp(ctx, x, y){
	if(MODEACTIVE == 0){
		if(DRAWINGTRANS == 1){
			DRAWINGTRANS = 0;		
		}
	}
}

function actionPaintMove(canvas,ctx, x, y){  //-------->Arrumar
	if(MODEACTIVE == 0){
		if(DRAWINGTRANS == 1){
			switch(MODETRANSFORM){
				case 0: 			//Translação
					var tx, ty, MP, MR;					
					DRAW.drawUpdate(canvas);
					if (PRIMITIVE == 0) {
						tx = x - PONTO[SELECTID].coord.x;
						ty = y - PONTO[SELECTID].coord.y;
						MP = [[PONTO[SELECTID].coord.x],[PONTO[SELECTID].coord.y],[1]];
						MR = FUNCTIONS.translacao(MP,tx,ty);
						PONTO[SELECTID].coord.x = MR[0][0];
						PONTO[SELECTID].coord.y = MR[1][0];
					}
					else if (PRIMITIVE == 1) {
						tx = x - COORDSEL.x;
						ty = y - COORDSEL.y;
						for (var i = 0; i <= RETA[SELECTID].n; i++) {			
							MP = [[RETA[SELECTID].coord[i].x],[RETA[SELECTID].coord[i].y],[1]];
							MR = FUNCTIONS.translacao(MP,tx,ty);
							RETA[SELECTID].coord[i].x = MR[0][0];
							RETA[SELECTID].coord[i].y = MR[1][0];
						}
					}
					else if (PRIMITIVE == 2) {
						tx = x - COORDSEL.x;
						ty = y - COORDSEL.y;
						for (var i = 0; i <= AREA[SELECTID].n; i++) {			
							MP = [[AREA[SELECTID].coord[i].x],[AREA[SELECTID].coord[i].y],[1]];
							MR = FUNCTIONS.translacao(MP,tx,ty);
							AREA[SELECTID].coord[i].x = MR[0][0];
							AREA[SELECTID].coord[i].y = MR[1][0];
						}
					}
					else if (PRIMITIVE == 3) {
						tx = x - COORDSEL.x;
						ty = y - COORDSEL.y;
						MP = [[CIR[SELECTID].coord.x],[CIR[SELECTID].coord.y],[1]];
						MR = FUNCTIONS.translacao(MP,tx,ty);
						CIR[SELECTID].coord.x = MR[0][0];
						CIR[SELECTID].coord.y = MR[1][0];
					}					
					COORDSEL.x = x;
					COORDSEL.y = y;
					DRAW.drawUpdate(canvas);
					break;
				case 1: 			//Rotação
					DRAW.drawUpdate(canvas);
					if(REF == 1){
						var ang = Math.PI / 36;
						var MP, MR;	
						if(x < ULTCOORD.x)
							ang *= -1;
						if(PRIMITIVE == 0){
							MP = [[PONTO[SELECTID].coord.x],[PONTO[SELECTID].coord.y],[1]];
							MR = FUNCTIONS.rotacao(MP,COORDSEL,ang);
							PONTO[SELECTID].coord.x = MR[0][0];
							PONTO[SELECTID].coord.y = MR[1][0];
						}
						else if(PRIMITIVE == 1){
							for (var i = 0; i <= RETA[SELECTID].n; i++) {			
								MP = [[RETA[SELECTID].coord[i].x],[RETA[SELECTID].coord[i].y],[1]];
								MR = FUNCTIONS.rotacao(MP,COORDSEL,ang);
								RETA[SELECTID].coord[i].x = MR[0][0];
								RETA[SELECTID].coord[i].y = MR[1][0];
							}
						}
						else if (PRIMITIVE == 2) {
							for (var i = 0; i <= AREA[SELECTID].n; i++) {			
								MP = [[AREA[SELECTID].coord[i].x],[AREA[SELECTID].coord[i].y],[1]];
								MR = FUNCTIONS.rotacao(MP,COORDSEL,ang);
								AREA[SELECTID].coord[i].x = MR[0][0];
								AREA[SELECTID].coord[i].y = MR[1][0];
							}
						}
						else if (PRIMITIVE == 3) {
							MP = [[CIR[SELECTID].coord.x],[CIR[SELECTID].coord.y],[1]];
							MR = FUNCTIONS.rotacao(MP,COORDSEL,ang);
							CIR[SELECTID].coord.x = MR[0][0];
							CIR[SELECTID].coord.y = MR[1][0];
						}
						ULTCOORD.x = x;						
						DRAW.drawUpdate(canvas);
					}					
					break;
				case 2: 			//Espelhamento
					DRAW.drawUpdate(canvas);
					if(PRIMITIVE == 0){
						if (REF == 1) {
							DRAW.drawLine(ctx,COORDSEL.x,COORDSEL.y,x,y);
							MP = [[PONTO[SELECTID].coord.x],[PONTO[SELECTID].coord.y],[1]];
							MR = FUNCTIONS.espelhamentoX(MP);
							console.log(MR[0][0],MR[1][0]);
							DRAW.drawPoint(ctx,MR[0][0],MR[1][0]);
						}
					}
					else if(PRIMITIVE == 1){

					}
					else if(PRIMITIVE == 2){

					}
					else if(PRIMITIVE == 3){

					}
					ULTCOORD.x = x;
					ULTCOORD.y = y;
					//DRAW.drawUpdate(canvas);
					break;
				case 3: 			//Escala			
					DRAW.drawUpdate(canvas);					
					var txEsc = 1.005;
					var MP, MR;	
					if(x < ULTCOORD.x)
						txEsc = 0.995;
					if(PRIMITIVE == 1){
						for (var i = 0; i <= RETA[SELECTID].n; i++) {			
							MP = [[RETA[SELECTID].coord[i].x],[RETA[SELECTID].coord[i].y],[1]];
							MR = FUNCTIONS.escala(MP,COORDSEL,txEsc);
							RETA[SELECTID].coord[i].x = MR[0][0];
							RETA[SELECTID].coord[i].y = MR[1][0];
						}
					}
					else if (PRIMITIVE == 2) {
						for (var i = 0; i <= AREA[SELECTID].n; i++) {			
							MP = [[AREA[SELECTID].coord[i].x],[AREA[SELECTID].coord[i].y],[1]];
							MR = FUNCTIONS.escala(MP,COORDSEL,txEsc);
							AREA[SELECTID].coord[i].x = MR[0][0];
							AREA[SELECTID].coord[i].y = MR[1][0];
						}
						
					}
					else if (PRIMITIVE == 3) {
						CIR[SELECTID].raio *= txEsc;
					}
					ULTCOORD.x = x;			
					DRAW.drawUpdate(canvas);	
					break
			}	
		}
	}
	else if(MODEACTIVE == 1){
		switch(PRIMITIVE){
			case 1: 						//Reta
				if(DRAWINGRETA == 1){
					DRAW.drawUpdate(canvas);
					DRAW.drawPoint(ctx,x,y);
					n = RETA[RETA.length -1].n;
					DRAW.drawLine(ctx,RETA[RETA.length -1].coord[n].x,RETA[RETA.length -1].coord[n].y,x,y);
				}
				break;
			case 2: 						//Area
				if(DRAWINGAREA == 1){
					DRAW.drawUpdate(canvas);
					DRAW.drawPoint(ctx,x,y);
					n = AREA[AREA.length -1].n;
					DRAW.drawLine(ctx,AREA[AREA.length -1].coord[n].x,AREA[AREA.length -1].coord[n].y,x,y);
					DRAW.drawLine(ctx,AREA[AREA.length -1].coord[0].x,AREA[AREA.length -1].coord[0].y,x,y);
				}
				break;
			case 3: 						//Circulo
				if(DRAWINGCIR == 1){
					DRAW.drawUpdate(canvas);
					dist = Math.sqrt(Math.pow((x - PONTO[PONTO.length - 1].coord.x),2) + Math.pow((y - PONTO[PONTO.length - 1].coord.y),2));
					DRAW.drawCir(ctx,PONTO[PONTO.length - 1].coord.x, PONTO[PONTO.length - 1].coord.y, dist);
				}
				break;
		}
	}
}