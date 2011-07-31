// Main Entry-Point of Program
include("PlayState.js");

Domingo.Game = new Domingo.Game(640,480,'game');
Domingo.Game.loadState(PlayState);
