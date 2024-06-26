// Pacman class. Written by Anish Shastri, 25/06/22. Contains subroutines related to the movement and collision detection of Pac-Man.

import {Entity} from './entity.js';
import {getCellCoords, getGrid, getMode} from "./utils.js";
import {getLevel} from "./level.js";

export class Pacman extends Entity {

    constructor(board, score, sound, menu) {
        super();
        this.colour = "yellow";
        this.shape = "circle";
        this.score = score;
        this.board = board;
        this.grid = getGrid(board);
        this.sound = sound;
        this.menu = menu;
        this.x = 90;
        this.y = 182;
        this.xVel = 0.5;
        this.yVel = 0;
        this.dir = "right"; // Direction of Pac-Man.
        this.stopDir = "right"; // Direction used to calculate collision detection.
        keyCode = 68;
        this.cellCoords = getCellCoords(this.x, this.y);
        this.passableTerrain = [0, 3, 4];
    }

    // Validation: Logic for user inputs to be registered properly.
    changeDirection() {
        // Up
        if (keyCode === 87 || keyCode === UP_ARROW) {
            this.dir = "up";
        }
        // Left
        if (keyCode === 65 || keyCode === LEFT_ARROW) {
            this.dir = "left";
        }
        // Down
        if (keyCode === 83 || keyCode === DOWN_ARROW) {
            this.dir = "down";
        }
        // Right
        if (keyCode === 68 || keyCode === RIGHT_ARROW) {
            this.dir = "right";
        }
    }

    // Validation: Logic for checking if Pac-Man has eaten something.
    eatCollectible(ghosts) {
        // Dot collected
        if (this.grid[this.cellCoords[1]][this.cellCoords[0]] === 0) {
            this.score.increaseScore(1);
            // Play the sound effect.
            this.sound.playCollectDot();
            // Change the dot into a path.
            this.grid[this.cellCoords[1]][this.cellCoords[0]] = 3;
        }

        // Power pellet collected
        if (this.grid[this.cellCoords[1]][this.cellCoords[0]] === 4) {
            for (let i = 0; i < ghosts.length; i++) {
                // Check if scatter mode is already enabled.
                if (ghosts[i].scatter) {
                    ghosts[i].resetTimer = true;
                  // Otherwise, enable scatter mode.
                } else {
                    ghosts[i].scatter = true;
                }
            }
            this.grid[this.cellCoords[1]][this.cellCoords[0]] = 3;
        }

        // Ghost eaten
        for (let i = 0; i < ghosts.length; i++) {
            if (ghosts[i].scatter && this.cellCoords[0] === ghosts[i].cellCoords[0] && this.cellCoords[1] === ghosts[i].cellCoords[1]) {
                ghosts[i].reset();
                this.score.increaseScore(100);
                // Play the sound effect.
                this.sound.playEatGhost();
            }
        }
    }

    // Validation: Logic for checking if Pac-Man has entered a warp tunnel and teleporting him to the other side.
    enterWarpTunnel() {
        // Left warp tunnel
        if (this.x < -3) {
            this.x = 193;
        }
        // Right warp tunnel
        if (this.x > 193) {
            this.x = -3;
        }
    }

    // Resets the location of Pac-Man back to the starting position.
    reset() {
        this.x = 90;
        this.y = 182;
        this.xVel = 0.5;
        this.yVel = 0;
        this.dir = "right";
        this.stopDir = "right";
        keyCode = 68;
        this.cellCoords = getCellCoords(this.x, this.y);
    }

    // Validation: Gets the original grid structure from the level file and passes it into Pac-Man's grid if all lives
    // have been lost.
    restart() {
        if (getMode(this.menu) === "restart") {
            this.board.grid = getLevel();
            this.grid = getGrid(this.board);
        }
    }
}
