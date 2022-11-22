// Sound class. Written by Anish Shastri, 19/11/22. Contains subroutines to play certain sounds. They are called when
// the appropriate event happens.

export class Sound {
    constructor(backgroundMusic, collectDot, eatGhost) {
        this.backgroundMusic = backgroundMusic;
        this.collectDot = collectDot;
        this.eatGhost = eatGhost;
    }

    playBackgroundMusic(volumeLevel) {
        this.backgroundMusic.currentTime = 0; // Resets the music to the beginning.
        this.backgroundMusic.volume = volumeLevel;
        this.backgroundMusic.play();
    }

    stopBackgroundMusic() {
        this.backgroundMusic.pause();
    }

    playCollectDot(volumeLevel) {
        this.collectDot.currentTime = 0;
        this.collectDot.volume = volumeLevel;
        this.collectDot.play();
    }

    playEatGhost(volumeLevel) {
        this.eatGhost.currentTime = 0;
        this.eatGhost.volume = volumeLevel;
        this.eatGhost.play();
    }
}