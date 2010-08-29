/**
 * Collection of global variables and methods
 */
Domingo.keyMap = {
	up: [38],
	down: [40],
	right: [39],
	left: [37],
	'-': [189, 109],
	'+': [187, 61]
}

Domingo._canvas = {}
Domingo.keyState = {}
Domingo.createCanvas = function(name, width, height) {
	var canvas = document.createElement("canvas");
	canvas.setAttribute('height', height);
	canvas.setAttribute('width', width);
	Domingo._canvas[name] = canvas;
	return canvas;
}
Domingo.getCanvas = function(name) {
	console.log("getting " + name)
	return Domingo._canvas[name];
}
Domingo.keyIsPressed = function(key) {  
	if (Domingo.keyMap[key]) {
		for (i = 0; i < Domingo.keyMap[key].length; ++i) {
			if (Domingo.keyState[Domingo.keyMap[key][i]] == 1) return true;
		}
	} 
	return false;
}
Domingo.keyJustReleased = function(key) { 
	if (Domingo.keyMap[key]) {
		for (i = 0; i < Domingo.keyMap[key].length; ++i) {
			if (Domingo.keyState[Domingo.keyMap[key][i]] == 2) return true;
		}
	} 
	return false;
}
Domingo.onKeyUp = function(e) { Domingo.keyState[e.keyCode] = 2; }
Domingo.onKeyDown = function(e) { Domingo.keyState[e.keyCode] = 1; }
Domingo.onMouseDown = function() {}
Domingo.onMouseOver = function() {}
Domingo.onMouseOut = function() {}
