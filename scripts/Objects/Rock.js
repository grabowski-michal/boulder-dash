function Rock(x, y) {
    var rock = new Object('gfx/objects/rock/rock_01.gif', x, y, "rock", falls.yes, animated.no);

    listOfObjects.push(rock);

    this.get = function () {
        return rock;
    }

    rock.totalRemove = function () {
        rock = null;
    }
}