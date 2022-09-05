import {Entity} from './entity.js';
import {Board} from './board.js';
import {Point} from './point.js';

export class Ghost extends Entity {
    grid;
    cellCoords;
    pacmanCellCoords;
    x;
    y;
    xVel;
    yVel;
    dir;
    start;
    end;
    openSet;
    board;
    path;

    constructor(pacman) {
        super();
        this.pacman = pacman;
        this.board = new Board();
        this.grid = this.board.getGrid();
        this.pacmanCellCoords  = pacman.getLocation();
        this.x = 90;
        this.y = 98;
        this.xVel = 0.5;
        this.yVel = 0;
        this.dir = "right";
        this.cellCoords = 0;
        this.start = 0;
        this.end = 0;
        this.openSet = [];
        this.path = [];
    }

    drawSprite() {
            for (let i = 0; i < this.path.length; i++) {
                fill(255, 0, 0);
                rect(this.path[i].y*7, this.path[i].x*7, 7, 7);
            }
    }

    moveSprite() {
        this.cellCoords = [Math.ceil((this.x-3)/7), Math.ceil((this.y-3)/7)];
        this.pacmanCellCoords = this.pacman.getLocation();
        this.start = this.grid[this.cellCoords[1]][this.cellCoords[0]];
        this.end = this.grid[this.pacmanCellCoords[1]][this.pacmanCellCoords[0]];
        this.openSet.push(this.start);

        if (this.openSet.length > 0) {
            let current = this.openSet[0];
            if (current === this.end) {
                console.log("Done.")
            }

            this.openSet.splice(0, 1);
            let neighbours = current.neighbours;
            for (let i = 0; i < neighbours.length; i++) {
                let neighbour = neighbours[i];
                let tentativeGScore = neighbour.g + 1;
                if (tentativeGScore < neighbour.g) {
                    neighbour.g = tentativeGScore;
                    neighbour.f = tentativeGScore + this.heuristic(neighbour, this.end);
                    if (!(this.openSet.includes(neighbour)) && !neighbour.wall) {
                        this.openSet.push(neighbour);
                        this.path.push(current);
                    }
                }
            }
        }

    }

    setupPoints() {
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid.length; j++) {
                if (this.grid[i][j] === 0 || this.grid[i][j] === 3) {
                    this.grid[i][j] = new Point(i, j, false);
                }
                if (this.grid[i][j] === 1 || this.grid[i][j] === 2) {
                    this.grid[i][j] = new Point(i, j, true);
                }
            }
        }
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid.length; j++) {
                if (this.grid[i][j] instanceof Point) {
                    this.grid[i][j].addNeighbours(this.grid);
                }
            }
        }
    }

    heuristic(a, b) {
        return abs(a.x - b.x) + abs(a.y - b.y);
    }
 }