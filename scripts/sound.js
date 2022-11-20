export class Sound {
    constructor(backgroundMusic, collectDot) {
        this.backgroundMusic = backgroundMusic;
        this.collectDot = collectDot;
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
}