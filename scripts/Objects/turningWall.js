function turningWall(x, y, destroy) {
    var turningWall;

    if (destroy == true) {
        turningWall = new Object('gfx/objects/turning_wall/turning_wall.gif', x, y, "turningWall", falls.no, animated.yes);
        turningWall.animationChange(0, 8);
        turningWall.animationSpeedChange(25);
        var timeOut = setTimeout(function () {
            turningWall.remove();
        }, Math.floor((Math.random() * 1500) + 100));
    } else {
        var timeOut = setTimeout(function () {
            turningWall = new Object('gfx/objects/turning_wall/turning_wall.gif', x, y, "turningWall", falls.no, animated.yes);
            turningWall.animationChange(0, 1);
            turningWall.animationSpeedChange(25);
        }, Math.floor((Math.random() * 1000) + 100));
    }

    listOfObjects.push(turningWall);

    this.get = function () {
        return turningWall;
    }

    if (turningWall != undefined) {
        turningWall.totalRemove = function () {
            turningWall = null;
        }
    }
}