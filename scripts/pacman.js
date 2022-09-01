// Pacman class. Contains subroutines related to the movement and collision detection of Pac-Man.

import {Entity} from './entity.js';

export class Pacman extends Entity {
    grid;
    cellCoords;
    x;
    y;
    xVel;
    yVel;
    dir;
    stopDir; // Direction used to calculate collision detection.

    constructor(board, score) {
        super();
        this.score = score;
        this.grid = board.getGrid();
        this.x = 90;
        this.y = 182;
        this.xVel = 0.5
        this.yVel = 0;
        this.dir = "right";
        this.stopDir = "right";
        keyCode = 68;
        this.cellCoords = [Math.ceil((this.x-3)/7), Math.ceil((this.y-3)/7)];
    }

    // Displays Pac-Man.
    drawSprite() {
        fill(255, 255, 0)
        circle(this.x+=this.xVel, this.y+=this.yVel, 7);
    }

    // Validation: Logic for the movement of Pac-Man.
    moveSprite() {
        // Stores the future location of Pac-Man in relation to the grid.
        this.cellCoords = [Math.ceil((this.x-3)/7), Math.ceil((this.y-3)/7)];

        // W
        if (this.dir === "up") {
            // Check if Pac-Man is in the middle of a tile.
            if (!(this.x % 7 === 0)) {

              // If he is, check if the tile above Pac-Man is empty to move into (because direction is up).
            } else if (this.grid[this.cellCoords[1]-1][this.cellCoords[0]] === 0 || this.grid[this.cellCoords[1]-1][this.cellCoords[0]] === 3) {
                this.stopDir = "up";
                this.xVel = 0;
                this.yVel = -0.5;
            }
        }
        // A
        if (this.dir === "left") {
            if (!(this.y % 7 === 0)) {

            } else if (this.grid[this.cellCoords[1]][this.cellCoords[0]-1] === 0 || this.grid[this.cellCoords[1]][this.cellCoords[0]-1] === 3) {
                this.stopDir = "left";
                this.xVel = -0.5;
                this.yVel = 0;
            }
        }
        // S
        if (this.dir === "down") {
            if (!(this.x % 7 === 0)) {

            } else if (this.grid[this.cellCoords[1]+1][this.cellCoords[0]] === 0 || this.grid[this.cellCoords[1]+1][this.cellCoords[0]] === 3) {
                this.stopDir = "down";
                this.xVel = 0;
                this.yVel = 0.5;
            }
        }
        // D
        if (this.dir === "right") {
            if (!(this.y % 7 === 0)) {

            } else if (this.grid[this.cellCoords[1]][this.cellCoords[0]+1] === 0 || this.grid[this.cellCoords[1]][this.cellCoords[0]+1] === 3) {
                this.stopDir = "right";
                this.xVel = 0.5;
                this.yVel = 0;
            }
        }
    }

    // Validation: Logic for user inputs to be registered properly.
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

    // Validation: Logic for the collision detection of Pac-Man.
    stopSprite() {
        // W
        // Check if the tile above Pac-Man is a wall (because direction is up).
        if (this.grid[this.cellCoords[1]-1][this.cellCoords[0]] === 1 && this.stopDir === "up") {
            // If he is, stop Pac-Man if the current location of Pac-Man equals his future location, stored
            // in the cellCoords array.
            if ((this.x/7) === this.cellCoords[0] && (this.y/7) === this.cellCoords[1]) {
                this.yVel = 0;
            }
        }
        // A
        if (this.grid[this.cellCoords[1]][this.cellCoords[0]-1] === 1 && this.stopDir === "left") {
            if ((this.x/7) === this.cellCoords[0] && (this.y/7) === this.cellCoords[1]) {
                this.xVel = 0;
            }
        }
        // S
        if (this.grid[this.cellCoords[1]+1][this.cellCoords[0]] === 1 && this.stopDir === "down") {
            if ((this.x/7) === this.cellCoords[0] && (this.y/7) === this.cellCoords[1]) {
                this.yVel = 0;
            }
        }
        // D
        if (this.grid[this.cellCoords[1]][this.cellCoords[0]+1] === 1 && this.stopDir === "right") {
            if ((this.x/7) === this.cellCoords[0] && (this.y/7) === this.cellCoords[1]) {
                this.xVel = 0;
            }
        }
    }

    eatCollectible() {
        if (this.grid[this.cellCoords[1]][this.cellCoords[0]] === 0) {
            this.score.increaseScore();
            this.grid[this.cellCoords[1]][this.cellCoords[0]] = 3;
        }
    }

    getLocation() {
        return this.cellCoords;
    }
}
