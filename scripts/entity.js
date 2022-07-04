// Entity abstract class.

import {Sprite} from './sprite.js';

export class Entity extends Sprite {
    constructor() {
        super();
        if (this.constructor === Entity) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }
}
