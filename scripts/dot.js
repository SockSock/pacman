import {Board} from './board.js';
import {Pacman} from './pacman.js';
import {Collectible} from './collectible.js';
import {Score} from './score.js';

export class Dot extends Collectible {
    grid;
    score;

    constructor() {
        super();
        let board = new Board();
        let pacman = new Pacman();
        this.score = new Score();
        this.grid = board.getGrid();
        this.cellCoords = pacman.getCoords();
    }

    eatCollectible() {
        if (this.grid[this.cellCoords[1]][this.cellCoords[0]] === 0) {
            this.score.increaseScore();
            this.grid[this.cellCoords[1]][this.cellCoords[0]] = 1
        }
    }
}
