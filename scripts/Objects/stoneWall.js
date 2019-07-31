function stoneWall(x, y) {
    var stoneWall = new Object('gfx/objects/stone_wall/stone_wall_01.gif', x, y, "stoneWall", falls.no, animated.no);

    listOfObjects.push(stoneWall);

    this.get = function () {
        return stoneWall;
    }

    stoneWall.totalRemove = function () {
        stoneWall = null;
    }
}