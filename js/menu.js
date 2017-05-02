//Module Pattern
var MENUPAINT = (function (){	
	var my = {};					//Variaveis e funções públicas
	//Seleção de opção
	my.selectOption = function(x,y){
		if((DRAWINGRETA == DRAWINGAREA) && (DRAWINGAREA == DRAWINGCIR)){
			if(y < 100){
				if(x < 100)				//Primeiro botão
					MODEACTIVE = 0;
				else					//Nono botão
					MODETRANSFORM = 0;
			}
			else{
				if(y < 200){			
					if(x < 100)					//Segundo botão
						MODEACTIVE = 1;
					else						//Decimo botão
						MODETRANSFORM = 2;
				}
				else{
					if(y < 300){		
						if(x < 100)					//Terceiro botão
							MODEACTIVE = 2;
						else						//Decimo Primeiro botão
							MODETRANSFORM = 3;
					}
					else{
						if(y < 400){
							if(x < 100)					//Quarto botão
								PRIMITIVE = 0;
							else						//Decimo Segundo botão
								MODETRANSFORM = 4;
						}
						else{
							if(y < 500){
								if(x < 100)				//Quinto botão
									PRIMITIVE = 1;
								else					//Decimo Terceiro botão
									MODETRANSFORM = 5;
							}
							else{
								if(y < 600){
									if(x < 100)				//Sexto botão
										PRIMITIVE = 2;
									else{}					//Decimo Quarto botão
								}
								else{
									if(y < 700){
										if(x < 100)				//Setimo botão
											PRIMITIVE = 3;
										else{}					//Decimo quinto botão
									}
									else{
										if(x < 100)				//Oitavo botão
											MODETRANSFORM = 1;
										else{}					//Decimo sexto botão
									}
								}
							}
						}
					}
				}
			}
		}
	};
	
	return my;					//Retorna o que é público
}());