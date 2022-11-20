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