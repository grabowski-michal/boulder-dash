function Enemy(x, y) {
    var enemy = new Object('gfx/objects/enemy/enemy_01.gif', x, y, "enemy", falls.no, animated.yes);
    enemy.animationChange(0, 8);
    enemy.animationSpeedChange(35);

    listOfObjects.push(enemy);

    enemy.direction = 0;
    enemy.dead = false;
    enemy.intelligence = setInterval(function () {
        if (levelSettings.paused == false) {
            if (enemy.dead == false) {
                for (var i = 0; i < objects.length; i++) {
                        if (objects[i].return().x == enemy.return().x && objects[i].return().y == enemy.return().y + 1 && objects[i].return().type == "player") {
                            objects[i].react(false);
                        } else if (objects[i].return().x == enemy.return().x && objects[i].return().y == enemy.return().y - 1 && objects[i].return().type == "player") {
                            objects[i].react(false);
                        } else if (objects[i].return().x == enemy.return().x - 1 && objects[i].return().y == enemy.return().y && objects[i].return().type == "player") {
                            objects[i].react(false);
                        } else if (objects[i].return().x == enemy.return().x + 1 && objects[i].return().y == enemy.return().y && objects[i].return().type == "player") {
                            objects[i].react(false);
                        }
                }

                var canGo = true;
                for (var i = 0; i < objects.length; i++) {
                    if (enemy.direction == 0) { // idzie z lewego kierunku
                        if (objects[i].return().x == enemy.return().x && objects[i].return().y == enemy.return().y - 1) {
                            canGo = false;
                        }
                    } else if (enemy.direction == 1) { // idzie z góry
                        if (objects[i].return().x == enemy.return().x + 1 && objects[i].return().y == enemy.return().y) {
                            canGo = false;
                        }
                    } else if (enemy.direction == 2) { // idzie z prawego kierunku
                        if (objects[i].return().x == enemy.return().x && objects[i].return().y == enemy.return().y + 1) {
                            canGo = false;
                        }
                    } else if (enemy.direction == 3) { // idzie z dołu
                        if (objects[i].return().x == enemy.return().x - 1 && objects[i].return().y == enemy.return().y) {
                            canGo = false;
                        }
                    }
                }
                if (canGo == true) {
                    if (enemy.direction == 0) {
                        enemy.return().y--;
                        enemy.direction = 3;
                    } else if (enemy.direction == 1) {
                        enemy.return().x++;
                        enemy.direction = 0;
                    } else if (enemy.direction == 2) {
                        enemy.return().y++;
                        enemy.direction = 1;
                    } else if (enemy.direction == 3) {
                        enemy.return().x--;
                        enemy.direction = 2;
                    }
                } else {
                    if (enemy.direction == 0) {
                        enemy.direction = 1;
                    } else if (enemy.direction == 1) {
                        enemy.direction = 2;
                    } else if (enemy.direction == 2) {
                        enemy.direction = 3;
                    } else if (enemy.direction == 3) {
                        enemy.direction = 0;
                    }
                }
            }
        }
    }, 130)

    this.get = function () {
        return enemy;
    }

    if (enemy != undefined) {
        enemy.totalRemove = function () {
            clearInterval(enemy.intelligence);
            enemy.dead = true;
            for (var i = 0; i < listOfObjects.length; i++) {
                if (enemy == listOfObjects[i]) {
                    listOfObjects.splice(i, 1);
                }
            }
            enemy = null;
        }
    }
}