

export function getDirectionBetweenTwoPoints(p1, p2) {
    if (p1.x < p2.x) {
        return "L";
    } else if (p1.x > p2.x) {
        return "R";
    } else if (p1.y < p2.y) {
        return "U";
    } else if (p1.y > p2.y) {
        return "D";
    }
}

export function getCellCoords(x, y) {
    return [Math.ceil((x-3)/7), Math.ceil((y-3)/7)]
}