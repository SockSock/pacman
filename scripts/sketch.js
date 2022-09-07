// Main class. This is the main entry point where the game starts when it is executed.

import {Board} from './board.js';
import {Pacman} from './pacman.js';
import {Score} from './score.js';
import {Ghost} from "./ghost.js";
import {Lives} from "./lives.js";

let pacman;
let board;
let score;
let lives;
let red;
let pink;

// Loads and defines initial properties which are needed before the game starts.
window.setup = function() {
    rectMode(CENTER);
    createCanvas(600, 750);
    frameRate(60);
    board = new Board();
    score = new Score();
    lives = new Lives();
    pacman = new Pacman(board, score);
    red = new Ghost(10, 119, "red", "chase", pacman, board, lives);
    pink = new Ghost(180, 119, "pink", "cutoff", pacman, board, lives);
    red.setupPoints();
    red.updateLocations();
    pink.setupPoints();
    pink.updateLocations();
}

// Updates 60 frames per second to reload objects to update their locations.
window.draw = function() {
    scale(3);
    background(0);
    board.drawSprite();
    pacman.drawSprite();
    pacman.moveSprite();
    pacman.stopSprite();
    pacman.eatCollectible();
    score.drawSprite();
    lives.drawSprite();
    red.moveSprite();
    red.drawSprite();
    red.checkContact();
    pink.moveSprite();
    pink.drawSprite();
    pink.checkContact();
}

// Detects keys inputted by the user to allow for movement of Pac-Man.
window.keyPressed = function() {
    pacman.changeDirection();
}
