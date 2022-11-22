// Utils for the game. Written by Anish Shastri, 08/10/22.

// Validation: Calculates the direction using two points.
export function getDirectionBetweenTwoPoints(p1, p2) {
    if (p1.x < p2.x) {
        return "left";
    } else if (p1.x > p2.x) {
        return "right";
    } else if (p1.y < p2.y) {
        return "up";
    } else if (p1.y > p2.y) {
        return "down";
    }
}

// Getter method to return the cell coordinates.
export function getCellCoords(x, y) {
    return [Math.ceil((x-3)/7), Math.ceil((y-3)/7)]
}

// Getter method to return the grid from the Board class.
export function getGrid(board) {
    return board.grid;
}

// Getter method to return the mode of the game from the Menu class.
export function getMode(menu) {
    return menu.mode;
}

// Getter method to return the difficulty of the game from the Menu class.
export function getDifficulty(menu) {
    return menu.difficulty;
}
