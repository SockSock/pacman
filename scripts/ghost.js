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
    distance;

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
        this.distance = 0;
    }

    drawSprite() {
        fill(255, 0, 0)
        circle(this.x+=this.xVel, this.y+=this.yVel, 7);
    }

    moveSprite() {
        this.cellCoords = [Math.ceil((this.x-3)/7), Math.ceil((this.y -3)/7)];
        this.pacmanCellCoords = this.pacman.getLocation();
        this.distance = Math.abs(this.cellCoords[0] - this.pacmanCellCoords[0]) + Math.abs(this.cellCoords[1] - this.pacmanCellCoords[1]);
        console.log(this.distance, this.dir);

        // Up
        if (this.grid[this.cellCoords[1]-1][this.cellCoords[0]] === 1) {

        } else if (this.dir !== "down" && (this.grid[this.cellCoords[1]-1][this.cellCoords[0]] === 0 || this.grid[this.cellCoords[1]-1][this.cellCoords[0]] === 3)) {
            if (this.x % 7 === 0) {
                if (Math.abs(this.cellCoords[0] - this.pacmanCellCoords[0]) + Math.abs(this.cellCoords[1]-1 - this.pacmanCellCoords[1]) < this.distance) {
                    this.dir = "up";
                    this.xVel = 0;
                    this.yVel = -0.5;
                }
            }
        }
        // Left
        if (this.grid[this.cellCoords[1]][this.cellCoords[0]-1] === 1) {

        } else if (this.dir !== "right" && (this.grid[this.cellCoords[1]][this.cellCoords[0]-1] === 0 || this.grid[this.cellCoords[1]][this.cellCoords[0]-1] === 3)) {
            if (this.y % 7 === 0) {
                if (Math.abs(this.cellCoords[0]-1 - this.pacmanCellCoords[0]) + Math.abs(this.cellCoords[1] - this.pacmanCellCoords[1]) < this.distance) {
                    this.dir = "left";
                    this.xVel = -0.5;
                    this.yVel = 0;
                }
            }
        }
        // Down
        if (this.grid[this.cellCoords[1]+1][this.cellCoords[0]] === 1) {

        } else if (this.dir !== "up" && (this.grid[this.cellCoords[1]+1][this.cellCoords[0]] === 0 || this.grid[this.cellCoords[1]+1][this.cellCoords[0]] === 3)) {
            if (this.x % 7 === 0) {
                if (Math.abs(this.cellCoords[0] - this.pacmanCellCoords[0]) + Math.abs(this.cellCoords[1]+1 - this.pacmanCellCoords[1]) < this.distance) {
                    this.dir = "down";
                    this.xVel = 0;
                    this.yVel = 0.5;
                }
            }
        }
        // Right
        if (this.grid[this.cellCoords[1]][this.cellCoords[0]+1] === 1) {

        } else if (this.dir !== "left" && (this.grid[this.cellCoords[1]][this.cellCoords[0]+1] === 0 || this.grid[this.cellCoords[1]][this.cellCoords[0]+1] === 3)) {
            if (this.y % 7 === 0) {
                if (Math.abs(this.cellCoords[0]+1 - this.pacmanCellCoords[0]) + Math.abs(this.cellCoords[1] - this.pacmanCellCoords[1]) < this.distance) {
                    this.dir = "right";
                    this.xVel = 0.5;
                    this.yVel = 0;
                }
            }
        }

    }
}