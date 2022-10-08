// Entity abstract class. Used for overriding methods.

import {Sprite} from './sprite.js';
import {getCellCoords} from "./utils.js";

export class Entity extends Sprite {
    constructor() {
        super();
        if (this.constructor === Entity) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    // Displays Pac-Man.
    drawSprite() {
        fill(255, 255, 0)
        circle(this.x+=this.xVel, this.y+=this.yVel, 7);
    }

    // Validation: Logic for the movement of Pac-Man.
    moveSprite() {
        // Stores the future location of Pac-Man in relation to the grid.
        this.cellCoords = getCellCoords(this.x, this.y);

        // W
        if (this.dir === "up") {
            // Check if Pac-Man is in the middle of a tile.
            if (this.x % 7 === 0) {
                // If he is, check if the tile above Pac-Man is empty to move into (because direction is up).
                if (this.grid[this.cellCoords[1]-1][this.cellCoords[0]] === 0 || this.grid[this.cellCoords[1]-1][this.cellCoords[0]] === 3) {
                    this.stopDir = "up";
                    this.xVel = 0;
                    this.yVel = -0.5;
                }
            }
        }
        // A
        if (this.dir === "left") {
            if (this.y % 7 === 0) {
                if (this.grid[this.cellCoords[1]][this.cellCoords[0]-1] === 0 || this.grid[this.cellCoords[1]][this.cellCoords[0]-1] === 3) {
                    this.stopDir = "left";
                    this.xVel = -0.5;
                    this.yVel = 0;
                }
            }
        }
        // S
        if (this.dir === "down") {
            if (this.x % 7 === 0) {
                if (this.grid[this.cellCoords[1]+1][this.cellCoords[0]] === 0 || this.grid[this.cellCoords[1]+1][this.cellCoords[0]] === 3) {
                    this.stopDir = "down";
                    this.xVel = 0;
                    this.yVel = 0.5;
                }
            }
        }
        // D
        if (this.dir === "right") {
            if (this.y % 7 === 0) {
                if (this.grid[this.cellCoords[1]][this.cellCoords[0]+1] === 0 || this.grid[this.cellCoords[1]][this.cellCoords[0]+1] === 3) {
                    this.stopDir = "right";
                    this.xVel = 0.5;
                    this.yVel = 0;
                }
            }
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

    changeDirection() {
        throw new Error("changeDirection unimplemented.")
    }
}
