//Module Pattern
var Ponto = (function(){
	var my = {};			//Variaveis e funções públicas
	//Insere um ponto no array de pontos
	my.insert = function(x,y){
		var ponto = {};
		ponto.coord = {};
		ponto.coord.x = x;
		ponto.coord.y = y;
		PONTO.push(ponto);
	};

	//Remove o ponto do array de pontos ---> Falta verificar se o ponto é livre
	my.delete = function(id){
		PONTO.splice(id,1);
	};

	return my;			//Retorna as variaveis e metodos públicos
}());

//Module Pattern
var Reta = (function(){
	var my = {};				//Variaveis e funções públicas

	//Cria um reta "vazia"
	my.create = function(idPonto){
		var reta = {};
		reta.n = 0;
		reta.coord = [];
		reta.coord.push(PONTO[idPonto].coord);		//Inicia a reta com um ponto
		return (RETA.push(reta) - 1);
	};

	//Indica que dois PONTOS formam uma reta inserindo-os no array de retas
	my.insert = function(idReta, idPonto){
		RETA[idReta].coord.push(PONTO[idPonto].coord);
		RETA[idReta].n += 1;				//A cada dois pontos uma reta
	};

	//Remove a reta do array de retas
	my.delete = function(id){
		RETA.splice(id,1);
	};

	return my;					//Retorna as variaveis públicas
}());

//Module Pattern
var Area = (function(){
	var my = {};				//Variaveis e funções públicas

	//Cria uma área "vazia" (poligono)
	my.create = function(idPonto){
		var area = {};
		area.n = 0;
		area.coord = [];
		area.coord.push(PONTO[idPonto].coord);			//Inicia a area com um ponto
		return (AREA.push(area) - 1);
	};

	//Indica que dois pontos formam uma aresta da área inserindo-as no array de areas
	my.insert = function(idArea, idPonto){
		AREA[idArea].coord.push(PONTO[idPonto].coord);
		AREA[idArea].n += 1;				//Dois pontos formam uma aresta
	};

	//Remove a area do array de areas 	
	my.delete = function(id){
		AREA.splice(id,1);
	};

	return my;				//Retorna as variaveis públicas
}());

var Circulo = (function(){
	var my = {};			//Variaveis e funções públicas

	//Cria um circulo
	my.create = function(idPonto){
		var circulo = {};
		circulo.coord = PONTO[idPonto].coord;
		return (CIR.push(circulo) - 1);
	};

	//Insere um novo circulo
	my.insert = function(idCir, raio){
		CIR[idCir].raio = raio;
	};

	//Remove o circulo do array de circulos	
	my.delete = function(id){
		CIR.splice(id,1);
	};	

	return my;
}());

