import {Entity} from './entity.js';
import {Board} from './board.js';
import {Point} from './point.js';

export class Ghost extends Entity {
    grid;
    cellCoords;
    pacmanCellCoords;
    pacmanDir;
    x;
    y;
    dir;
    start;
    end;
    current;
    openSet;
    closedSet;
    path;

    constructor(x, y, colour, mode, pacman, board, lives) {
        super();
        this.pacman = pacman;
        this.lives = lives;
        this.graph = new Board().getGrid();
        this.grid = board.getGrid();
        this.pacmanCellCoords  = pacman.getLocation();
        this.pacmanDir = pacman.getDir();
        this.x = x;
        this.y = y;
        this.dir = "";
        this.cellCoords = 0;
        this.mode = mode;
        this.colour = colour;
    }

    drawSprite() {
        // Displays the ghost.
        fill(this.colour);
        rect(this.x, this.y, 7, 7);

        // Makes the ghost move.
        if (frameCount % 6 === 0) {
            if (this.path.length > 0) {
                let next = this.path.pop();
                let x = next.x;
                let y = next.y;
                this.y = x*7;
                this.x = y*7;
            }
        }

        // // Displays the chosen path.
        // for (let i = 0; i < this.path.length; i++) {
        //     fill(0, 255, 0);
        //     rect(this.path[i].y*7, this.path[i].x*7, 7, 7);
        // }
    }

    moveSprite() {
        if (frameCount % 10 === 0) {
            this.updateLocations();
        }
    }

    // Validation: A* pathfinding algorithm.
    pathFind() {
        // While there are still nodes to be checked, keep checking.
        while (this.openSet.length > 0) {
            // Find the node with the lowest f score.
            this.current = this.openSet[0];
            // If the current node is the end node, then the path has been found.
            if (this.current === this.end) {
                let temp = this.current;
                // First, add the end node to the path.
                this.path.push(temp);
                // Then, add the nodes that lead to the end node.
                while (temp.cameFrom) {
                    this.path.push(temp.cameFrom);
                    temp = temp.cameFrom;
                }

                // Reset the found path to prevent an infinite loop.
                for (let i = 0; i < this.path.length; i++) {
                    this.path[i].cameFrom = undefined;
                }
            }

            // Remove the current node from the open set.
            this.openSet.splice(0, 1);
            // Add the current node to the closed set.
            this.closedSet.push(this.current);
            let neighbours = this.current.neighbours;
            // For each neighbour of the current node.
            for (let i = 0; i < neighbours.length; i++) {
                let neighbour = neighbours[i];

                if (!this.closedSet.includes(neighbour)) {
                    // Calculate the tentative g score.
                    let tentativeGScore = this.current.g + 1;

                    if (this.openSet.includes(neighbour)) {
                        // If the neighbour is already in the open set, check if the current g score is better.
                        if (tentativeGScore < neighbour.g) {
                            neighbour.g = tentativeGScore;
                        }
                    } else {
                        // If the neighbour is not in the open set, add it.
                        neighbour.g = tentativeGScore;
                        this.openSet.push(neighbour);
                    }

                    // Calculate the h score using the Manhattan distance between the neighbour and Pac-Man.
                    neighbour.h = this.heuristic(neighbour, this.end);
                    neighbour.f = neighbour.g + neighbour.h;
                    // Store the origin of the neighbour in the neighbour.
                    neighbour.cameFrom = this.current;
                }
            }
        }
    }

    checkContact() {
        if (this.x === this.pacman.x && this.y === this.pacman.y) {
            this.lives.decreaseLives();
            this.pacman.reset();
        }
    }

    // Calculates the Manhattan distance between two points.
    heuristic(a, b) {
        return abs(a.x - b.x) + abs(a.y - b.y);
    }

    updateLocations() {
        // Reset the sets and the paths.
        this.openSet = [];
        this.closedSet = [];
        this.path = [];

        // Get the current cell coordinates of the ghost and the pacman.
        this.cellCoords = [Math.ceil((this.x - 3) / 7), Math.ceil((this.y - 3) / 7)];
        this.start = this.graph[this.cellCoords[1]][this.cellCoords[0]];
        this.pacmanCellCoords = this.pacman.getLocation();

        // If it's the red ghost, chase Pac-Man directly.
        if (this.mode === "chase") {
            this.end = this.graph[this.pacmanCellCoords[1]][this.pacmanCellCoords[0]];
            this.openSet.push(this.start);
            this.pathFind();
        }
        // If it's the pink ghost, chase the two tiles in front of Pac-Man.
        if (this.mode === "cutoff") {
            // Need Pac-Man's direction to check his front.
            this.pacmanDir = this.pacman.getDir();
            if (this.pacmanDir === "up") {
                if (this.graph[this.pacmanCellCoords[1]-2][this.pacmanCellCoords[0]] !== 1 && this.graph[this.pacmanCellCoords[1]-2][this.pacmanCellCoords[0]] !== undefined) {
                    this.end = this.graph[this.pacmanCellCoords[1]-2][this.pacmanCellCoords[0]];
                }
            }
            if (this.pacmanDir === "left") {
                if (this.graph[this.pacmanCellCoords[1]][this.pacmanCellCoords[0]-2] !== 1 && this.graph[this.pacmanCellCoords[1]][this.pacmanCellCoords[0]-2] !== undefined) {
                    this.end = this.graph[this.pacmanCellCoords[1]][this.pacmanCellCoords[0]+2];
                }
            }
            if (this.pacmanDir === "down") {
                if (this.graph[this.pacmanCellCoords[1]+2][this.pacmanCellCoords[0]] !== 1 && this.graph[this.pacmanCellCoords[1]+2][this.pacmanCellCoords[0]] !== undefined) {
                    this.end = this.graph[this.pacmanCellCoords[1]-2][this.pacmanCellCoords[0]];
                }
            }
            if (this.pacmanDir === "right") {
                if (this.graph[this.pacmanCellCoords[1]][this.pacmanCellCoords[0]+2] !== 1 && this.graph[this.pacmanCellCoords[1]][this.pacmanCellCoords[0]+2] !== undefined) {
                    this.end = this.graph[this.pacmanCellCoords[1]][this.pacmanCellCoords[0]-2];
                }
            }
            this.openSet.push(this.start);
            this.pathFind();
        }
    }

    setupPoints() {
        for (let i = 0; i < this.graph.length; i++) {
            for (let j = 0; j < this.graph.length; j++) {
                if (this.graph[i][j] === 0 || this.graph[i][j] === 3 || this.graph[i][j] === 2) {
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