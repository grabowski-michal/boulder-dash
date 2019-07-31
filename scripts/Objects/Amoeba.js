var notEnoughSpace;
var properTime;
var maybeDiamonds;
var IntEnough;
var amoebasIntervals = [];

function Amoeba(x, y) {
    var amoeba = new Object('gfx/objects/amoeba/amoeba_01.gif', x, y, "amoeba", falls.no, animated.yes);
    amoeba.animationChange(0, 8);
    amoeba.animationSpeedChange(35);

    listOfObjects.push(amoeba);

    var probability = 5;
    amoeba.intelligence = setInterval(function () {
        if (levelSettings.paused == false) {
            if (amoeba.dead != true) {
                probability += 2;
                var possibility = Math.floor((Math.random() * 30) + 1);
                if (probability > possibility) {
                    var direction = Math.floor((Math.random() * 4));

                    var possible = true;
                    var item;

                    for (var k = 0; k < objects.length; k++) {
                        if (direction == 0) { // lewo
                            if (objects[k].return().x == amoeba.return().x - 1 && objects[k].return().y == amoeba.return().y && objects[k].return().type != "dirt") {
                                possible = false;
                            }
                            if (objects[k].return().x == amoeba.return().x - 1 && objects[k].return().y == amoeba.return().y && objects[k].return().type == "dirt") {
                                item = objects[k];
                            }
                        } else if (direction == 1) { // góra
                            if (objects[k].return().x == amoeba.return().x && objects[k].return().y == amoeba.return().y - 1 && objects[k].return().type != "dirt") {
                                possible = false;
                            }
                            if (objects[k].return().x == amoeba.return().x && objects[k].return().y == amoeba.return().y - 1 && objects[k].return().type == "dirt") {
                                item = objects[k];
                            }
                        } else if (direction == 2) { // prawo
                            if (objects[k].return().x == amoeba.return().x + 1 && objects[k].return().y == amoeba.return().y && objects[k].return().type != "dirt") {
                                possible = false;
                            }
                            if (objects[k].return().x == amoeba.return().x + 1 && objects[k].return().y == amoeba.return().y && objects[k].return().type == "dirt") {
                                item = objects[k];
                            }
                        } else if (direction == 3) { // dół
                            if (objects[k].return().x == amoeba.return().x && objects[k].return().y == amoeba.return().y + 1 && objects[k].return().type != "dirt") {
                                possible = false;
                            }
                            if (objects[k].return().x == amoeba.return().x && objects[k].return().y == amoeba.return().y + 1 && objects[k].return().type == "dirt") {
                                item = objects[k];
                            }
                        }
                    }

                    if (possible == true) {
                        if (direction == 0) {
                            if (item != undefined) {
                                item.remove();
                            }
                            var newAmoeba = new Amoeba(amoeba.return().x - 1, amoeba.return().y);
                            probability = 5;
                            notEnoughSpace = 0;
                        } else if (direction == 1) {
                            if (item != undefined) {
                                item.remove();
                            }
                            var newAmoeba = new Amoeba(amoeba.return().x, amoeba.return().y - 1);
                            probability = 5;
                            notEnoughSpace = 0;
                        } else if (direction == 2) {
                            if (item != undefined) {
                                item.remove();
                            }
                            var newAmoeba = new Amoeba(amoeba.return().x + 1, amoeba.return().y);
                            probability = 5;
                            notEnoughSpace = 0;
                        } else if (direction == 3) {
                            if (item != undefined) {
                                item.remove();
                            }
                            var newAmoeba = new Amoeba(amoeba.return().x, amoeba.return().y + 1);
                            probability = 5;
                            notEnoughSpace = 0;
                        }
                    }

                    if (notEnoughSpace > 30) {
                        for (var z = 0; z < objects.length; z++) {
                            if (objects[z].return().type == "player") {
                                for (var j = 0; j < objects.length; j++) {
                                    if (objects[z].return().x + 1 == objects[j].return().x && objects[z].return().y == objects[j].return().y && objects[j].return().type == "amoeba") {
                                        maybeDiamonds = true;
                                    }
                                    if (objects[z].return().x - 1 == objects[j].return().x && objects[z].return().y == objects[j].return().y && objects[j].return().type == "amoeba") {
                                        maybeDiamonds = true;
                                    }
                                    if (objects[z].return().x == objects[j].return().x && objects[z].return().y + 1 == objects[j].return().y && objects[j].return().type == "amoeba") {
                                        maybeDiamonds = true;
                                    }
                                    if (objects[z].return().x == objects[j].return().x && objects[z].return().y - 1 == objects[j].return().y && objects[j].return().type == "amoeba") {
                                        maybeDiamonds = true;
                                    }
                                }
                            }
                        }
                        if (maybeDiamonds == false) {
                            var rocking = new Rock(amoeba.return().x, amoeba.return().y);
                            amoeba.remove();
                            amoeba.totalRemove();
                        } else {
                            var diamonding = new Diamond(amoeba.return().x, amoeba.return().y);
                            amoeba.remove();
                            amoeba.totalRemove();
                        }
                    }

                    if (properTime > 500) {
                        var rocking = new Rock(amoeba.return().x, amoeba.return().y);
                        amoeba.remove();
                        amoeba.totalRemove();
                    }
                }
            }
        }
    }, 2000);

    amoebasIntervals.push(amoeba.intelligence);

    this.get = function () {
        return amoeba;
    }

    if (amoeba != undefined) {
        amoeba.totalRemove = function () {
            clearInterval(amoeba.intelligence);
            console.log("Amoebra true dead");
            for (var i = 0; i < listOfObjects.length; i++) {
                if (amoeba == listOfObjects[i]) {
                    listOfObjects.splice(i, 1);
                }
            }
            amoeba.dead = true;
            amoeba = null;
        }
    }
}