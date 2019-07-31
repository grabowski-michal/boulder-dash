function steelWall(x, y) {
    var steelWall = new Object('gfx/objects/steel_wall/steel_wall_01.gif', x, y, "steelWall", falls.no, animated.no);

    listOfObjects.push(steelWall);

    this.get = function () {
        return steelWall;
    }

    steelWall.totalRemove = function () {
        steelWall = null;
    }
}