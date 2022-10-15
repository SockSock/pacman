// Point class. Written by Anish Shastri, 05/09/22. This stores all the details of a point in the graph.

export class Point {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.f = 0; // Overall cost.
        this.g = 0; // Distance between two points.
        this.h = 0; // Heuristic cost.
        this.neighbours = [];
        this.cameFrom = undefined;
    }

    // Validation: Creates the neighbours of a point in the graph in four directions.
    addNeighbours(grid) {
        let i = this.x;
        let j = this.y;
        if (i < grid.length - 1 && grid[i+1][j] instanceof Point) {
            this.neighbours.push(grid[i+1][j]);
        }
        if (i > 0 && grid[i-1][j] instanceof Point) {
            this.neighbours.push(grid[i-1][j]);
        }
        if (j < grid[0].length - 1 && grid[i][j+1] instanceof Point) {
            this.neighbours.push(grid[i][j+1]);
        }
        if (j > 0 && grid[i][j-1] instanceof Point) {
            this.neighbours.push(grid[i][j-1]);
        }
    }
}
