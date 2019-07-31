var playerId = 0;
var players = [];

var beforePlayer = function (x, y) {
    var comingout = new comingOut(x, y);
    setTimeout(function () {
        comingout.get().remove();
        var boom = new Boom(x, y);
        var entering = new Audio(Sounds.entering);
        entering.play();
        levelSettings.showStatistics = false;
        setTimeout(function () {
            var playerek = new Player(x, y);
            playerek.get().setKeys(37, 39, 38, 40);
            Timing = setInterval(function () {
                if (levelSettings.started == true && levelSettings.paused == false) {
                    nowTime = new Date();
                    if (nowTime.getTime() - beforeTime.getTime() + howMuchTimeHasPassed > 1000) {
                        if (levelSettings.time > 0) levelSettings.time--;
                        else {
                            if (levelSettings.timeOut == 0) {
                                levelSettings.gameOver = true; levelSettings.timeOut = 5; timeOutQueue = setInterval(function () {
                                    if (levelSettings.timeOut > 1) {
                                        levelSettings.timeOut--;
                                    } else {
                                        levelSettings.timeOut = 5;
                                    }
                                }, 1000)
                            }
                            levelSettings.gameOver = true;
                        }
                        beforeTime = new Date();
                        howMuchTimeHasPassed = 0;
                    }
                } else {
                    beforeTime = new Date();
                }
            }, 50);
        }, 640);
    }, 4000);
}

