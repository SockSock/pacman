// Main class. Written by Anish Shastri, 25/06/22. This is the main entry point where the game starts when it is executed.

import {Board} from './board.js';
import {Pacman} from './pacman.js';
import {Score} from './score.js';
import {Ghost} from "./ghost.js";
import {Lives} from "./lives.js";
import {Menu} from './menu.js';
import {getMode, getDifficulty} from "./utils.js";
import {Sound} from "./sound.js";

let backgroundMusic;
let collectDot;
let eatGhost;
let sound;
let menu;
let mode;
let difficulty;
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
    createCanvas(567, 750);
    frameRate(60);
    textAlign(CENTER);

    // Sound from Zapsplat.com
    backgroundMusic = new Audio('assets/background_music.mp3');
    backgroundMusic.loop = true;
    collectDot = new Audio('assets/collect_dot.mp3');
    eatGhost = new Audio('assets/eat_ghost.mp3');

    // Initialize the objects.
    board = new Board();
    score = new Score();
    menu = new Menu(score);
    sound = new Sound(backgroundMusic, collectDot, eatGhost, menu);
    lives = new Lives(menu);
    pacman = new Pacman(board, score, sound, menu);
    redGhost = new Ghost(42, 119, "blinky", "red", false, pacman, board, lives, menu);
    pinkGhost = new Ghost(42, 56, "pinky", "pink", false, pacman, board, lives, menu);
    blueGhost = new Ghost(147, 56, "inky", "cyan", false, pacman, board, lives, menu);
    orangeGhost = new Ghost(147, 119, "clyde", "orange", false, pacman, board, lives, menu);
    ghosts = [redGhost, pinkGhost, blueGhost, orangeGhost];
    for (let i = 0; i < ghosts.length; i++) {
        ghosts[i].setupPoints();
        ghosts[i].updateLocations();
    }
}

// Validation: Updates 60 frames per second to reload objects to update their locations.
window.draw = function() {
    mode = getMode(menu); // Gets the current mode of the game from the menu.
    difficulty = getDifficulty(menu); // Gets the current speed of the ghosts from the menu.
    scale(3); // Makes the game larger for better visibility.
    background(0);
    menu.drawMainMenu();
    menu.drawSettingsMenu();
    menu.drawRestartMenu();
    menu.drawInstructions();
    sound.controlBackgroundMusic();
    pacman.restart();
    if (mode === "play") {
        board.drawSprite();
        pacman.drawSprite();
        pacman.moveSprite(0.5);
        pacman.stopSprite();
        pacman.eatCollectible(ghosts);
        pacman.enterWarpTunnel();
        for (let i = 0; i < ghosts.length; i++) {
            ghosts[i].drawSprite();
            ghosts[i].moveSprite(difficulty);
            ghosts[i].stopSprite();
            ghosts[i].changeDirection();
            ghosts[i].checkContact(ghosts);
            ghosts[i].setScatterSpeedAndColour();
        }
        score.drawSprite();
        lives.drawSprite();
    }
}

// Detects keys inputted by the user to allow for movement of Pac-Man.
window.keyPressed = function() {
    pacman.changeDirection();
    menu.returnToMainMenu();
}

// Detects mouse clicks inputted by the user to allow for the selection of menu options.
window.mouseClicked = function() {
    menu.clickMenuButton();
}
