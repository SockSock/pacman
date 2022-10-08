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
let redGhost;
let pinkGhost;
let blueGhost;
let orangeGhost;
let ghosts;

// Loads and defines initial properties which are needed before the game starts.
window.setup = function() {
    rectMode(CENTER);
    createCanvas(600, 750);
    frameRate(60);
    board = new Board();
    score = new Score();
    lives = new Lives();
    pacman = new Pacman(board, score);
    redGhost = new Ghost(10, 119, "red", "chase", pacman, board, lives);
    pinkGhost = new Ghost(180, 119, "pink", "chase", pacman, board, lives);
    blueGhost = new Ghost(98, 119, "cyan", "chase", pacman, board, lives);
    orangeGhost = new Ghost(150, 119, "orange", "chase", pacman, board, lives);
    ghosts = [redGhost, pinkGhost, blueGhost, orangeGhost];
    for (let i = 0; i < ghosts.length; i++) {
        ghosts[i].setupPoints();
        ghosts[i].updateLocations();
    }
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

    for (let i = 0; i < ghosts.length; i++) {
        ghosts[i].drawSprite();
        ghosts[i].moveSprite();
        ghosts[i].stopSprite();
        ghosts[i].changeDirection();
        ghosts[i].checkContact();
    }

    score.drawSprite();

    lives.drawSprite();
}

// Detects keys inputted by the user to allow for movement of Pac-Man.
window.keyPressed = function() {
    pacman.changeDirection();
}