var Player = function (x, y) {
    // PRIVATE

    var img;

    var began = false;

    function init() {
        img = 'gfx/objects/player/player.gif';
    }

    init();

    var player = new Object(img, x, y, "player", falls.no, animated.yes);
    player.animationSpeedChange(20);

    players.push(player);

    var keys = {
        left: undefined,
        right: undefined,
        up: undefined,
        down: undefined,
    }

    function defineLeft(left) {
        keys.left = left;
    }

    function defineRight(right) {
        keys.right = right;
    }

    function defineUp(up) {
        keys.up = up;
    }

    function defineDown(down) {
        keys.down = down;
    }

    var control = false;

    document.addEventListener("keydown", KeyDown);
    document.addEventListener("keyup", KeyUp);

    function KeyDown(e) {
        if (levelSettings.gameOver == false) {
            if (e.keyCode == keys.left) {
                player.move("left");
            } else if (e.keyCode == keys.right) {
                player.move("right");
            } else if (e.keyCode == keys.up) {
                player.move("up");
            } else if (e.keyCode == keys.down) {
                player.move("down");
            }
        }
        if (e.keyCode == 17) {
            control = true;
        }
    }

    function KeyUp(e) {
        if (levelSettings.gameOver == false) {
            if (e.keyCode == keys.left) {
                player.stopMove("left");
            } else if (e.keyCode == keys.right) {
                player.stopMove("right");
            } else if (e.keyCode == keys.up) {
                player.stopMove("up");
            } else if (e.keyCode == keys.down) {
                player.stopMove("down");
            }
        }
        if (e.keyCode == 17) {
            control = false;
        }
    }

    function checkScreenMove() {
        if (player.return().x * 32 > (levelSettings.screenWidth * 32 - levelSettings.widthShift) - 32 * 6) {
            screenOperator.horizontal = 32 * 5;
        } else if (player.return().x * 32 < (-1) * levelSettings.widthShift + 32 * 6) {
            screenOperator.horizontal = (-1) * 32 * 5;
        } else {
            screenOperator.horizontal = 0;
        }

        if (player.return().y * 36 > (levelSettings.screenHeight * 36 - levelSettings.heightShift) - 36 * 4) {
            screenOperator.vertical = 36 * 3;
        } else if (player.return().y * 36 < (-1) * levelSettings.heightShift + 36 * 5) {
            screenOperator.vertical = (-1) * 36 * 3;
        } else {
            screenOperator.vertical = 0;
        }
    }

    // player().test = 0;

    var lastMove = "left";
    var clicked = {
        left: false,
        right: false,
        up: false,
        down: false,
    }

    // PUBLIC

    player.setKeys = function (left, right, up, down) {
        defineLeft(left);
        defineRight(right);
        defineUp(up);
        defineDown(down);
    }

    player.move = function (where) {
        if (where == "left") {
            clicked.left = true;
        } else if (where == "right") {
            clicked.right = true;
        } else if (where == "up") {
            clicked.up = true;
        } else if (where == "down") {
            clicked.down = true;
        }
        checkScreenMove();
    }

    var movingWhilePause = false;

    player.stopMove = function (where) {
        if (levelSettings.started == true && levelSettings.paused == false && levelSettings.gameOver == false) {
            movingWhilePause = false;
            if (where == "left") {
                setTimeout(function () {
                    player.animationChange(0, 1);
                }, 100)
                clicked.left = false;
            } else if (where == "right") {
                setTimeout(function () {
                    player.animationChange(0, 1);
                }, 100)
                clicked.right = false;
            } else if (where == "up") {
                setTimeout(function () {
                    player.animationChange(0, 1);
                }, 100)
                clicked.up = false;
            } else if (where == "down") {
                setTimeout(function () {
                    player.animationChange(0, 1);
                }, 100)
                clicked.down = false;
            }
        } else {
            if (levelSettings.paused == true) {
                movingWhilePause = true;
                setTimeout (function() {
                    player.stopMove(where);
                }, 100);
            }
        }
    }

    var strength = 0;
    var wait = 0;

    var waiting = setInterval(function () {
        if (levelSettings.gameOver == false) {
            if (movingWhilePause == false) {
                wait++;
                if (wait == 5 || wait == 8 || wait == 26 || wait == 30 || wait == 35) {
                    player.animationChange(1, 8);
                } else if (wait == 6 || wait == 17 || wait == 28 || wait == 32 || wait == 37) {
                    player.animationChange(0, 1);
                } else if (wait == 10) {
                    player.animationChange(2, 8);
                } else if (wait == 20) {
                    player.animationChange(3, 8);
                } else if (wait == 40) {
                    player.animationChange(0, 1);
                    wait = 0;
                }
            }
        }
    }, 165)

    var checkClicking = setInterval(function () {
        // console.log(strength);
        if (levelSettings.started == true && levelSettings.paused == false && levelSettings.gameOver == false) {
            var canGo = true;
            if (clicked.left == true) {
                wait = 0;
                if (strength < 32) strength += 10;
                for (var k = 0; k < objects.length; k++) {
                    if (objects[k].return().x == player.return().x - 1 && objects[k].return().y == player.return().y) {
                        if (objects[k].return().type == "dirt") {
                            objects[k].remove();
                            var wipe = new Audio(Sounds.wipe);
                            wipe.play();
                        } else if (objects[k].return().type == "rock") {
                            var isItPossibleToPush = true;
                            for (var m = 0; m < objects.length; m++) {
                                if (objects[m].return().x == objects[k].return().x - 1 && objects[m].return().y == objects[k].return().y) {
                                    isItPossibleToPush = false;
                                }
                            }
                            if (!(strength > 32)) {
                                isItPossibleToPush = false;
                            } else {
                                strength -= 16;
                            }
                            if (isItPossibleToPush == true) { objects[k].return().x--; objects[k].setBeforeItFalls(false); var rockSound = new Audio(Sounds.rock); rockSound.play(); }
                            else canGo = false;
                        } else if (objects[k].return().type == "diamond") {
                            objects[k].remove();
                            levelSettings.diamonds++;
                            levelSettings.score += 10;
                            var diamond = new Audio(Sounds.diamond);
                            diamond.play();
                        } else if (objects[k].return().type == "door" && levelSettings.doorOpened == true) {
                            endGame();
                            objects[k].remove();
                        } else if (objects[k].return().obstacle == true) {
                            canGo = false;
                        }
                    }
                }
                player.animationChange(4, 8);
                lastMove = "left";
                if (canGo == true && control == false) {
                    player.return().x--;
                    var step = new Audio(Sounds.step);
                    step.play();
                }
            } else if (clicked.right == true) {
                wait = 0;
                if (strength < 32) strength += 10;
                for (var k = 0; k < objects.length; k++) {
                    if (objects[k].return().x == player.return().x + 1 && objects[k].return().y == player.return().y) {
                        if (objects[k].return().type == "dirt") {
                            objects[k].remove();
                            var wipe = new Audio(Sounds.wipe);
                            wipe.play();
                        } else if (objects[k].return().type == "rock") {
                            var isItPossibleToPush = true;
                            for (var m = 0; m < objects.length; m++) {
                                if (objects[m].return().x == objects[k].return().x + 1 && objects[m].return().y == objects[k].return().y) {
                                    isItPossibleToPush = false;
                                }
                            }
                            if (!(strength > 32)) {
                                isItPossibleToPush = false;
                            } else {
                                strength -= 16;
                            }
                            if (isItPossibleToPush == true) { objects[k].return().x++; objects[k].setBeforeItFalls(false); var rockSound = new Audio(Sounds.rock); rockSound.play(); }
                            else canGo = false;
                        } else if (objects[k].return().type == "diamond") {
                            objects[k].remove();
                            levelSettings.diamonds++;
                            levelSettings.score += 10;
                            var diamond = new Audio(Sounds.diamond);
                            diamond.play();
                        } else if (objects[k].return().type == "door" && levelSettings.doorOpened == true) {
                            endGame();
                            objects[k].remove();
                        } else if (objects[k].return().obstacle == true) {
                            canGo = false;
                        }
                    }
                }
                player.animationChange(5, 8);
                lastMove = "right";
                if (canGo == true && control == false) {
                    player.return().x++;
                    var step = new Audio(Sounds.step);
                    step.play();
                }
            } else if (clicked.up == true) {
                wait = 0;
                if (strength < 38) strength += 10;
                for (var k = 0; k < objects.length; k++) {
                    if (objects[k].return().y == player.return().y - 1 && objects[k].return().x == player.return().x) {
                        if (objects[k].return().type == "dirt") {
                            objects[k].remove();
                            var wipe = new Audio(Sounds.wipe);
                            wipe.play();
                        } else if (objects[k].return().type == "diamond") {
                            objects[k].remove();
                            levelSettings.diamonds++;
                            levelSettings.score += 10;
                            var diamond = new Audio(Sounds.diamond);
                            diamond.play();
                        } else if (objects[k].return().type == "door" && levelSettings.doorOpened == true) {
                            endGame();
                            objects[k].remove();
                        } else if (objects[k].return().obstacle == true) {
                            canGo = false;
                        }
                    }
                }
                if (lastMove == "left") {
                    player.animationChange(4, 8);
                } else if (lastMove == "right") {
                    player.animationChange(5, 8);
                }
                if (canGo == true && control == false) {
                    player.return().y--;
                    var step = new Audio(Sounds.step);
                    step.play();
                }
            } else if (clicked.down == true) {
                wait = 0;
                if (strength < 38) strength += 10;
                for (var k = 0; k < objects.length; k++) {
                    if (objects[k].return().y == player.return().y + 1 && objects[k].return().x == player.return().x) {
                        if (objects[k].return().type == "dirt") {
                            objects[k].remove();
                            var wipe = new Audio(Sounds.wipe);
                            wipe.play();
                        } else if (objects[k].return().type == "diamond") {
                            objects[k].remove();
                            levelSettings.diamonds++;
                            levelSettings.score += 10;
                            var diamond = new Audio(Sounds.diamond);
                            diamond.play();
                        } else if (objects[k].return().type == "door" && levelSettings.doorOpened == true) {
                            endGame();
                            objects[k].remove();
                        } else if (objects[k].return().obstacle == true) {
                            canGo = false;
                        }
                    }
                }
                if (lastMove == "left") {
                    player.animationChange(4, 8);
                } else if (lastMove == "right") {
                    player.animationChange(5, 8);
                }
                if (canGo == true && control == false) {
                    player.return().y++;
                    var step = new Audio(Sounds.step);
                    step.play();
                }
            }
            if (strength > 0) strength -= 4;
        }
    }, 150)

    listOfObjects.push(player);

    this.get = function () {
        return player;
    }

    player.totalRemove = function () {
        clearInterval(waiting);
        clearInterval(checkClicking);
        document.removeEventListener("keydown", KeyDown);
        document.removeEventListener("keyup", KeyUp);
    }
}