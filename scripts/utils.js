// Utils for the game.

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

export function getCellCoords(x, y) {
    return [Math.ceil((x-3)/7), Math.ceil((y-3)/7)]
}