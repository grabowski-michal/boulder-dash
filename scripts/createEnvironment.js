objects = [];
listOfObjects = [];

function createEnvironment(color) {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    contextCreated = true;

    canvas.style.backgroundColor = color;
}

function changeColor(color) {
    canvas.style.backgroundColor = color;
}

function beginLevel(nr) {
    if (nr == "A1") {
        A1();
        changeColor("#2A0000");
    } else {
        A1();
        changeColor("#2A0000");
    }
}

function createBoundaries() {
    for (var i = 0; i < levelSettings.mapWidth; i++) {
        var steel_wall = new steelWall(i, 0);
        steel_wall = new steelWall(i, levelSettings.mapHeight - 1);
    }
    for (var i = 1; i < levelSettings.mapHeight - 1; i++) {
        var steel_wall = new steelWall(0, i);
        var steel_wall = new steelWall(levelSettings.mapWidth - 1, i);
    }
}

function defineNumbers(color) {
    if (color == "white") {
        var numbers = ["gfx/numbers/white/0.gif", "gfx/numbers/white/1.gif", "gfx/numbers/white/2.gif", "gfx/numbers/white/3.gif", "gfx/numbers/white/4.gif", "gfx/numbers/white/5.gif", "gfx/numbers/white/6.gif", "gfx/numbers/white/7.gif", "gfx/numbers/white/8.gif", "gfx/numbers/white/9.gif"];
    } else if (color == "blue") {
        var numbers = ["gfx/numbers/blue/0.gif", "gfx/numbers/blue/1.gif", "gfx/numbers/blue/2.gif", "gfx/numbers/blue/3.gif", "gfx/numbers/blue/4.gif", "gfx/numbers/blue/5.gif", "gfx/numbers/blue/6.gif", "gfx/numbers/blue/7.gif", "gfx/numbers/blue/8.gif", "gfx/numbers/blue/9.gif"];
    } else {
        var numbers = ["gfx/numbers/gray/0.gif", "gfx/numbers/gray/1.gif", "gfx/numbers/gray/2.gif", "gfx/numbers/gray/3.gif", "gfx/numbers/gray/4.gif", "gfx/numbers/gray/5.gif", "gfx/numbers/gray/6.gif", "gfx/numbers/gray/7.gif", "gfx/numbers/gray/8.gif", "gfx/numbers/gray/9.gif"];
    }
    return numbers;
}

function drawLetter(letter, x, y, color) {
    if (color == "blue") {
        var letters = ["gfx/numbers/blue/a.gif", "gfx/numbers/blue/e.gif", "gfx/numbers/blue/i.gif", "gfx/numbers/blue/m.gif"];
    } else {
        var letters = ["gfx/numbers/blue/a.gif", "gfx/numbers/blue/e.gif", "gfx/numbers/blue/i.gif", "gfx/numbers/blue/m.gif"];
    }

    if (letter == "A") { var img = new Image(); img.src = letters[0]; ctx.drawImage(img, 0, 0, 28, 14, x, y, 28, 14); }
    else if (letter == "E") { var img = new Image(); img.src = letters[1]; ctx.drawImage(img, 0, 0, 28, 14, x, y, 28, 14); }
    else if (letter == "I") { var img = new Image(); img.src = letters[2]; ctx.drawImage(img, 0, 0, 28, 14, x, y, 28, 14); }
    else if (letter == "M") { var img = new Image(); img.src = letters[3]; ctx.drawImage(img, 0, 0, 28, 14, x, y, 28, 14); }
}

function drawSingularNumbers(number, x, y, color) {
    numbers = defineNumbers(color);

    number = number.toString();

    for (var i = 0; i < number.length; i++) {
        var img = new Image();
        img.src = numbers[parseInt(number[i])];
        ctx.drawImage(img, 0, 0, 28, 14, x + i * 32, y, 28, 14);
    }
}

function drawNumbers(number, x, y, color) {
    numbers = defineNumbers(color);

    number = number.toString();
    if (parseInt(number) < 10) {
        var img = new Image();
        img.src = numbers[0];
        ctx.drawImage(img, 0, 0, 28, 14, x, y, 28, 14);
    }
    for (var i = 0; i < number.length; i++) {
        var factor = 0;
        if (parseInt(number) < 10) { factor = 1; };

        var img = new Image();
        img.src = numbers[parseInt(number[i])];
        ctx.drawImage(img, 0, 0, 28, 14, x + (i + factor) * 32, y, 28, 14);
    }
}

function drawTime(number, x, y, color) {
    numbers = defineNumbers(color);

    number = number.toString();
    if (parseInt(number) < 10) number = "00" + number;
    else if (parseInt(number) < 100 && parseInt(number) >= 10) number = "0" + number;

    for (var i = 0; i < number.length; i++) {
        var img = new Image();
        img.src = numbers[parseInt(number[i])];
        ctx.drawImage(img, 0, 0, 28, 14, x + i * 32, y, 28, 14);
    }
}

function drawDiamond(x, y) {
    var img = new Image();
    img.src = "gfx/numbers/d.gif";
    ctx.drawImage(img, 0, 0, 28, 14, x, y, 26, 14);
}

function drawScore(number, x, y, color) {
    numbers = defineNumbers(color);

    number.toString();
    if (parseInt(number) < 10) number = "00000" + number;
    else if (parseInt(number) < 100 && parseInt(number) >= 10) number = "0000" + number;
    else if (parseInt(number) < 1000 && parseInt(number) >= 100) number = "000" + number;
    else if (parseInt(number) < 10000 && parseInt(number) >= 1000) number = "00" + number;
    else if (parseInt(number) < 100000 && parseInt(number) >= 10000) number = "0" + number;

    for (var i = 0; i < number.length; i++) {
        var img = new Image();
        img.src = numbers[parseInt(number[i])];
        ctx.drawImage(img, 0, 0, 28, 14, x + i * 32, y, 28, 14);
    }
}