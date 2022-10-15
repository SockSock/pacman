// Score class. Written by Anish Shastri, 03/08/22. Contains subroutines related to the score count logic.

import {Sprite} from './sprite.js';

export class Score extends Sprite {
    count;

    constructor() {
        super();
        this.count = 0;
    }

    // Displays the score count.
    drawSprite() {
        fill(255, 255, 255);
        text(this.count, 7, 15 );
    }

    // Increases the score when Pac-Man collects a dot or eats a ghost.
    increaseScore(value) {
        this.count+=value;
    }
}
