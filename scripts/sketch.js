let pacman;
let board;

function setup() {
    frameRate(20);
    rectMode(CENTER);
    createCanvas(224, 288);
    keyCode = 65;
    board = new Board();
    pacman = new Pacman();
}

function draw() {
    background(0);
    board.drawSprite();
    pacman.drawSprite();
    pacman.moveSprite();
}