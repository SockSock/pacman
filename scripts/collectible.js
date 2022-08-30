import {Sprite} from './sprite.js';

export class Collectible extends Sprite {
    constructor() {
        super();
        if (this.constructor === Collectible) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    eatCollectible() {
        throw new Error("eatCollectible unimplemented.")
    }
}
