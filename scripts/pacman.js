import Sprite from './sprite.js';

class Pacman extends Sprite {
    board;
    grid;
    pacmanXPos;
    pacmanYPos;
    pacmanXChange;
    pacmanYChange

    constructor() {
        super();
        this.board = new Board();
        this.grid = this.board.getGrid();
        this.pacmanXPos = 112;
        this.pacmanYPos = 208;
        this.pacmanXChange = 8
        this.pacmanYChange = 0;
    }

    drawPacMan() {
        fill(255, 255, 0)
        circle(this.pacmanXPos+=this.pacmanXChange, this.pacmanYPos+=this.pacmanYChange, 8);
    }

    move() {
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