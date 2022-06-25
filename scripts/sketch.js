import {Board} from './board.js';
import {Pacman} from './pacman.js';

let pacman;
let board;

window.setup = function() {
    frameRate(20);
    rectMode(CENTER);
    createCanvas(224, 288);
    keyCode = 65;
    board = new Board();
    pacman = new Pacman();
}

window.draw = function() {
    background(0);
    board.drawSprite();
    pacman.drawSprite();
    pacman.moveSprite();
}