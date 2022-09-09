// Score class. Contains subroutines related to the score count logic.

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

    // Increases the score when Pac-Man collects a dot.
    increaseScore() {
        this.count++;
    }
}
