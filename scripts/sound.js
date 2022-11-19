export class Sound {
    constructor(backgroundMusic) {
        this.backgroundMusic = backgroundMusic;
    }

    playBackgroundMusic() {
        this.backgroundMusic.loop();
    }

    stopBackgroundMusic() {
        this.backgroundMusic.stop();
    }
}