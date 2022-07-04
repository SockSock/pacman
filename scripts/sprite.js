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
