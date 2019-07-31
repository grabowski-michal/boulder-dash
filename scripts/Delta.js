var factor = 0;

var Delta = setInterval(function () {
    if (levelSettings.menuMode == true && contextCreated == true) {
        ctx.clearRect(0, 0, 756, 525);

        if (factor < 272) factor++;
        else factor = 0;

            if (menu.menuMode == 0) {
                var img = new Image();
                img.src = "gfx/menu/menu.png";
                ctx.drawImage(img, 0, 0, 752, 480, 0, 0, 752, 480);
            } else if (menu.menuMode == 1) {
                var img = new Image();
                img.src = "gfx/menu/menu_2.png";
                ctx.drawImage(img, 0, 0, 752, 480, 0, 0, 752, 480);

                drawSingularNumbers(menu.playerLeft, 58, 408, "blue");
                drawSingularNumbers(menu.playerRight, 378, 408, "blue");
                drawLetter(menu.cave, 280, 426, "blue");
                drawSingularNumbers(menu.level, 604, 426, "blue");
            }

        img = new Image();
        img.src = "gfx/menu/background.png";
        ctx.drawImage(img, 0, 0 + factor, 608, 272, 73, 65, 608, 272);

        img = new Image();
        img.src = "gfx/menu/logo.png";
        ctx.drawImage(img, 0, 0, 608, 272, 73, 65, 608, 272);
    }

    if (levelSettings.gameStarted == true) {
        ctx.clearRect(0, 0, 756, 525);

        for (var i = 0; i < objects.length; i++) {
            if (objects[i].return().type == "turningWall") {
                var img = new Image();
                img.src = objects[i].return().image;

                ctx.drawImage(
                    img,
                    objects[i].return().frame * 32,
                    objects[i].return().animation * 32,
                    32,
                    32,
                    objects[i].return().x * 32 + levelSettings.leftMargin,
                    objects[i].return().y * 36 + levelSettings.upperMargin,
                    32,
                    36
                );
            } else {
                if ((objects[i].return().x * 32 < levelSettings.screenWidth * 32 - levelSettings.widthShift + 32) && (objects[i].return().x * 32 > (-1) * levelSettings.widthShift - 32) &&
                    (objects[i].return().y * 36 < (levelSettings.screenHeight * 36 - levelSettings.heightShift) + 36) && (objects[i].return().y * 36 > (-1) * levelSettings.heightShift - 36)) {

                    var img = new Image();
                    img.src = objects[i].return().image;

                    ctx.drawImage(
                        img,
                        objects[i].return().frame * 32,
                        objects[i].return().animation * 32,
                        32,
                        32,
                        objects[i].return().x * 32 + levelSettings.widthShift + levelSettings.leftMargin,
                        objects[i].return().y * 36 + levelSettings.heightShift + levelSettings.upperMargin,
                        32,
                        36
                    );
                }
            }
        }

        ctx.clearRect(0, 0, 756, levelSettings.upperMargin);
        ctx.clearRect(0, 0, levelSettings.leftMargin, 525);
        ctx.clearRect(756 - levelSettings.rightMargin, 0, 756, 525);
        ctx.clearRect(0, 525 - levelSettings.bottomMargin, 756, 525);

        if (levelSettings.totalGameOver == false) {
            if (levelSettings.showStatistics == false) {
                if (levelSettings.timeOut < 3) {
                    if (levelSettings.pauseQueue < 3) {
                        if (levelSettings.doorOpened == false) {
                            drawNumbers(levelSettings.diamondsRequired, 92, 50, "gray");
                            drawDiamond(156, 50);
                            drawNumbers(levelSettings.lessDiamonds, 188, 50, "white");
                            drawNumbers(levelSettings.diamonds, 284, 50, "gray");
                            drawTime(levelSettings.time, 380, 50, "white");
                            drawScore(levelSettings.score, 508, 50, "white");
                            openDoor();
                        } else {
                            drawDiamond(92, 50);
                            drawDiamond(124, 50);
                            drawDiamond(156, 50);
                            drawNumbers(levelSettings.moreDiamonds, 188, 50, "white");
                            drawNumbers(levelSettings.diamonds, 284, 50, "gray");
                            drawTime(levelSettings.time, 380, 50, "white");
                            drawScore(levelSettings.score, 508, 50, "white");
                        }
                    } else {
                        var img = new Image();
                        img.src = "gfx/menu/spacebar.gif";
                        ctx.drawImage(img, 0, 0, 572, 14, 92, 50, 572, 14);
                    }
                } else {
                    var img = new Image();
                    img.src = "gfx/menu/timeOut.gif";
                    ctx.drawImage(img, 0, 0, 446, 14, 92, 50, 446, 14);
                }
            } else {
                var img = new Image();
                img.src = "gfx/menu/statistics.gif";
                ctx.drawImage(img, 0, 0, 604, 14, 56, 50, 604, 14);

                drawSingularNumbers(levelSettings.player, 284, 50, "white");
                drawSingularNumbers(levelSettings.lives, 376, 50, "white");
            }
        } else {
            var img = new Image();
            img.src = "gfx/menu/gameOver.gif";
            ctx.drawImage(img, 0, 0, 540, 14, 92, 50, 540, 14);
        }
    }
}, 10);

var nowTime;
var beforeTime = new Date();
var howMuchTimeHasPassed = 0;

var Timing;

var openDoor = function () {
    if (levelSettings.diamonds >= levelSettings.diamondsRequired) {
        for (var i = 0; i < objects.length; i++) {
            if (objects[i].return().type == "door") {
                var blastSound = new Audio(Sounds.blast);
                blastSound.play();
                objects[i].animationChange(0, 8);
                objects[i].return().obstacle = false;
                levelSettings.doorOpened = true;
                canvas.style.backgroundColor = "#ffe284";
                setTimeout(function () {
                    canvas.style.backgroundColor = "#2A0000";
                }, 150)
            }
        }
    }
}