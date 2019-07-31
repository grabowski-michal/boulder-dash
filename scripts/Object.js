var id = 1;

var falls = { no: false, yes: true };
var animated = { no: false, yes: true };

function Object(img, posX, posY, type, falling, hasAnimation) {

    // PRIVATE

    if (falling == undefined) falling = falls.no;
    var now_Falling = false;

    var object = {
        id: id,
        x: posX,
        y: posY,
        type: type,
        image: img,
        animation: 0,
        frame: 0,
        frames: 1,
        falling: falling,
    }

    if (!(object.type == "diamond" || object.type == "door" || object.type == "dirt")) {
        object.obstacle = true;
    } else {
        object.obstacle = false;
    }

    if (object.type == "player" || object.type == "enemy" || object.type == "demon") {
        object.alive = true;
    } else {
        object.alive = false;
    }

    if (object.type == "demon") {
        object.secret = true;
    }

    var animationSpeed = 26;

    function init() {
        var img = new Image();
        img.src = object.image;

        ctx.drawImage(img, object.frame * 32, object.animation * 32, 32, 32, object.x * 32, object.y * 36, 32, 36);
    }

    objects.push(this);

    init();
    id++;

    var lastTime = new Date();

    if (hasAnimation == true) {
        var animate = setInterval(function () {
            var time = new Date().getTime() - lastTime.getTime();
            if (time > animationSpeed) {
                if (object.frame < object.frames - 1) {
                    object.frame += Math.floor(time / animationSpeed);
                }
                if (object.frame >= object.frames - 1) {
                    object.frame = object.frame - object.frames + 1;

                    if (object.type == "boom") {
                        for (var i = 0; i < objects.length; i++) {
                            if (objects[i].return() == object) {
                                objects.splice(i, 1);
                            }
                        }
                        clearInterval(animate);
                    }
                }
                lastTime = new Date();
            }
        }, animationSpeed)
    }

    var secret = false;

    this.react = function (sec) {
        secret = sec;
        boom();
        var boomSound = new Audio(Sounds.boom);
        boomSound.play();
    }

    function boom() {
        for (var j = 0; j < 9; j++) {
            for (var i = 0; i < objects.length; i++) {
                if (object.y - 1 == objects[i].return().y && object.x - 1 == objects[i].return().x) { if (objects[i].return().type == "player") { console.log("Game over"); levelSettings.gameOver = true; }; if (objects[i].return().type == "demon" || objects[i].return().type == "enemy" || objects[i].return().type == "amoeba") { objects[i].totalRemove(); objects[i].remove(); } else { objects[i].remove(); } }
                if (object.y - 1 == objects[i].return().y && object.x == objects[i].return().x) { if (objects[i].return().type == "player") { console.log("Game over"); levelSettings.gameOver = true; }; if (objects[i].return().type == "demon" || objects[i].return().type == "enemy" || objects[i].return().type == "amoeba") { objects[i].totalRemove(); objects[i].remove(); } else { objects[i].remove(); } }
                if (object.y - 1 == objects[i].return().y && object.x + 1 == objects[i].return().x) { if (objects[i].return().type == "player") { console.log("Game over"); levelSettings.gameOver = true; }; if (objects[i].return().type == "demon" || objects[i].return().type == "enemy" || objects[i].return().type == "amoeba") { objects[i].totalRemove(); objects[i].remove(); } else { objects[i].remove(); } }
                if (object.y == objects[i].return().y && object.x - 1 == objects[i].return().x) { if (objects[i].return().type == "player") { console.log("Game over"); levelSettings.gameOver = true; }; if (objects[i].return().type == "demon" || objects[i].return().type == "enemy" || objects[i].return().type == "amoeba") { objects[i].totalRemove(); objects[i].remove(); } else { objects[i].remove(); } }
                if (object.y == objects[i].return().y && object.x + 1 == objects[i].return().x) { if (objects[i].return().type == "player") { console.log("Game over"); levelSettings.gameOver = true; }; if (objects[i].return().type == "demon" || objects[i].return().type == "enemy" || objects[i].return().type == "amoeba") { objects[i].totalRemove(); objects[i].remove(); } else { objects[i].remove(); } }
                if (object.y + 1 == objects[i].return().y && object.x - 1 == objects[i].return().x) { if (objects[i].return().type == "player") { console.log("Game over"); levelSettings.gameOver = true; }; if (objects[i].return().type == "demon" || objects[i].return().type == "enemy" || objects[i].return().type == "amoeba") { objects[i].totalRemove(); objects[i].remove(); } else { objects[i].remove(); } }
                if (object.y + 1 == objects[i].return().y && object.x == objects[i].return().x) { if (objects[i].return().type == "player") { console.log("Game over"); levelSettings.gameOver = true; }; if (objects[i].return().type == "demon" || objects[i].return().type == "enemy" || objects[i].return().type == "amoeba") { objects[i].totalRemove(); objects[i].remove(); } else { objects[i].remove(); } }
                if (object.y + 1 == objects[i].return().y && object.x + 1 == objects[i].return().x) { if (objects[i].return().type == "player") { console.log("Game over"); levelSettings.gameOver = true; }; if (objects[i].return().type == "demon" || objects[i].return().type == "enemy" || objects[i].return().type == "amoeba") { objects[i].totalRemove(); objects[i].remove(); } else { objects[i].remove(); } }

                if (object.y == objects[i].return().y && object.x == objects[i].return().x) { if (objects[i].return().type == "player") { console.log("Game over"); levelSettings.gameOver = true; }; console.log(objects[i].return().type); if (objects[i].return().type == "demon") { secret = true; }; if (objects[i].return().type == "demon" || objects[i].return().type == "enemy" || objects[i].return().type == "amoeba") { objects[i].totalRemove(); objects[i].remove(); } else { objects[i].remove(); } }

                if (objects[i] != undefined) {
                    if (objects[i].return() == object) { objects.splice(i, 1); if (objects[i].return().type == "demon" || objects[i].return().type == "enemy" || objects[i].return().type == "amoeba") { objects[i].totalRemove(); objects[i].remove(); } }
                }
            }
        }

        var flames = new Boom(object.x - 1, object.y - 1);
        flames = new Boom(object.x, object.y - 1);
        flames = new Boom(object.x + 1, object.y - 1);
        flames = new Boom(object.x - 1, object.y);
        flames = new Boom(object.x, object.y);
        flames = new Boom(object.x, object.y + 1);
        flames = new Boom(object.x - 1, object.y + 1);
        flames = new Boom(object.x + 1, object.y);
        flames = new Boom(object.x + 1, object.y + 1);

        // console.log(secret);

        if (secret == true) {
            setTimeout(function () {
                var diamond = new Diamond(object.x - 1, object.y - 1);
                diamond = new Diamond(object.x, object.y - 1);
                diamond = new Diamond(object.x + 1, object.y - 1);
                diamond = new Diamond(object.x - 1, object.y);
                diamond = new Diamond(object.x, object.y);
                diamond = new Diamond(object.x, object.y + 1);
                diamond = new Diamond(object.x - 1, object.y + 1);
                diamond = new Diamond(object.x + 1, object.y);
                diamond = new Diamond(object.x + 1, object.y + 1);
            }, 640);
        }
    }

    var stable = false;

    var checkingIfStable = setInterval(function () {
        for (var i = 0; i < objects.length; i++) {
            if (object.y + 1 == objects[i].return().y && object.x == objects[i].return().x && objects[i].stable() == true) {
                stable = true;
            }
        }
    }, 50)

    var beforeItFalls = false;
    var prepareToBoom = false;
    var wasJustFalling = false;
    var soundInterval = 0;

    this.setBeforeItFalls = function (newValue) {
        beforeItFalls = newValue;
    }

    var fall = setInterval(function () {
        if (falling == true) {
            if (levelSettings.started == true && levelSettings.paused == false) {
                var check = {
                    down: true,
                    left: true,
                    right: true,
                    leftDown: true,
                    rightDown: true,
                    stack: false,
                }

                for (var i = 0; i < objects.length; i++) {
                    if (object.y - 1 == objects[i].return().y && object.x == objects[i].return().x && objects[i].return().falling == falls.yes) {
                        var possibleLeft = false;
                        var possibleRight = false;
                        for (var k = 0; k < objects.length; k++) {
                            if (objects[k].return().x == objects[i].return().x + 1 && objects[k].return().y == objects[i].return().y && objects[k].return().falling == falls.no) {
                                possibleRight = true;
                            }
                            if (objects[k].return().x == objects[i].return().x - 1 && objects[k].return().y == objects[i].return().y && objects[k].return().falling == falls.no) {
                                possibleLeft = true;
                            }
                        }
                        if (!possibleLeft) check.left = false;
                        if (!possibleRight) check.right = false;
                    }
                    if (object.y - 1 == objects[i].return().y && object.x + 1 == objects[i].return().x && objects[i].return().falling == falls.yes) {
                        check.right = false;
                    }
                    if (object.y - 1 == objects[i].return().y && object.x - 1 == objects[i].return().x && objects[i].return().falling == falls.yes) {
                        check.left = false;
                    }
                    if (object.y + 1 == objects[i].return().y && object.x == objects[i].return().x) {
                        check.down = false;
                    }
                    if (object.y + 1 == objects[i].return().y && object.x == objects[i].return().x && !(objects[i].return().type == "player" || objects[i].return().type == "dirt")) {
                        check.stack = true;
                    }
                    if (object.y == objects[i].return().y && object.x - 1 == objects[i].return().x) {
                        check.left = false;
                    }
                    if (object.y == objects[i].return().y && object.x + 1 == objects[i].return().x) {
                        check.right = false;
                    }
                    if (object.y + 1 == objects[i].return().y && object.x - 1 == objects[i].return().x) {
                        check.leftDown = false;
                    }
                    if (object.y + 1 == objects[i].return().y && object.x + 1 == objects[i].return().x) {
                        check.rightDown = false;
                    }
                    if (stable == false) {
                        check.left = false;
                        check.right = false;
                    }
                    if (object.y + 1 == objects[i].return().y && object.x == objects[i].return().x && objects[i].stable() == false && objects[i].return().falling == falls.yes) {
                        check.left = false;
                        check.right = false;
                    }

                    if (object.y + 1 == objects[i].return().y && object.x == objects[i].return().x && wasJustFalling == true && objects[i].return().alive == true) {
                        prepareToBoom = true;
                    }
                }

                if (prepareToBoom == true) {
                    object.y++;
                    boom();
                    prepareToBoom = false;
                    var boomSound = new Audio(Sounds.boom);
                    boomSound.play();
                }

                if (soundInterval == 1) {
                    soundInterval++;
                } else {
                    soundInterval = 0;
                }

                if (check.down == true && beforeItFalls == true) {
                    if (object.type == "rock" && soundInterval == 0) {
                        var rockSound = new Audio(Sounds.rock); rockSound.play();
                        soundInterval++;
                    } else if (object.type == "diamond" && soundInterval == 0) {
                        var diamondSound = new Audio(Sounds.diamondFall); diamondSound.play();
                        soundInterval++;
                    }
                    object.y++;
                    wasJustFalling = true;
                    stable = false;
                } else if (check.stack == true && beforeItFalls == true) {
                    if (check.left == true && check.leftDown == true) {
                        object.x--;
                        stable = false;
                    } else if (check.right == true && check.rightDown == true) {
                        object.x++;
                        stable = false;
                    }
                    wasJustFalling = false;
                } else {
                    if (check.down == true || (check.stack == true && ((check.left == true && check.leftDown == true) || (check.right == true && check.rightDown == true)))) {
                        beforeItFalls = true;
                    }
                    wasJustFalling = false;
                }
            }
        } else {
            clearInterval(fall);
            stable = true;
        }
    }, 150);

    // PUBLIC

    this.animationSpeedChange = function (newSpeed) {
        animationSpeed = newSpeed;
        clearInterval(animate);
        var animate = setInterval(function () {
            var time = new Date().getTime() - lastTime.getTime();
            if (time > animationSpeed) {
                if (object.frame < object.frames - 1) {
                    object.frame += Math.floor(time / animationSpeed);
                }
                if (object.frame >= object.frames - 1) {
                    object.frame = object.frame - object.frames + 1;
                    if (object.type == "boom") {
                        for (var i = 0; i < objects.length; i++) {
                            if (objects[i].return() == object) {
                                objects.splice(i, 1);
                            }
                        }
                        clearInterval(animate);
                    }
                }
                lastTime = new Date();
            }
        }, animationSpeed)
    }

    this.animationChange = function (animation, frames) {
        object.animation = animation;
        object.frame = 0;
        object.frames = frames;
    }

    this.return = function () {
        return object;
    }

    this.remove = function () {
        for (var i = 0; i < objects.length; i++) {
            if (objects[i].return() == object) {
                objects.splice(i, 1);
                clearInterval(animate);
                clearInterval(checkingIfStable);
                clearInterval(fall);
            }
        }
    }

    this.ifItsFalling = function () {
        return now_Falling;
    }

    this.stable = function () {
        return stable;
    }
}