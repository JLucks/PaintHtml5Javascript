var PONTO = [];						//Array com os pontos
var RETA = [];						//Array com as retas
var AREA = [];						//Array com as areas
var TOL = 2;						//Tolerância
var ID = 0;							//ID da ultima primitiva utilizada
var MODEACTIVE = 0; 				//Modo de escrita, seleção ou exclusão
var PRIMITIVE = 0;					//Modo ponto, reta, poligono ou circunferência
var MODETRANSFORM = 0;				//Translação, Rotação, Espelhamento ou Escala