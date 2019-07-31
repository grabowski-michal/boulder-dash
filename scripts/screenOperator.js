var screenOperator = {
    horizontal: 0,
    vertical: 0,
    lastTime: new Date(),
    startMoving: function () {
        var Interval = setInterval(function () {
            var time = new Date().getTime() - screenOperator.lastTime.getTime();
            if (screenOperator.horizontal > 0 && (levelSettings.mapWidth - levelSettings.screenWidth) * 32 > (-1) * levelSettings.widthShift) {
                levelSettings.widthShift -= Math.floor(time / 5);
                screenOperator.horizontal -= Math.floor(time / 5);
            }
            if (screenOperator.horizontal < 0 && levelSettings.widthShift * 32 * (-1) > 0) {
                levelSettings.widthShift += Math.floor(time / 5);
                screenOperator.horizontal += Math.floor(time / 5);
            }
            if (screenOperator.vertical > 0 && (levelSettings.mapHeight - levelSettings.screenHeight) * 36 > (-1) * levelSettings.heightShift) {
                levelSettings.heightShift -= Math.floor(time / 5);
                screenOperator.vertical -= Math.floor(time / 5);
            }
            if (screenOperator.vertical < 0 && levelSettings.heightShift * 36 * (-1) > 0) {
                levelSettings.heightShift += Math.floor(time / 5);
                screenOperator.vertical += Math.floor(time / 5);
            }
            screenOperator.lastTime = new Date();
        }, 5)
    },
}