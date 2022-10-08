// Pacman class. Written by Anish Shastri, 25/06/22. Contains subroutines related to the movement and collision detection of Pac-Man.

import {Entity} from './entity.js';
import {getCellCoords} from "./utils.js";

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
        this.colour = "yellow";
        this.shape = "circle";
        this.score = score;
        this.grid = board.getGrid();
        this.x = 90;
        this.y = 182;
        this.xVel = 0.5
        this.yVel = 0;
        this.dir = "right";
        this.stopDir = "right";
        keyCode = 68;
        this.cellCoords = getCellCoords(this.x, this.y);
        this.passableTerrain = [0, 3];
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

    eatCollectible() {
        if (this.grid[this.cellCoords[1]][this.cellCoords[0]] === 0) {
            this.score.increaseScore();
            this.grid[this.cellCoords[1]][this.cellCoords[0]] = 3;
        }
    }

    reset() {
        this.x = 90;
        this.y = 182;
        this.xVel = 0.5
        this.yVel = 0;
        this.dir = "right";
        this.stopDir = "right";
        keyCode = 68;
        this.cellCoords = [Math.ceil((this.x-3)/7), Math.ceil((this.y-3)/7)];
    }

    // TODO: remove
    getLocation() {
        return this.cellCoords;
    }

    // TODO: remove
    getDir() {
        return this.stopDir;
    }
}
