// Main class. This is the main entry point where the game starts when it is executed.

import {Board} from './board.js';
import {Pacman} from './pacman.js';

let pacman;
let board;

// Loads and defines initial properties which are needed before the game starts.
window.setup = function() {
    rectMode(CENTER);
    createCanvas(600, 750);
    board = new Board();
    pacman = new Pacman();
}

// Updates 60 frames per second to reload objects to update their locations.
window.draw = function() {
    scale(3);
    background(0);
    board.drawSprite();
    pacman.drawSprite();
    pacman.moveSprite();
    pacman.stopSprite();
}

// Detects keys inputted by the user to allow for movement of Pac-Man.
window.keyPressed = function() {
    pacman.changeDirection();
}
