// Board class. Written by Anish Shastri, 25/06/22. Validation: Contains a subroutine to generate the layout of the maze according to the grid array.

import {Sprite} from "./sprite.js";
import {getLevel} from "./level.js";

export class Board extends Sprite {
    constructor() {
        super();
        this.grid = getLevel();
    }

    drawSprite() {
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid.length;  j++) {
                if (this.grid[j][i] === 0) {
                    noStroke();
                    fill(255, 255, 0); // Yellow
                    circle(i * 7, j * 7, 2);
                }
                if (this.grid[j][i] === 1) {
                    noStroke();
                    fill(0, 0, 255);
                    rect(i * 7, j * 7, 7, 7);
                }
                if (this.grid[j][i] === 4) {
                    noStroke();
                    fill(34, 139, 34); // Forest Green
                    circle(i * 7, j * 7, 6);
                }
            }
        }
    }
}
