// Ghost class. Contains subroutines related to the pathing and collision detection of the ghosts.

import {Entity} from './entity.js';
import {Board} from './board.js';
import {Point} from './point.js';
import {getDirectionBetweenTwoPoints} from "./utils.js";

const FPS_FACTOR = 10;

export class Ghost extends Entity {
    grid;
    cellCoords;
    pacmanCellCoords;
    pacmanDir;
    x;
    y;
    xVel;
    yVel;
    dir;
    start; // Location of the ghost in the graph.
    end; // Location of Pac-Man in the graph.
    current; // The selected node at the start.
    openSet; // Set of nodes that haven't been searched yet.
    closedSet; // Set of nodes that have already been searched.
    path; // Stores the path that the ghost will follow.

    constructor(x, y, colour, mode, pacman, board, lives) {
        super();
        this.shape = "square";
        this.pacman = pacman;
        this.lives = lives;
        this.grid = board.getGrid();
        this.pacmanCellCoords  = pacman.getLocation();
        this.pacmanDir = pacman.getDir();
        this.x = x;
        this.y = y;
        this.xVel = 0;
        this.yVel = 0;
        this.mode = mode;
        this.colour = colour;
    }

    // Validation: Checks if a ghost is touching Pac-Man.
    checkContact() {
        if (this.x + 3 > this.pacman.x - 3 && this.x - 3 < this.pacman.x + 3 && this.y + 3 > this.pacman.y - 3 && this.y - 3 < this.pacman.y + 3) {
            this.pacman.reset();
            this.lives.decreaseLives();
        }
    }

    // Validation: Logic for the movement of the ghost. Happens every 10 frames.
    changeDirection() {
        if (frameCount % FPS_FACTOR === 0) {
            this.updateLocations();
            // Displays the chosen path.
            for (let i = 0; i < this.path.length; i++) {
                fill(0, 255, 0);
                rect(this.path[i].y*7, this.path[i].x*7, 3, 3);
            }
            if (this.path.length >= 2) {
                this.dir = getDirectionBetweenTwoPoints(
                    new Point(this.path[this.path.length - 2].y, this.path[this.path.length - 2].x),
                    new Point(this.path[this.path.length - 1].y, this.path[this.path.length - 1].x),
                );
            }
        }
    }

    // Validation: Updates the location of the ghost and Pac-Man in the graph.
    updateLocations() {
        this.setupPoints();

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

    // Calculates the Manhattan distance between two points.
    heuristic(a, b) {
        return abs(a.x - b.x) + abs(a.y - b.y);
    }

    // Validation: Sets up the graph.
    setupPoints() {
        this.graph = new Board().getGrid();
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