// Pacman class.

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
    stopDir;

    constructor() {
        super();
        let board = new Board();
        this.grid = board.getGrid();
        this.pacmanXPos = 90;
        this.pacmanYPos = 182;
        this.pacmanXChange = 0.5
        this.pacmanYChange = 0;
        this.dir = "right";
        this.stopDir = "right";
        keyCode = 68;
        this.cellCoords = [Math.ceil((this.pacmanXPos-3)/7), Math.ceil((this.pacmanYPos-3)/7)];
    }

    drawSprite() {
        fill(255, 255, 0)
        circle(this.pacmanXPos+=this.pacmanXChange, this.pacmanYPos+=this.pacmanYChange, 7);
    }

    moveSprite() {
        this.cellCoords = [Math.ceil((this.pacmanXPos-3)/7), Math.ceil((this.pacmanYPos-3)/7)];

        // W
        if (this.dir === "up") {
            if (!(this.pacmanXPos % 7 === 0)) {

            } else if (this.grid[this.cellCoords[1]-1][this.cellCoords[0]] === 0) {
                this.stopDir = "up";
                this.pacmanXChange = 0;
                this.pacmanYChange = -0.5;
            }
        }
        // A
        if (this.dir === "left") {
            if (!(this.pacmanYPos % 7 === 0)) {

            } else if (this.grid[this.cellCoords[1]][this.cellCoords[0]-1] === 0) {
                this.stopDir = "left";
                this.pacmanXChange = -0.5;
                this.pacmanYChange = 0;
            }
        }
        // S
        if (this.dir === "down") {
            if (!(this.pacmanXPos % 7 === 0)) {

            } else if (this.grid[this.cellCoords[1]+1][this.cellCoords[0]] === 0) {
                this.stopDir = "down";
                this.pacmanXChange = 0;
                this.pacmanYChange = 0.5;
            }
        }
        // D
        if (this.dir === "right") {
            if (!(this.pacmanYPos % 7 === 0)) {

            } else if (this.grid[this.cellCoords[1]][this.cellCoords[0]+1] === 0) {
                this.stopDir = "right";
                this.pacmanXChange = 0.5;
                this.pacmanYChange = 0;
            }
        }
    }

    changeDirection() {
        // W
        if (keyCode === 87 || keyCode === UP_ARROW) {
            this.dir = "up";
        }
        // A
        if (keyCode === 65 || keyCode === LEFT_ARROW) {
            this.dir = "left";
        }
        // S
        if (keyCode === 83 || keyCode === DOWN_ARROW) {
            this.dir = "down";
        }
        // D
        if (keyCode === 68 || keyCode === RIGHT_ARROW) {
            this.dir = "right";
        }
    }

    stopSprite() {
        // W
        if (this.grid[this.cellCoords[1]-1][this.cellCoords[0]] === 1 && this.stopDir === "up") {
            if ((this.pacmanXPos/7) === this.cellCoords[0] && (this.pacmanYPos/7) === this.cellCoords[1]) {
                this.pacmanYChange = 0;
            }
        }
        // A
        if (this.grid[this.cellCoords[1]][this.cellCoords[0]-1] === 1 && this.stopDir === "left") {
            if ((this.pacmanXPos/7) === this.cellCoords[0] && (this.pacmanYPos/7) === this.cellCoords[1]) {
                this.pacmanXChange = 0;
            }
        }
        // S
        if (this.grid[this.cellCoords[1]+1][this.cellCoords[0]] === 1 && this.stopDir === "down") {
            if ((this.pacmanXPos/7) === this.cellCoords[0] && (this.pacmanYPos/7) === this.cellCoords[1]) {
                this.pacmanYChange = 0;
            }
        }
        // D
        if (this.grid[this.cellCoords[1]][this.cellCoords[0]+1] === 1 && this.stopDir === "right") {
            if ((this.pacmanXPos/7) === this.cellCoords[0] && (this.pacmanYPos/7) === this.cellCoords[1]) {
                this.pacmanXChange = 0;
            }
        }
    }
}
