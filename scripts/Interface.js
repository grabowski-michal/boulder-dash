var pauseQueue;

function Interface() {
    document.addEventListener("keydown", function (e) {
        if (levelSettings.started == true && levelSettings.timeOut == 0) {
            if (e.keyCode == 32) { // Spacebar
                if (levelSettings.paused == false && Timing != undefined) {
                    howMuchTimeHasPassed += nowTime.getTime() - beforeTime.getTime();
                    levelSettings.paused = true;
                    levelSettings.pauseQueue = 4;
                    pauseQueue = setInterval(function () {
                        if (levelSettings.pauseQueue > 0) {
                            levelSettings.pauseQueue--;
                        } else {
                            levelSettings.pauseQueue = 4;
                        }
                    }, 1000)
                } else {
                    levelSettings.paused = false;
                    clearInterval(pauseQueue);
                    levelSettings.pauseQueue = 0;
                }
            }
            if (e.keyCode == 17) { // control
                if (levelSettings.gameOver == true) {
                    if (levelSettings.lives > 1) {
                        Restart();
                        console.log("Restart");
                    } else {
                        levelSettings.totalGameOver = true;
                    }
                }
                if (levelSettings.totalGameOver == true) {
                    setTimeout(function () {
                        location.reload();
                    }, 1000)
                }
            }
            if (e.keyCode == 27) { // esc
                if (Timing != undefined) {
                    levelSettings.gameOver = true;
                }
            }
        }
    });
}