import {Board} from './board.js';
import {Entity} from './entity.js';

export class Pacman extends Entity {
    grid;
    cellCoords;
    pacmanXPos;
    pacmanYPos;
    pacmanXChange;
    pacmanYChange;
    dir;

    constructor() {
        super();
        let board = new Board();
        this.grid = board.getGrid();
        this.pacmanXPos = 90;
        this.pacmanYPos = 182;
        this.pacmanXChange = 1
        this.pacmanYChange = 0;
        this.dir = "right";
        keyCode = 68;
        this.cellCoords = [Math.ceil(this.pacmanXPos/7), Math.ceil(this.pacmanYPos/7)];
    }

    drawSprite() {
        fill(255, 255, 0)
        circle(this.pacmanXPos+=this.pacmanXChange, this.pacmanYPos+=this.pacmanYChange, 7);
    }

    moveSprite() {
        this.cellCoords = [Math.ceil(this.pacmanXPos/7), Math.ceil(this.pacmanYPos/7)];
        // W
        if (this.dir === "up") {
            if (!(Math.ceil(this.cellCoords[0]/7) === 4 && Math.ceil(this.cellCoords[1]/7) === 4)) {
                this.pacmanXChange = 0;
                this.pacmanYChange = -1;
            } else if (this.grid[this.cellCoords[0]][this.cellCoords[1]-1] === 0) {
                this.pacmanXChange = 0;
                this.pacmanYChange = -1;
            } else {
                this.pacmanXChange = 0;
                this.pacmanYChange = 0;
            }
        }
        // A
        if (this.dir === "left") {
            if (!(Math.ceil(this.cellCoords[0]/7) === 4 && Math.ceil(this.cellCoords[1]/7) === 4)) {
                this.pacmanXChange = -1;
                this.pacmanYChange = 0;
            } else if (this.grid[this.cellCoords[0]-1][this.cellCoords[1]] === 0) {
                this.pacmanXChange = -1;
                this.pacmanYChange = 0;
            } else {

            }
        }
        // S
        if (this.dir === "down") {
            if (!(Math.ceil(this.cellCoords[0]/7) === 4 && Math.ceil(this.cellCoords[1]/7) === 4)) {
                this.pacmanXChange = 0;
                this.pacmanYChange = 1;
            } else if (this.grid[this.cellCoords[0]][this.cellCoords[1]+1] === 0) {
                this.pacmanXChange = 0;
                this.pacmanYChange = 1;
            } else {

            }
        }
        // D
        if (this.dir === "right") {
            if (!(Math.ceil(this.cellCoords[0]/7) === 4 && Math.ceil(this.cellCoords[1]/7) === 4)) {
                this.pacmanXChange = 1;
                this.pacmanYChange = 0;
            } else if (this.grid[this.cellCoords[0]+1][this.cellCoords[1]] === 0) {
                this.pacmanXChange = 1;
                this.pacmanYChange = 0;
            } else {

            }
        }
    }

    changeDirection() {
        // W
        if (keyCode === 87) {
            this.cellCoords = [Math.ceil(this.pacmanXPos/7), Math.ceil(this.pacmanYPos/7)];
            if (!(Math.ceil(this.cellCoords[0]/7) === 4 && Math.ceil(this.cellCoords[1]/7) === 4)) {
                this.moveSprite();
            } else if (this.grid[this.cellCoords[0]][this.cellCoords[1]-1] === 0) {
                keyCode = 87;
                this.dir = "up";
                this.moveSprite();
            } else {
                this.moveSprite();
            }
        }
        // A
        if (keyCode === 65) {
            this.cellCoords = [Math.ceil(this.pacmanXPos/7), Math.ceil(this.pacmanYPos/7)];
            if (!(Math.ceil(this.cellCoords[0]/7) === 4 && Math.ceil(this.cellCoords[1]/7) === 4)) {
                this.moveSprite();
            } else if (this.grid[this.cellCoords[0]-1][this.cellCoords[1]] === 0) {
                keyCode = 65;
                this.dir = "left";
                this.moveSprite();
            } else {
                this.moveSprite();
            }
        }
        // S
        if (keyCode === 83) {
            this.cellCoords = [Math.ceil(this.pacmanXPos/7), Math.ceil(this.pacmanYPos/7)];
            if (!(Math.ceil(this.cellCoords[0]/7) === 4 && Math.ceil(this.cellCoords[1]/7) === 4)) {
                this.moveSprite();
            } else if (this.grid[this.cellCoords[0]][this.cellCoords[1]+1] === 0) {
                keyCode = 83;
                this.dir = "down";
                this.moveSprite();
            } else {
                this.moveSprite();
            }
        }
        // D
        if (keyCode === 68) {
            this.cellCoords = [Math.ceil(this.pacmanXPos/7), Math.ceil(this.pacmanYPos/7)];
            if (!(Math.ceil(this.cellCoords[0]/7) === 4 && Math.ceil(this.cellCoords[1]/7) === 4)) {
                this.moveSprite();
            } else if (this.grid[this.cellCoords[0]+1][this.cellCoords[1]] === 0) {
                keyCode = 68;
                this.dir = "right";
                this.moveSprite();
            } else {
                this.moveSprite();
            }
        }
    }
}