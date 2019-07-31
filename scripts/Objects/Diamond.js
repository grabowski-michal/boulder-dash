function Diamond(x, y) {
    var diamond = new Object('gfx/objects/diamond/diamond_01.gif', x, y, "diamond", falls.yes, animated.yes);
    diamond.animationChange(0, 8);
    diamond.animationSpeedChange(30);

    listOfObjects.push(diamond);

    this.get = function () {
        return diamond;
    }

    diamond.totalRemove = function () {
        diamond = null;
    }
}