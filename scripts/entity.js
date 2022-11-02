// Entity abstract class. Written by Anish Shastri, 30/06/22. Used for overriding methods and to reuse subroutines.

import {Sprite} from './sprite.js';
import {getCellCoords} from "./utils.js";

const VELOCITY = 0.5;

export class Entity extends Sprite {
    constructor() {
        super();
        if (this.constructor === Entity) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    // Displays Pac-Man and the ghosts.
    drawSprite() {
        // Pac-Man
        fill(this.colour);
        if (this.shape === "circle") {
            circle(this.x+=this.xVel, this.y+=this.yVel, 7);
        }
        // Ghosts
        fill(this.colour);
        if (this.shape === "square") {
            rect(this.x+=this.xVel, this.y+=this.yVel, 7, 7);
        }
    }

    // Validation: Logic for the movement of Pac-Man and the ghosts.
    moveSprite() {
        // Stores the future location of Pac-Man in relation to the grid.
        this.cellCoords = getCellCoords(this.x, this.y);

        // Up
        if (this.dir === "up") {
            // Check if Pac-Man or a ghost is in the middle of a tile.
            if (this.x % 7 < 0.5) {
                // If he is, check if the tile above Pac-Man or a ghost is empty to move into (because direction is up).
                if (this.passableTerrain.includes(this.grid[this.cellCoords[1]-1][this.cellCoords[0]])) {
                    this.stopDir = "up";
                    this.xVel = 0;
                    this.yVel = -VELOCITY;
                }
            }
        }
        // Left
        if (this.dir === "left") {
            if (this.y % 7 < 0.5) {
                if (this.passableTerrain.includes(this.grid[this.cellCoords[1]][this.cellCoords[0]-1])) {
                    this.stopDir = "left";
                    this.xVel = -VELOCITY;
                    this.yVel = 0;
                }
            }
        }
        // Down
        if (this.dir === "down") {
            if (this.x % 7 < 0.5) {
                if (this.passableTerrain.includes(this.grid[this.cellCoords[1]+1][this.cellCoords[0]])) {
                    this.stopDir = "down";
                    this.xVel = 0;
                    this.yVel = VELOCITY;
                }
            }
        }
        // Right
        if (this.dir === "right") {
            if (this.y % 7 < 0.5) {
                if (this.passableTerrain.includes(this.grid[this.cellCoords[1]][this.cellCoords[0]+1])) {
                    this.stopDir = "right";
                    this.xVel = VELOCITY;
                    this.yVel = 0;
                }
            }
        }
    }

    // Validation: Logic for the collision detection of Pac-Man and the ghosts.
    stopSprite() {
        // Up
        // Check if the tile above Pac-Man or a ghost is a wall (because direction is up).
        if (this.grid[this.cellCoords[1]-1][this.cellCoords[0]] === 1 && this.stopDir === "up") {
            // If he is, stop Pac-Man or a ghost if the current location of Pac-Man or a ghost equals their future
            // location, stored in the cellCoords array.
            if ((this.x/7) === this.cellCoords[0] && (this.y/7) === this.cellCoords[1]) {
                this.yVel = 0;
            }
        }
        // Left
        if (this.grid[this.cellCoords[1]][this.cellCoords[0]-1] === 1 && this.stopDir === "left") {
            if ((this.x/7) === this.cellCoords[0] && (this.y/7) === this.cellCoords[1]) {
                this.xVel = 0;
            }
        }
        // Down
        if (this.grid[this.cellCoords[1]+1][this.cellCoords[0]] === 1 && this.stopDir === "down") {
            if ((this.x/7) === this.cellCoords[0] && (this.y/7) === this.cellCoords[1]) {
                this.yVel = 0;
            }
        }
        // Right
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
