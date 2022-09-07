import {Sprite} from "./sprite.js";

export class Lives extends Sprite {
    count;

    constructor() {
        super();
        this.count = 3;
    }

    drawSprite() {
        for (let i = 0; i < this.count; i++) {
            fill(255, 255, 0);
            ellipse(8 + (i * 10), 241, 7, 7);
        }
    }

    decreaseLives() {
        this.count--;
    }
}