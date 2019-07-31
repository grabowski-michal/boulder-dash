function Door(x, y) {
    var door = new Object('gfx/objects/door/door_01.gif', x, y, "door", falls.no, animated.yes);
    door.animationChange(0, 1);
    door.animationSpeedChange(35);
    door.return().obstacle = true;

    listOfObjects.push(door);

    this.get = function () {
        return door;
    }

    door.totalRemove = function () {
        door = null;
    }
}