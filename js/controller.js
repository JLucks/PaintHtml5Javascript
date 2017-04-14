window.onload = function () {
	canvasPaint = document.getElementById('myPaint');
	ctxPaint = canvasPaint.getContext('2d');

	canvasMenu = document.getElementById('myMenu');
	ctxMenu = canvasMenu.getContext('2d');

    DRAW.drawMenu(ctxMenu);

    canvasMenu.addEventListener('click', function(evt) {
    	mousePos = FUNCTIONS.getMousePos(canvasMenu, evt);
    	MENUPAINT.selectOption(mousePos.x, mousePos.y);
    }, false);

	canvasPaint.addEventListener('mousemove', function(evt) {
		mousePos = FUNCTIONS.getMousePos(canvasPaint, evt);
		message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y + "  ModeRWD: " + MODEACTIVE + " ModeT: " + MODETRANSFORM + " Primitive: " + PRIMITIVE;
		FUNCTIONS.writeMessage(canvasPaint, message, 10, 25);
	}, false);
}