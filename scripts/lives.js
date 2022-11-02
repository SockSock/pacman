// Lives class. Written by Anish Shastri, 03/08/22. Contains subroutines related to the life count logic.

import {Sprite} from "./sprite.js";

export class Lives extends Sprite {

    constructor(menu) {
        super();
        this.menu = menu;
        this.count = 2;
    }

    // Displays the life count.
    drawSprite() {
        for (let i = 0; i < this.count; i++) {
            fill(255, 255, 0);
            ellipse(8 + (i * 10), 241, 7, 7);
        }
    }

    // Validation: Decreases the life count if a ghost touches Pac-Man, and causes the game to end if all lives are lost.
    decreaseLives() {
        this.count--;
        if (this.count === -1) {
            this.menu.mode = "restart";
            this.count = 2;
        }
    }
}