//Module Pattern
var FUNCTIONS = (function(){
	var my = {};					//Variaveis e funções públicas

	//Retorna a posição do mouse em coordenadas do canvas
	my.getMousePos = function (canvas, evt) {
        var rect = canvas.getBoundingClientRect();				//Posição relativa do canvas na tela
        return {
          x: evt.clientX - rect.left,					//Normaliza o eixo x
          y: evt.clientY - rect.top						//Normaliza o eixo y
        };
	};

	//Verificação de Ponto
	my.pickPonto = function(id,x,y){
		var xp = PONTO[id].coord.x;
		var yp = PONTO[id].coord.y;
		if(x - TOL <= xp && x + TOL >= xp)			//Verifica se o x do ponto esta na "caixa" criada pela tolerancia
			if(y - TOL <= yp && y + TOL >= yp)		//Verifica se o y do ponto esta na "caixa" criada pela tolerancia
				return true;
		return false;
	};

	//Verificação de Ponto
	my.pickPontoA = function(x,y,xp,yp){
		if(x - TOL <= xp && x + TOL >= xp)			//Verifica se o x do ponto esta na "caixa" criada pela tolerancia
			if(y - TOL <= yp && y + TOL >= yp)		//Verifica se o y do ponto esta na "caixa" criada pela tolerancia
				return true;
		return false;
	};

	//Códifica passando as cordenadas de cada ponto para Esquerda/Direita/Cima/Baixo 
	my.pickCode = function(x, y, xmin, xmax, ymin, ymax, cod){
		cod[0] = x < xmin;			//Esquerda
		cod[1] = x > xmax;			//Direita
		cod[2] = y < ymin;			//Cima
		cod[3] = y > ymax;			//Baixo
	};

	//Verificação de Reta
	my.pickReta = function(id,x,y){
		var i, j;
		var cod0 = [];			//Código para o primeiro ponto do segmento de reta
		var cod1 = [];			//Código para o segundo ponto do segmento de reta
		var x0, y0, x1, y1;		//Cooordenas dos pontos das retas do Array de retas
		var xmin, xmax, ymin, ymax;		//Coordenadas da "caixa" de tolerância

		/* define janela de atracao */
		xmin = x - TOL;
		xmax = x + TOL;		
		ymin = y - TOL;		
		ymax = y + TOL;

		/* testa cada segmento */
		for (i = 1; i <= RETA[id].n; i++)
		{
			x0 = RETA[id].coord[i-1].x;
			x1 = RETA[id].coord[i].x;
			y0 = RETA[id].coord[i-1].y;
			y1 = RETA[id].coord[i].y;

			my.pickCode(x1, y1, xmin, xmax, ymin, ymax, cod1);		//Códifica
			do
			{
				my.pickCode(x0, y0, xmin, xmax, ymin, ymax, cod0);
				for (j = 0; j < 4; j++ )
					if (cod0[j] && cod1[j])	/* test no-trivial pick */
					 break;
				if (j != 4)
					break;
				/* move point 0 to window limit */
				if (cod0[0])
					y0 += (xmin - x0) * (y1 - y0) / (x1 - x0), x0 = xmin;
				else if (cod0[1])
					y0 += (xmax - x0) * (y1 - y0) / (x1 - x0), x0 = xmax;
				else if (cod0[2])
					x0 += (ymin - y0) * (x1 - x0) / (y1 - y0), y0 = ymin;
				else if (cod0[3])
					x0 += (ymax - y0) * (x1 - x0) / (y1 - y0), y0 = ymax;
				else
					return 1;
			} while (1);
		}
		return 0;
	};

	//Verificação de Area
	my.pickArea = function(id, x, y){
		var i;
		var ni = 0; 	  		/* numero de intersecoes */
		var fst = AREA[id].n;	/* comeca pelo ultimo no' */
		var xc;
		var p1, p2; 			/* pontos da aresta */

		for (i = 0; i <= AREA[id].n; i++){
			p1 = AREA[id].coord[i];
			p2 = AREA[id].coord[fst];
			if (!(p1.y == p2.y) &&	     /* descarta horizontais */
			  !((p1.y > y)&&(p2.y > y))&&   /* descarta retas acima */
			  !((p1.y < y)&&(p2.y < y))&&   /* descarta retas abaixo */
			  !((p1.x < x)&&(p2.x < x)))  /* descarta retas esquerda */
			{
				if (p1.y == y){		/* primeiro ponto na mesma cota */
					if ((p1.x > x) && (p2.y > y))
					   ni++;				/* a direita e acima do ponto */
				}
				else {
					if (p2.y == y){	/* segundo ponto na mesma cota */
					    if ((p2.x > x) && (p1.y > y))
					      ni++;			/* a direita e acima do ponto */
				    }
				    else{
						if ((p1.x > x) && (p2.x > x))
						 	ni++; 			/* inteiramente a direita */
						else{                   /* verifica ponto de intersecao */
							var dx = p1.x - p2.x;
							xc = p1.x;
							if ( dx != 0.0 )
								xc += ( y - p1.y ) * dx / ( p1.y - p2.y );
							if (xc > x)
								ni++;
						}
					}
				}
			}
			fst = i;  		/* ultimo ponto para proxima aresta */
		}
		return ( ni % 2 );
	};

	//Verificação de circulo
	my.pickCirculo = function(id, x, y){
		var dis = Math.sqrt(Math.pow((x - CIR[id].coord.x),2) + Math.pow((y - CIR[id].coord.y),2));
		if(dis <= CIR[id].raio)				//Se a distancia entre o ponto e a origem do circulo é menor que o raio
			return true;
		return false;
	};

	my.somaMatriz = function(A, B, m, n){
		var C = [];
		//init the grid matrix
		for ( var i = 0; i < m; i++ ) {
		    C[i] = []; 
		}
		for (var i = 0; i < m; i++) {
			for (var j = 0; j < n; j++) {
				C[i][j] =  A[i][j] + B[i][j];
			}
		}
		return C;
	};

	my.multiMatriz = function(A,B,m,n,p){
		var C = [];
		//init the grid matrix
		for ( var i = 0; i < m; i++ ) {
		    C[i] = []; 
		}
		for (var i = 0; i < m; i++) {
			for (var j = 0; j < p; j++) {
				C[i][j] =  0;
			}
		}
		for (var i = 0; i < m; i++) {
			for (var j = 0; j < n; j++) {
				for (var k = 0; k < p; k++) {
					C[i][k] += A[i][j] * B[j][k];
				}
			}
		}
		return C;
	};

	//Translação
	my.translacao = function(A, tx, ty){
		var MT = [[1,0,tx],[0,1,ty],[0,0,1]];
		return my.multiMatriz(MT,A,3,3,1);
	};

	//Rotação
	my.rotacao = function(A, c, ang){
		var MRot = [[Math.cos(ang),(Math.sin(ang)*(-1)),0],[Math.sin(ang),Math.cos(ang),0],[0,0,1]];
		var tx = c.x, ty = c.y;
		var Mtemp = my.translacao(A,-tx,-ty);
		Mtemp = my.multiMatriz(MRot,Mtemp,3,3,1);
		return my.translacao(Mtemp,tx,ty);
	};

	//Escala
	my.escala = function(A, c, txe){
		var MEsc = [[txe,0,0],[0,txe,0],[0,0,1]];
		var Mtemp = my.translacao(A,-c.x,-c.y);
		Mtemp = my.multiMatriz(MEsc,Mtemp,3,3,1);
		return my.translacao(Mtemp,c.x,c.y);
	};

	//Espelhamento
	my.espelhamentoX = function(A,c,ang){
		var MEspX = [[1,0,0],[0,-1,0],[0,0,1]];
		var Mtemp = my.translacao(A,-c.x,-c.y);
		Mtemp = my.rotacao(Mtemp,c,-ang);
		Mtemp = my.multiMatriz(MEspX,Mtemp,3,3,1);
		Mtemp = my.rotacao(Mtemp,c,ang);
		return my.translacao(Mtemp,c.x,c.y);
	};

	my.espelhamentoY = function(A,c,ang){
		var MEspy = [[-1,0,0],[0,1,0],[0,0,1]];
		var Mtemp = my.translacao(A,-c.x,-c.y);
		Mtemp = my.rotacao(Mtemp,c,-ang);
		Mtemp = my.multiMatriz(MEspy,Mtemp,3,3,1);
		Mtemp = my.rotacao(Mtemp,c,ang);
		return my.translacao(Mtemp,c.x,c.y);
	};
	
	my.areaVetor = function(p1, p2, c){
		var a, u, v, ang;
		u = Math.sqrt(Math.pow(p1.x - c.x,2) + Math.pow(p1.y - c.y,2));
		v = Math.sqrt(Math.pow(p1.x - p2.x,2) + Math.pow(p1.y - p2.y,2));
		ang = Math.acos(Math.cos((((p1.x - c.x)*(p1.x - p2.x))+((p1.y - c.y)*(p1.y - p2.y)))/(u*v)));	
		a = 1/2 * u * v * Math.sin(ang);
		return a;
	};

	my.reflect = function(p, p0, p1) {
        var dx, dy, a, b, x, y;

        dx = p1.x - p0.x;
        dy = p1.y - p0.y;
        a = (dx * dx - dy * dy) / (dx * dx + dy * dy);
        b = 2 * dx * dy / (dx * dx + dy * dy);
        x = Math.round(a * (p.x - p0.x) + b * (p.y - p0.y) + p0.x); 
        y = Math.round(b * (p.x - p0.x) - a * (p.y - p0.y) + p0.y);

        A = [[x],[y],[1]];
        return A;
    }

	return my;						//Retorna o que é público
}());