function Dirt(x, y) {
    var dirt = new Object('gfx/objects/dirt/dirt_01.gif', x, y, "dirt", falls.no, animated.no);

    listOfObjects.push(dirt);

    this.get = function () {
        return dirt;
    }

    dirt.totalRemove = function () {
        dirt = null;
    }
}