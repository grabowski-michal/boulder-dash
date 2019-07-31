function comingOut(x, y) {
    var comingOut = new Object('gfx/objects/door/door_01.gif', x, y, "comingOut", falls.no, animated.yes);
    comingOut.animationChange(0, 8);
    comingOut.animationSpeedChange(35);

    listOfObjects.push(comingOut);

    this.get = function () {
        return comingOut;
    }

    comingOut.totalRemove = function () {
        comingOut = null;
    }
}