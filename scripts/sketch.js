import {Board} from './board.js';
import {Pacman} from './pacman.js';

let pacman;
let board;

window.setup = function() {
    rectMode(CENTER);
    createCanvas(600, 750);
    keyCode = 65;
    board = new Board();
    pacman = new Pacman();
}

window.draw = function() {
    scale(3);
    background(0);
    board.drawSprite();
    pacman.drawSprite();
    pacman.moveSprite();
    pacman.stopSprite();
}

window.keyPressed = function() {
    pacman.changeDirection();
}