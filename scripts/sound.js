// Sound class. Written by Anish Shastri, 19/11/22. Contains subroutines to play certain sounds. They are called when
// the appropriate event happens.

import {getMode, getVolume} from "./utils.js";

export class Sound {
    constructor(backgroundMusic, collectDot, eatGhost, menu, pacman, lives) {
        this.backgroundMusic = backgroundMusic;
        this.collectDot = collectDot;
        this.eatGhost = eatGhost;
        this.menu = menu;
        this.pacman = pacman;
        this.lives = lives;
    }

    playBackgroundMusic() {
        this.backgroundMusic.currentTime = 0; // Resets the music to the beginning.
        this.backgroundMusic.volume = getVolume(this.menu);
        this.backgroundMusic.play();
    }

    stopBackgroundMusic() {
        this.backgroundMusic.pause();
    }

    playCollectDot() {
        this.collectDot.currentTime = 0;
        this.collectDot.volume = getVolume(this.menu);
        this.collectDot.play();
    }

    playEatGhost() {
        this.eatGhost.currentTime = 0;
        this.eatGhost.volume = getVolume(this.menu);
        this.eatGhost.play();
    }
}