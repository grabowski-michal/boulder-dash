var pieces = [];

function endGame() {
    levelSettings.gameOver = true;
    clearInterval(Timing);

    var pointsSound = new Audio(Sounds.points);
    pointsSound.play();

    var Interval = setInterval(function () {
        if (levelSettings.time > 0) {
            levelSettings.time--;
            levelSettings.score++;
        } else {
            clearInterval(Interval);
            setTimeout(function () {
                location.reload();
            }, 1000)
        }
    }, 10);
}

function Restart() {
    for (var i = 0; i < listOfObjects.length; i++) {
        listOfObjects[i].totalRemove();
    }

    objects = [];
    players = [];
    listOfObjects = [];

    var noise = new Audio(Sounds.noise);
    noise.play();

    levelSettings.time = 200;
    if (levelSettings.lives > 0) levelSettings.lives--;
    levelSettings.gameOver = false;
    levelSettings.doorOpened = false;
    levelSettings.showStatistics = false;
    levelSettings.timeOut = 0;
    levelSettings.player = 1;
    levelSettings.pauseQueue = 0;

    clearInterval(Timing);

    for (var i = 0; i < amoebasIntervals.length; i++) {
        clearInterval(amoebasIntervals[i]);
    }

    screenOperator.horizontal = levelSettings.mapWidth * 32 * (-1);
    screenOperator.vertical = levelSettings.mapHeight * 36 * (-1);

    notEnoughSpace = 0;
    properTime = 0;

    beginLevel("A1");
}