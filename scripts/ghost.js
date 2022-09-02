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
        console.log(this.dir);
        this.cellCoords = [Math.ceil((this.x-3)/7), Math.ceil((this.y-3)/7)];
        this.pacmanCellCoords  = this.pacman.getLocation();

        if (!(this.cellCoords[0] === this.pacmanCellCoords[0] && this.cellCoords[1] === this.pacmanCellCoords[1])) {
            // Left
            if (this.cellCoords[0] > this.pacmanCellCoords[0] && this.dir !== "right") {
                if (!(this.y % 7 === 0)) {

                } else if (this.grid[this.cellCoords[1]][this.cellCoords[0]-1] === 0 || this.grid[this.cellCoords[1]][this.cellCoords[0]-1] === 3) {
                    this.xVel = -0.5;
                    this.yVel = 0;
                    this.dir = "left";
                }
              // Right
            } else if (this.cellCoords[0] < this.pacmanCellCoords[0] && this.dir !== "left") {
                if (!(this.y % 7 === 0)) {

                } else if (this.grid[this.cellCoords[1]][this.cellCoords[0]+1] === 0 || this.grid[this.cellCoords[1]][this.cellCoords[0]+1] === 3) {
                    this.xVel = 0.5;
                    this.yVel = 0;
                    this.dir = "right";
                }
              // Up
            } else if (this.cellCoords[1] > this.pacmanCellCoords[1] && this.dir !== "down") {
                if (!(this.x % 7 === 0)) {

                } else if (this.grid[this.cellCoords[1]-1][this.cellCoords[0]] === 0 || this.grid[this.cellCoords[1]-1][this.cellCoords[0]] === 3) {
                    this.xVel = 0;
                    this.yVel = -0.5;
                    this.dir = "up";
                }
              // Down
            } else if (this.cellCoords[1] < this.pacmanCellCoords[1] && this.dir !== "up") {
                if (!(this.x % 7 === 0)) {

                } else if (this.grid[this.cellCoords[1]+1][this.cellCoords[0]] === 0 || this.grid[this.cellCoords[1]+1][this.cellCoords[0]] === 3) {
                    this.xVel = 0;
                    this.yVel = 0.5;
                    this.dir = "down";
                }
            }
        }
    }
}