function Menu() {
    this.menuMode = 0;
    this.playerLeft = 1;
    this.playerRight = 1;
    this.cave = "A";
    this.level = 1;
    menuDefined = true;

    document.addEventListener("keydown", function (e) {
        if (levelSettings.menuMode == true) {
            // console.log(e.keyCode);
            if (e.keyCode == 112) { // F1

            } else if (e.keyCode == 113) { // F2
                menu.menuMode = 1;
            } else if (e.keyCode == 114) { // F3

            }
            if (menu.menuMode == 1) {
                if (e.keyCode == 115) { // F4
                    if (menu.playerLeft == 1 && menu.playerRight == 1) menu.playerLeft = 2;
                    else if (menu.playerLeft == 2 && menu.playerRight == 1) menu.playerRight = 2;
                    else if (menu.playerLeft == 2 && menu.playerRight == 2) { menu.playerLeft = 1; menu.playerRight = 1; }
                } else if (e.keyCode == 39) { // right
                    if (menu.cave == "A" && menu.level < 4) menu.cave = "E";
                    else if (menu.cave == "E") menu.cave = "I";
                    else if (menu.cave == "I") menu.cave = "M";
                } else if (e.keyCode == 37) { // left
                    if (menu.cave == "M") menu.cave = "I";
                    else if (menu.cave == "I") menu.cave = "E";
                    else if (menu.cave == "E") menu.cave = "A";
                } else if (e.keyCode == 38) { // up
                    if (menu.cave == "A") {
                        if (menu.level < 5) {
                            menu.level++;
                        }
                    } else {
                        if (menu.level < 3) {
                            menu.level++;
                        } else if (menu.level >= 3 && menu.level < 5) {
                            menu.level++;
                            menu.cave = "A";
                        }
                    }
                } else if (e.keyCode == 40) { // down
                    if (menu.level > 1) menu.level--;
                } else if (e.keyCode == 17) { // ctrl
                    levelSettings.menuMode = false;
                    levelSettings.gameStarted = true;
                    ambient.pause();
                    var noise = new Audio(Sounds.noise);
                    noise.play();
                    beginLevel("A1");
                    notEnoughSpace = 0;
                    properTime = 0;
                    maybeDiamonds = false;

                    IntEnough = setInterval(function () {
                        if (levelSettings.paused == false) {
                            notEnoughSpace++;
                            properTime++;
                        }
                    }, 500)
                }
            }
        }
    })
}