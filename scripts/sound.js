// Sound class. Written by Anish Shastri, 19/11/22. Contains subroutines to play certain sounds. They are called when
// the appropriate event happens.

export class Sound {
    constructor(backgroundMusic, collectDot, eatGhost) {
        this.backgroundMusic = backgroundMusic;
        this.collectDot = collectDot;
        this.eatGhost = eatGhost;
    }

    playBackgroundMusic() {
        this.backgroundMusic.currentTime = 0;
        this.backgroundMusic.play();
    }

    stopBackgroundMusic() {
        this.backgroundMusic.pause();
    }

    playCollectDot() {
        this.collectDot.currentTime = 0;
        this.collectDot.play();
    }

    playEatGhost() {
        this.eatGhost.currentTime = 0;
        this.eatGhost.play();
    }
}