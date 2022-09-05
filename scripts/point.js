export class Point {
    x;
    y;
    f;
    g;
    h;
    neighbours;
    cameFrom;

    constructor(x, y, wall) {
        this.x = x;
        this.y = y;
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.neighbours = [];
        this.cameFrom = undefined;
        this.wall = wall;
    }

    addNeighbours(grid) {
        let i = this.x;
        let j = this.y;
        if (i < grid.length - 1) {
            this.neighbours.push(grid[i+1][j]);
        }
        if (i > 0) {
            this.neighbours.push(grid[i-1][j]);
        }
        if (j < grid[0].length - 1) {
            this.neighbours.push(grid[i][j+1]);
        }
        if (j > 0) {
            this.neighbours.push(grid[i][j-1]);
        }
    }
}