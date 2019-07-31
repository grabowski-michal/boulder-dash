var A1 = function () {
    var levelInfo = ["ZZZZZZPZZDZKPZZZZZKZKZZZZZZZPZZZZKZZZZ","ZKBKZZZZZZPZZZZZZZZZKDZZKZZZZPZZZZZPZZ","ZZZZZZZZZZKZZKZPWPZKZKZZKZZZZFPPZKZZZZ","KZKKZZZZZKAKZKZZZZZZKZZKZZZZKZZZKPZZZZ","KZPKZZZZZZZZZPKZZKZZZZZZZZKZZZZZZKZKPZ","ZZZPZZKZZZZZZZZKZZZZZKZPKZZZZZZZZKZKKZ","MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMZZZKZZKZ","ZPZZZKZZDZPZZKZKZZZZZZZZZZDZKDZZZZZZKZ","ZZDZZZZZKZZZZZPZZZZZZZZKPPKZZPZZZZKZZZ","ZZZKZZKZKZZZZZZZZZZZZZZKKZKZZKZZZZZZZZ","ZPZZZZZKZZZZZZZZKKPZZZZZZZKZZKZDZZZZPZ","ZKZZPZZKZPPZZZZZKZKDZZDZZZZKZZZKZZDZKZ","ZDKZZZZZZZZZZZZZZKKKZZKZZZZZZZZDZZZZZK","ZZZZZZZZMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM","PPZZZZZZZZZPZZZDZZZZKZZZZZKZZZKZZZZZZZ","KPZZZZZZZZZKKZZKZZZZZZZZKZZZZZZKZKPZZE","ZKZZKZZZZZZZZKZZZZZKZPPZZZZDZZZKZKKZZZ","ZZZZKDZZPZZZZZZZZKZZZZZZKZKDZZZZZZKZZZ","ZZZPZZPZKZZKZKKZZZZZZZZZKZKDZZZZZZKZZK","ZDZZZZKZZZZZPZZZZZZZZZPZKZZKZZZZKZZZKZ"]

    levelSettings.started = true;

    levelSettings.mapWidth = 40;
    levelSettings.mapHeight = 22;
    levelSettings.diamonds = 0;
    levelSettings.lessDiamonds = 10;
    levelSettings.diamondsRequired = 12;
    levelSettings.moreDiamonds = 15;
    levelSettings.time = 150;

    screenOperator.startMoving();
    createBoundaries();

    for (var j = levelInfo.length - 1; j >= 0; j--) {
        for (var i = levelInfo[0].length - 1; i >= 0; i--) {
            if (levelInfo[j][i] == "Z") { // Dirt
                var dirt = new Dirt(i + 1, j + 1);
            } else if (levelInfo[j][i] == "K") { // Rock
                var rock = new Rock(i + 1, j + 1);
            } else if (levelInfo[j][i] == "D") { // Diamond
                var diamond = new Diamond(i + 1, j + 1);
            } else if (levelInfo[j][i] == "B") { // Player
                var player = new beforePlayer(i + 1, j + 1);
                levelSettings.showStatistics = true;
            } else if (levelInfo[j][i] == "M") { // StoneWall
                var StoneWall = new stoneWall(i + 1, j + 1);
            } else if (levelInfo[j][i] == "E") { // Exit
                var door = new Door(i + 1, j + 1);
            } else if (levelInfo[j][i] == "W") { // Enemy
                var enemy = new Enemy(i + 1, j + 1);
            } else if (levelInfo[j][i] == "F") { // Demon
                var demon = new Demon(i + 1, j + 1);
            } else if (levelInfo[j][i] == "A") {
                var amoeba = new Amoeba(i + 1, j + 1);
            } else if (levelInfo[j][i] == "P") { // Empty

            }
        }
    }

    for (var i = 0; i < levelSettings.screenWidth + 1; i++) {
        for (var j = 0; j < Math.round(levelSettings.screenHeight) ; j++) {
            var turningwall = new turningWall(i, j, true);
        }
    }
}