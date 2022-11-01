// Menu class. Written by Anish Shastri, 31/10/22. Contains subroutines related to the menu logic.

export class Menu {
    constructor(score, board) {
        this.score = score;
        this.board = board;
        this.mode = "main";
        this.soundSlider = createSlider(0, 100, 100);
        this.soundSlider.hide();
    }

    drawMainMenu() {
        if (this.mode === "main") {
            // Title
            fill(255, 255, 255);
            textSize(20);
            text("Pac-Man", 50, 70);

            // Play button
            fill(255, 255, 255);
            textSize(15);
            text("Play", 75, 130);

            // Settings button
            fill(255, 255, 255);
            textSize(15);
            text("Settings", 65, 160);
        }
    }

    drawSettingsMenu() {
        if (this.mode === "settings") {
            // Main title
            fill(255, 255, 255);
            textSize(20);
            text("Settings", 55, 30);

            // Difficulty button
            fill(255, 255, 255);
            textSize(15);
            text("Difficulty", 63, 80);

            // Easy button
            fill(255, 255, 255);
            textSize(15);
            text("Easy", 15, 110);

            // Medium button
            fill(255, 255, 255);
            textSize(15);
            text("Medium", 65, 110);

            // Hard button
            fill(255, 255, 255);
            textSize(15);
            text("Hard", 135, 110);

            // Sound title
            fill(255, 255, 255);
            textSize(15);
            text("Sound", 70, 160);

            // Sound slider
            this.soundSlider.show();
            this.soundSlider.position(200, 570);
            this.soundSlider.style('width', '150px');

            // Back button
            fill(255, 255, 255);
            textSize(15);
            text("Back", 75, 240);
        } else {
            this.soundSlider.hide();
        }
    }

    drawRestartMenu() {
        if (this.mode === "restart") {
            // Title
            fill(255, 255, 255);
            textSize(20);
            text("Game Over", 40, 70);

            // Score
            fill(255, 255, 255);
            textSize(15);
            text("Score: " + this.score.count, 62, 110);

            // Restart button
            fill(255, 255, 255);
            textSize(15);
            text("Restart", 67, 150);

            // Main menu button
            fill(255, 255, 255);
            textSize(15);
            text("Main Menu", 57, 180);
        }
    }

    menuLogic() {
        // Main menu
        if (this.mode === "main") {
            // Checks if the Play button has been pressed.
            if (mouseX/3 > 75 && mouseX/3 < 102 && mouseY/3 > 110 && mouseY/3 < 130) {
                this.mode = "play";
            }

            // Checks if the Settings button has been pressed.
            if (mouseX/3 > 65 && mouseX/3 < 112 && mouseY/3 > 140 && mouseY/3 < 160) {
                this.mode = "settings";
            }
        }

        // Settings menu
        if (this.mode === "settings") {
            // Checks if the Back button has been pressed.
            if (mouseX/3 > 75 && mouseX/3 < 130 && mouseY/3 > 220 && mouseY/3 < 240) {
                this.mode = "main";
            }
        }

        // Restart menu
        if (this.mode === "restart") {
            // Checks if the Play again button has been pressed.
            if (mouseX/3 > 67 && mouseX/3 < 112 && mouseY/3 > 130 && mouseY/3 < 150) {
                // this.board.grid = this.board.startingGrid;
                this.score.count = 0;
                this.mode = "play";
            }

            // Checks if the Main menu button has been pressed.
            if (mouseX/3 > 57 && mouseX/3 < 112 && mouseY/3 > 160 && mouseY/3 < 180) {
                // this.board.grid = this.board.startingGrid;
                this.score.count = 0;
                this.mode = "main";
            }
        }
    }
}
