// Main class. Written by Anish Shastri, 25/06/22. This is the main entry point where the game starts when it is executed.

import {Board} from './board.js';
import {Pacman} from './pacman.js';
import {Score} from './score.js';
import {Ghost} from "./ghost.js";
import {Lives} from "./lives.js";
import {Menu} from './menu.js';
import {getMode} from "./utils.js";

let menu;
let mode;
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
    menu = new Menu();
    board = new Board();
    score = new Score();
    lives = new Lives();
    pacman = new Pacman(board, score);
    redGhost = new Ghost(42, 119, "blinky", "red", false, pacman, board, lives);
    pinkGhost = new Ghost(42, 56, "pinky", "pink", false, pacman, board, lives);
    blueGhost = new Ghost(147, 56, "inky", "cyan", false, pacman, board, lives);
    orangeGhost = new Ghost(147, 119, "clyde", "orange", false, pacman, board, lives);
    ghosts = [redGhost, pinkGhost, blueGhost, orangeGhost];
    for (let i = 0; i < ghosts.length; i++) {
        ghosts[i].setupPoints();
        ghosts[i].updateLocations();
    }
}

// Updates 60 frames per second to reload objects to update their locations.
window.draw = function() {
    mode = getMode(menu);
    scale(3);
    background(0);
    menu.drawMainMenu();
    menu.drawSettingsMenu();
    if (mode === "play") {
        board.drawSprite();
        pacman.drawSprite();
        pacman.moveSprite();
        pacman.stopSprite();
        pacman.eatCollectible(ghosts);
        for (let i = 0; i < ghosts.length; i++) {
            ghosts[i].drawSprite();
            ghosts[i].moveSprite();
            ghosts[i].stopSprite();
            ghosts[i].changeDirection();
            ghosts[i].checkContact(ghosts);
            ghosts[i].scatterLogic();
        }
        score.drawSprite();
        lives.drawSprite();
    }
}

// Detects keys inputted by the user to allow for movement of Pac-Man.
window.keyPressed = function() {
    pacman.changeDirection();
}


window.mousePressed = function() {
    console.log(mouseX/3, mouseY/3);
    menu.menuLogic();
}
