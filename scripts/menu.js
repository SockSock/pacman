// Menu class. Written by Anish Shastri, 31/10/22. Contains subroutines related to the menu logic.

export class Menu {
    constructor(score) {
        this.score = score;
        this.mode = "main";
        this.difficulty = 0.5; // Holds the speed of the ghosts in terms of the difficulty mode.
        this.soundSlider = createSlider(0, 100, 100);
        this.soundSlider.hide();
    }

    // Validation: Displays the main menu if the mode is 'main'.
    drawMainMenu() {
        if (this.mode === "main") {
            // Title
            fill(255, 255, 255);
            textSize(20);
            text("Pac-Man", 80, 70);

            // Play button
            fill(255, 255, 255);
            textSize(15);
            text("Play", 80, 130);

            // Settings button
            fill(255, 255, 255);
            textSize(15);
            text("Settings", 80, 160);
        }
    }

    // Validation: Displays the settings menu if the mode is 'settings'.
    drawSettingsMenu() {
        if (this.mode === "settings") {
            // Main title
            fill(255, 255, 255);
            textSize(20);
            text("Settings", 80, 30);

            // Difficulty button
            fill(255, 255, 255);
            textSize(15);
            text("Difficulty", 80, 80);

            // Easy button
            // Check if the current difficulty is easy.
            if (this.difficulty === 0.25) {
                // If it is, make the Easy button red to show that it is selected.
                fill (255, 0, 0);
            } else {
                // Otherwise, keep the colour white.
                fill(255, 255, 255);
            }
            textSize(15);
            text("Easy", 50, 115);

            // Medium button
            if (this.difficulty === 0.5) {
                fill (255, 0, 0);
            } else {
                fill(255, 255, 255);
            }
            textSize(15);
            text("Medium", 115, 115);

            // Sound title
            fill(255, 255, 255);
            textSize(15);
            text("Sound", 80, 160);

            // Sound slider
            this.soundSlider.show();
            this.soundSlider.position(170, 570);
            this.soundSlider.style('width', '150px');

            // Back button
            fill(255, 255, 255);
            textSize(15);
            text("Back", 80, 240);
        } else {
            this.soundSlider.hide();
        }
    }

    // Validation: Displays the restart menu if the mode is 'restart'.
    drawRestartMenu() {
        if (this.mode === "restart") {
            // Title
            fill(255, 255, 255);
            textSize(20);
            text("Game Over", 80, 70);

            // Score
            fill(255, 255, 255);
            textSize(15);
            text("Score: " + this.score.count, 80, 110);

            // Restart button
            fill(255, 255, 255);
            textSize(15);
            text("Restart", 80, 150);

            // Main menu button
            fill(255, 255, 255);
            textSize(15);
            text("Main Menu", 80, 180);
        }
    }

    // Validation: Controls what happens when certain buttons are clicked in the menus.
    clickMenuButton() {
        // Main menu
        if (this.mode === "main") {
            // Checks if the Play button has been pressed.
            if (mouseX/3 > 65 && mouseX/3 < 95 && mouseY/3 > 120 && mouseY/3 < 140) {
                this.mode = "play";
            }

            // Checks if the Settings button has been pressed.
            if (mouseX/3 > 55 && mouseX/3 < 105 && mouseY/3 > 150 && mouseY/3 < 170) {
                this.mode = "settings";
            }
        }

        // Settings menu
        if (this.mode === "settings") {
            // Checks if the Easy button has been pressed.
            if (mouseX/3 > 35 && mouseX/3 < 65 && mouseY/3 > 95 && mouseY/3 < 115) {
                this.difficulty = 0.25;
            }

            // Checks if the Medium button has been pressed.
            if (mouseX/3 > 90 && mouseX/3 < 140 && mouseY/3 > 95 && mouseY/3 < 115) {
                this.difficulty = 0.5;
            }

            // Checks if the Back button has been pressed.
            if (mouseX/3 > 65 && mouseX/3 < 95 && mouseY/3 > 220 && mouseY/3 < 240) {
                this.mode = "main";
            }
        }

        // Restart menu
        if (this.mode === "restart") {
            // Checks if the Restart button has been pressed.
            if (mouseX/3 > 55 && mouseX/3 < 105 && mouseY/3 > 130 && mouseY/3 < 150) {
                this.mode = "play";
                this.score.count = 0;
            }

            // Checks if the Main menu button has been pressed.
            if (mouseX/3 > 45 && mouseX/3 < 120 && mouseY/3 > 160 && mouseY/3 < 180) {
                this.mode = "main";
                this.score.count = 0;
            }
        }
    }
}
