// Ghost class. Written by Anish Shastri, 03/08/22. Contains subroutines related to the pathing and collision detection of the ghosts.

import {Entity} from './entity.js';
import {Board} from './board.js';
import {Point} from './point.js';
import {getCellCoords, getDirectionBetweenTwoPoints, getGrid} from "./utils.js";

export class Ghost extends Entity {
    start; // Location of the ghost in the graph.
    end; // Location of Pac-Man in the graph.
    current; // The selected node at the start.
    openSet; // Set of nodes that haven't been searched yet.
    closedSet; // Set of nodes that have already been searched.
    path; // Stores the path that the ghost will follow.

    constructor(x, y, colour, scatter, pacman, board, lives) {
        super();
        this.shape = "square";
        this.pacman = pacman;
        this.lives = lives;
        this.grid = getGrid(board);
        this.pacmanCellCoords  = getCellCoords(this.pacman.x, this.pacman.y);
        this.x = x;
        this.y = y;
        this.startX = x;
        this.startY = y;
        this.ghostXVel = 0;
        this.ghostYVel = 0;
        this.scatter = scatter;
        this.scatterTime = 0;
        this.resetTimer = false;
        this.colour = colour;
        this.passableTerrain = [0, 2, 3, 4];
    }

    // Validation: Checks if a ghost is touching Pac-Man.
    checkContact(ghosts) {
        if (this.x + 3 > this.pacman.x - 3 && this.x - 3 < this.pacman.x + 3 && this.y + 3 > this.pacman.y - 3 && this.y - 3 < this.pacman.y + 3) {
            this.pacman.reset();
            // Loops through the array which holds the ghosts to reset all the ghosts' positions.
            for (let i = 0; i < ghosts.length; i++) {
                ghosts[i].reset();
            }
            this.lives.decreaseLives();
        }
    }

    // Validation: Logic for the movement of the ghost. Happens every 10 frames.
    changeDirection() {
        this.updateLocations();
        // // Displays the chosen path.
        // for (let i = 0; i < this.path.length; i++) {
        //     fill(0, 255, 0);
        //     rect(this.path[i].y*7, this.path[i].x*7, 3, 3);
        // }
        if (this.path.length >= 2) {
            this.dir = getDirectionBetweenTwoPoints(
                new Point(this.path[this.path.length - 2].y, this.path[this.path.length - 2].x),
                new Point(this.path[this.path.length - 1].y, this.path[this.path.length - 1].x),
            );
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
        this.pacmanCellCoords = getCellCoords(this.pacman.x, this.pacman.y);

        // TODO: Fix timer not restarting issue if a power pellet is collected while scatter mode is active.
        // If scatter mode is active, go to the scatter location.
        if (this.scatter) {
            // Sets a timer.
            this.scatterTime += 1;
            // If scatter mode is already enabled, reset the timer.
            if (this.resetTimer === true) {
                this.scatterTime = 0;
                this.resetTimer = false;
            }
            if (this.scatterTime >= 600) { // 600 frames = 10 seconds.
                this.scatter = false;
                this.scatterTime = 0;
            }

            // Scatter to a certain point depending on the ghost.
            if (this.colour === "red") {
                let scatterPoint = [1, 5];
                this.end = this.graph[scatterPoint[1]][scatterPoint[0]];
                this.openSet.push(this.start);
                this.pathFind();
            }
            if (this.colour === "pink") {
                let scatterPoint = [26, 5];
                this.end = this.graph[scatterPoint[1]][scatterPoint[0]];
                this.openSet.push(this.start);
                this.pathFind();
            }
            if (this.colour === "cyan") {
                let scatterPoint = [1, 31];
                this.end = this.graph[scatterPoint[1]][scatterPoint[0]];
                this.openSet.push(this.start);
                this.pathFind();
            }
            if (this.colour === "orange") {
                let scatterPoint = [26, 31];
                this.end = this.graph[scatterPoint[1]][scatterPoint[0]];
                this.openSet.push(this.start);
                this.pathFind();
            }
          // Otherwise, chase Pac-Man normally.
        } else {
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
        this.graph = getGrid(new Board());
        for (let i = 0; i < this.graph.length; i++) {
            for (let j = 0; j < this.graph.length; j++) {
                if (this.graph[i][j] === 0 || this.graph[i][j] === 2 || this.graph[i][j] === 3 || this.graph[i][j] === 4) {
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

    // Resets the ghost to its starting position.
    reset() {
        this.x = this.startX;
        this.y = this.startY;
    }
 }
