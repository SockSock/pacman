import {Board} from './board.js';
import {Entity} from './entity.js';

export class Pacman extends Entity {
    grid;
    pacmanXPos;
    pacmanYPos;
    pacmanXChange;
    pacmanYChange

    constructor() {
        super();
        let board = new Board();
        this.grid = board.getGrid();
        this.pacmanXPos = 112;
        this.pacmanYPos = 208;
        this.pacmanXChange = 8
        this.pacmanYChange = 0;
    }

    drawSprite() {
        fill(255, 255, 0)
        circle(this.pacmanXPos+=this.pacmanXChange, this.pacmanYPos+=this.pacmanYChange, 8);
    }

    moveSprite() {
        // A
        if (keyCode === 65) {
            if (this.grid[this.pacmanYPos/8][this.pacmanXPos/8] === 1) {
                this.pacmanXChange = 0;
                this.pacmanYChange = 0;
                this.pacmanXPos += 8;
            } else {
                this.pacmanXChange = -8;
                this.pacmanYChange = 0;
            }
        }
        // D
        else if (keyCode === 68) {
            if (this.grid[this.pacmanYPos/8][this.pacmanXPos/8] === 1) {
                this.pacmanXChange = 0;
                this.pacmanYChange = 0;
                this.pacmanXPos -= 8;
            } else {
                this.pacmanXChange = 8;
                this.pacmanYChange = 0;
            }
        }
        // W
        else if (keyCode === 87) {
            if (this.grid[this.pacmanYPos/8][this.pacmanXPos/8] === 1) {
                this.pacmanXChange = 0;
                this.pacmanYChange = 0;
                this.pacmanYPos += 8;
            } else {
                this.pacmanXChange = 0;
                this.pacmanYChange = -8;
            }
        }
        // S
        else if (keyCode === 83) {
            if (this.grid[this.pacmanYPos/8][this.pacmanXPos/8] === 1) {
                this.pacmanXChange = 0;
                this.pacmanYChange = 0;
                this.pacmanYPos -= 8;
            } else {
                this.pacmanXChange = 0;
                this.pacmanYChange = 8;
            }
        }
    }
}