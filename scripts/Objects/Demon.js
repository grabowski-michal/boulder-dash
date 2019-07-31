function Demon(x, y) {
    var demon = new Object('gfx/objects/demon/demon_01.gif', x, y, "demon", falls.no, animated.yes);
    demon.animationChange(0, 8);
    demon.animationSpeedChange(35);

    listOfObjects.push(demon);

    demon.direction = 0;
    demon.dead = false;
    demon.intelligence = setInterval(function () {
        if (levelSettings.paused == false) {
            if (demon.dead == false) {
                for (var i = 0; i < objects.length; i++) {
                    if (objects[i].return().x == demon.return().x && objects[i].return().y == demon.return().y + 1 && objects[i].return().type == "player") {
                        objects[i].react(true);
                    } else if (objects[i].return().x == demon.return().x && objects[i].return().y == demon.return().y - 1 && objects[i].return().type == "player") {
                        objects[i].react(true);
                    } else if (objects[i].return().x == demon.return().x - 1 && objects[i].return().y == demon.return().y && objects[i].return().type == "player") {
                        objects[i].react(true);
                    } else if (objects[i].return().x == demon.return().x + 1 && objects[i].return().y == demon.return().y && objects[i].return().type == "player") {
                        objects[i].react(true);
                    }
                }

                var canGo = true;
                for (var i = 0; i < objects.length; i++) {
                    if (demon.direction == 0) { // idzie z lewego kierunku
                        if (objects[i].return().x == demon.return().x && objects[i].return().y == demon.return().y + 1) {
                            canGo = false;
                        }
                    } else if (demon.direction == 1) { // idzie z góry
                        if (objects[i].return().x == demon.return().x - 1 && objects[i].return().y == demon.return().y) {
                            canGo = false;
                        }
                    } else if (demon.direction == 2) { // idzie z prawego kierunku
                        if (objects[i].return().x == demon.return().x && objects[i].return().y == demon.return().y - 1) {
                            canGo = false;
                        }
                    } else if (demon.direction == 3) { // idzie z dołu
                        if (objects[i].return().x == demon.return().x + 1 && objects[i].return().y == demon.return().y) {
                            canGo = false;
                        }
                    }
                }
                if (canGo == true) {
                    if (demon.direction == 0) {
                        demon.return().y++;
                        demon.direction = 1;
                    } else if (demon.direction == 1) {
                        demon.return().x--;
                        demon.direction = 2;
                    } else if (demon.direction == 2) {
                        demon.return().y--;
                        demon.direction = 3;
                    } else if (demon.direction == 3) {
                        demon.return().x++;
                        demon.direction = 0;
                    }
                } else {
                    if (demon.direction == 0) {
                        demon.direction = 3;
                    } else if (demon.direction == 1) {
                        demon.direction = 0;
                    } else if (demon.direction == 2) {
                        demon.direction = 1;
                    } else if (demon.direction == 3) {
                        demon.direction = 2;
                    }
                }
            }
        }
    }, 130)

    this.get = function () {
        return demon;
    }

    if (demon != undefined) {
        demon.totalRemove = function () {
            clearInterval(demon.intelligence);
            demon.dead = true;
            for (var i = 0; i < listOfObjects.length; i++) {
                if (demon == listOfObjects[i]) {
                    listOfObjects.splice(i, 1);
                }
            }
            demon = null;
        }
    }
}