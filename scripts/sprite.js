// Sprite abstract class. Written by Anish Shastri, 25/06/22. Used for overriding methods.

export class Sprite {
    constructor() {
        if (this.constructor === Sprite) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    drawSprite() {
        throw new Error("drawSprite unimplemented.")
    }
}
