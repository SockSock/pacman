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
    current;
    openSet;
    closedSet;
    board;
    path;

    constructor(pacman, board) {
        super();
        this.pacman = pacman;
        this.graph = new Board().getGrid();
        this.grid = board.getGrid();
        this.pacmanCellCoords  = pacman.getLocation();
        this.x = 91;
        this.y = 98;
        this.xVel = 0;
        this.yVel = 0;
        this.dir = "";
        this.cellCoords = 0;
    }

    drawSprite() {
        // Displays the ghost.
        fill(255, 0, 0)
        rect(this.x, this.y, 7, 7);

        // Makes the ghost move.
        if (frameCount % 10 === 0) {
            if (this.path.length > 0) {
                let next = this.path.pop();
                let x = next.x;
                let y = next.y;
                this.y = x*7;
                this.x = y*7;
            }
        }

        // Displays the chosen path.
        for (let i = 0; i < this.path.length; i++) {
            fill(0, 255, 0);
            rect(this.path[i].y*7, this.path[i].x*7, 7, 7);
        }
    }

    moveSprite() {
        if (frameCount % 30 === 0) {
            this.updateLocations();
        }
    }

    pathfind() {
        while (this.openSet.length > 0) {
            this.current = this.openSet[0];
            if (this.current === this.end) {
                let temp = this.current;
                this.path.push(temp);
                while (temp.cameFrom) {
                    this.path.push(temp.cameFrom);
                    temp = temp.cameFrom;
                }

                for (let i = 0; i < this.path.length; i++) {
                    this.path[i].cameFrom = undefined;
                }
                console.log(this.path);
                console.log("Done.")
            }

            this.openSet.splice(0, 1);
            this.closedSet.push(this.current);
            let neighbours = this.current.neighbours;
            for (let i = 0; i < neighbours.length; i++) {
                let neighbour = neighbours[i];

                if (!this.closedSet.includes(neighbour)) {
                    let tentativeGScore = this.current.g + 1;

                    if (this.openSet.includes(neighbour)) {
                        if (tentativeGScore < neighbour.g) {
                            neighbour.g = tentativeGScore;
                        }
                    } else {
                        neighbour.g = tentativeGScore;
                        this.openSet.push(neighbour);
                    }

                    neighbour.h = this.heuristic(neighbour, this.end);
                    neighbour.f = neighbour.g + neighbour.h;
                    neighbour.cameFrom = this.current;
                }
            }
        }
    }

    heuristic(a, b) {
        return abs(a.x - b.x) + abs(a.y - b.y);
    }

    updateLocations() {
        this.openSet = [];
        this.closedSet = [];
        this.path = [];

        this.cellCoords = [Math.ceil((this.x - 3) / 7), Math.ceil((this.y - 3) / 7)];
        this.start = this.graph[this.cellCoords[1]][this.cellCoords[0]];
        this.pacmanCellCoords = this.pacman.getLocation();
        this.end = this.graph[this.pacmanCellCoords[1]][this.pacmanCellCoords[0]];
        this.openSet.push(this.start);

        this.pathfind();
    }

    setupPoints() {
        for (let i = 0; i < this.graph.length; i++) {
            for (let j = 0; j < this.graph.length; j++) {
                if (this.graph[i][j] === 0 || this.graph[i][j] === 3) {
                    this.graph[i][j] = new Point(i, j);
                }
            }
        }
        for (let i = 0; i < this.graph.length; i++) {
            for (let j = 0; j < this.graph.length; j++) {
                if (this.graph[i][j] instanceof Point) {
                    this.graph[i][j].addNeighbours(this.graph);
                }
            }
        }
    }
 }