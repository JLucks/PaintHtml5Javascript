//Module Pattern
var Ponto = (function(){
	var my = {};
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
	var my = {};

	//Cria um reta "vazia"
	my.create = function(){
		var reta = {};
		reta.n = 0;
		reta.coord = [];
		return (RETA.push(reta) - 1);
	};

	//Indica que dois PONTOS formam uma reta inserindo-os no array de retas
	my.insert = function(idReta, idPonto1, idPonto2){
		RETA[idReta].coord.push(idPonto1);
		RETA[idReta].coord.push(idPonto2);
		RETA[idReta].n += 1;				//A cada dois pontos uma reta
	};

	//Remove a reta do array de retas ---> Falta remover os pontos do array de ponto
	my.delete = function(id){
		RETA.splice(id,1);
	};

	return my;					//Retorna as variaveis públicas
}());

//Module Pattern
var Area = (function(){
	var my = {};

	//Cria uma área "vazia" (poligono)
	my.create = function(){
		var area = {};
		area.n = 0;
		area.coord = [];
		return (AREA.push(area) - 1);
	};

	//Indica que dois pontos formam uma aresta da área inserindo-as no array de areas
	my.insert = function(idArea, idPonto1, idPonto2){
		AREA[idArea].coord.push(idPonto1);
		AREA[idArea].coord.push(idPonto2);
		AREA[idArea].n += 1;				//Dois pontos formam uma aresta
	};

	//Remove a area do array de areas ---> Falta remover os ponto do array de ponto
	my.delete = function(id){
		AREA.splice(id,1);
	};

	return my;				//Retorna as variaveis públicas
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

	//Escreve um texto no canvas
	my.writeMessage = function(canvas, message, x, y) {
        ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '18pt Calibri';
        ctx.fillStyle = 'black';
        ctx.fillText(message, x, y);
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
		for (i = 1; i < RETA[id].n; i++)
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
		var fst = AREA[id].n - 1;	/* comeca pelo ultimo no' */
		var xc;
		var p1, p2; 			/* pontos da aresta */

		for (i = 0; i < AREA[id].n; i++){
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

	return my;						//Retorna o que é público
}());