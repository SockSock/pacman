import {Entity} from './entity.js';

export class Ghost extends Entity {
    grid;
    cellCoords;
    pacmanCellCoords;
    x;
    y;
    xVel;
    yVel;
    dir;
    pacman;

    constructor(board, pacman) {
        super();
        this.pacman = pacman;
        this.grid = board.getGrid();
        this.pacmanCellCoords  = pacman.getLocation();
        this.x = 90;
        this.y = 98;
        this.xVel = 0.5;
        this.yVel = 0;
        this.dir = "right";
        this.cellCoords = [Math.ceil((this.x-3)/7), Math.ceil((this.y-3)/7)];
    }

    drawSprite() {
        fill(255, 0, 0)
        circle(this.x+=this.xVel, this.y+=this.yVel, 7);
    }

    moveSprite() {
        this.cellCoords = [Math.ceil((this.x-3)/7), Math.ceil((this.y-3)/7)];
        this.pacmanCellCoords  = this.pacman.getLocation();

        // Up
        if (!(this.x % 7 === 0)) {

        } else if (this.grid[this.cellCoords[1]-1][this.cellCoords[0]] === 0 || this.grid[this.cellCoords[1]-1][this.cellCoords[0]] === 3) {
            if (this.cellCoords[1] > this.pacmanCellCoords[1] && this.dir !== "down") {
                this.dir = "up";
                this.xVel = 0;
                this.yVel = -0.5;
            } else {

            }
        }

        // Left
        if (!(this.y % 7 === 0)) {

        } else if (this.grid[this.cellCoords[1]][this.cellCoords[0]-1] === 0 || this.grid[this.cellCoords[1]][this.cellCoords[0]-1] === 3) {
            if (this.cellCoords[0] > this.pacmanCellCoords[0] && this.dir !== "right") {
                this.dir = "left";
                this.xVel = -0.5;
                this.yVel = 0;
            } else {

            }
        }
        // Down
        if (!(this.x % 7 === 0)) {

        } else if (this.grid[this.cellCoords[1]+1][this.cellCoords[0]] === 0 || this.grid[this.cellCoords[1]+1][this.cellCoords[0]] === 3) {
            if (this.cellCoords[1] < this.pacmanCellCoords[1] && this.dir !== "up") {
                this.dir = "down";
                this.xVel = 0;
                this.yVel = 0.5;
            } else {

            }
        }
        // Right
        if (!(this.y % 7 === 0)) {

        } else if (this.grid[this.cellCoords[1]][this.cellCoords[0]+1] === 0 || this.grid[this.cellCoords[1]][this.cellCoords[0]+1] === 3) {
            if (this.cellCoords[0] < this.pacmanCellCoords[0] && this.dir !== "left") {
                this.dir = "right";
                this.xVel = 0.5;
                this.yVel = 0;
            } else {

            }
        }
    }

}