function Boom(x, y) {
    var boom = new Object('gfx/objects/boom/boom_01.gif', x, y, "boom", falls.no, animated.yes);
    boom.animationChange(0, 8);
    boom.animationSpeedChange(80);

    listOfObjects.push(boom);

    this.get = function () {
        return boom;
    }

    boom.totalRemove = function () {
        boom = null;
    }
}