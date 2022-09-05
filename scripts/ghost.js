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
    closedSet;
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
        this.closedSet = [];
        this.path = [];
    }

    drawSprite() {
            for (let i = 0; i < this.path.length; i++) {
                fill(255, 0, 0);
                rect(this.path[i].y*7, this.path[i].x*7, 7, 7);
            }
            for (let i = 0; i < this.openSet.length; i++) {
                fill(0, 255, 0);
                rect(this.openSet[i].y*7, this.openSet[i].x*7, 7, 7);
            }
    }

    moveSprite() {
        this.pacmanCellCoords = this.pacman.getLocation();
        this.end = this.grid[this.pacmanCellCoords[1]][this.pacmanCellCoords[0]];

        if (this.openSet.length > 0) {
            let current = this.openSet[0];
            if (current === this.end) {
                let temp = current;
                this.path.push(temp);
                while (temp.cameFrom) {
                    this.path.push(temp.cameFrom);
                    temp = temp.cameFrom;
                }
                console.log("Done.")
            }

            this.openSet.splice(0, 1);
            this.closedSet.push(current);
            let neighbours = current.neighbours;
            for (let i = 0; i < neighbours.length; i++) {
                let neighbour = neighbours[i];

                if (!(this.closedSet.includes(neighbour)) && !neighbour.wall) {
                    let tentativeGScore = current.g + 1;

                    let newPath = false;
                    if (this.openSet.includes(neighbour)) {
                        if (tentativeGScore < neighbour.g) {
                            neighbour.g = tentativeGScore;
                            newPath = true;
                        }
                    } else {
                        neighbour.g = tentativeGScore;
                        newPath = true;
                        this.openSet.push(neighbour);
                    }

                    if (newPath) {
                        neighbour.h = this.heuristic(neighbour, this.end);
                        neighbour.f = neighbour.g + neighbour.h;
                        neighbour.cameFrom = current;
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
        this.cellCoords = [Math.ceil((this.x-3)/7), Math.ceil((this.y-3)/7)];
        this.start = this.grid[this.cellCoords[1]][this.cellCoords[0]];
        this.openSet.push(this.start);
    }

    heuristic(a, b) {
        return abs(a.x - b.x) + abs(a.y - b.y);
    }
 }