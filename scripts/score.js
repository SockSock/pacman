import {Sprite} from './sprite.js';

export class Score extends Sprite {
    count;

    constructor() {
        super();
        this.count = 0;
    }

    drawSprite() {
        fill(255, 255, 255);
        text(this.count, 7, 15 );
    }

    increaseScore() {
        this.count++;
    }
}
