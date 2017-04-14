//Module Pattern
var MENUPAINT = (function (){	
	var my = {};					//Variaveis e funções públicas
	
	my.selectOption = function(x,y){
		if(y < 100){
			if(x < 100)
				MODEACTIVE = 0;
			else
				MODETRANSFORM = 0;
		}
		else{
			if(y < 200){
				if(x < 100)
					MODEACTIVE = 1;
				else
					MODETRANSFORM = 2;
			}
			else{
				if(y < 300){
					if(x < 100)
						MODEACTIVE = 2;
					else
						MODETRANSFORM = 3;
				}
				else{
					if(y < 400){
						if(x < 100)
							PRIMITIVE = 0;
						else{}
					}
					else{
						if(y < 500){
							if(x < 100)
								PRIMITIVE = 1;
							else{}
						}
						else{
							if(y < 600){
								if(x < 100)
									PRIMITIVE = 2;
								else{}
							}
							else{
								if(y < 700){
									if(x < 100)
										PRIMITIVE = 3;
									else{}
								}
								else{
									if(x < 100)
										MODETRANSFORM = 1;
									else{}
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