

let canvas = document.createElement('canvas');
canvas.id = "canvasID"
canvas.width = 800;
canvas.height = 600;
canvas.style.border = '1px solid'
document.body.append(canvas);
/** @type {CanvasRenderingContext2D} */
let ctx;

const FPS = 60;


let x = 50, y = 100;
let speedX = 5, speedY = 5;

let padY, pad2Y = 1, padHeight = 100, padTickness = 10;
let playerscore = 0, computerscore = 0;


window.onload = function () {

    ctx = canvas.getContext("2d");

    setInterval(function update() {
        createCube();
        drawNet();
        moveCube();
        computerMovement();
    }, 1000 / FPS)

    canvas.addEventListener('mousemove', function (evt) {
        let mousePos = calculateMousePos(evt);
        padY = mousePos.y;
    });

}
function moveCube() {
    x += speedX
    y += speedY
    if (x > canvas.width - padTickness * 2) {
        if (y > pad2Y && y < (pad2Y + padHeight)) {
            speedX = -speedX
            let deltaY = y - (pad2Y + padHeight / 2);
            if (deltaY <= 6)
                speedY = deltaY * 0.35
            else speedY = 8
        } else {
            playerscore++
            resetBall()
        }
    }
    if (x - padTickness * 2 < 0) {
        if (y > padY && y < (padY + padHeight)) {
            speedX = -speedX
            let deltaY = (y - (padY + padHeight / 2));
            if (deltaY <= 6)
                speedY = deltaY * 0.35
            else speedY = 8
        } else {
            computerscore++
            resetBall()
        }
    }
    if (y > canvas.height) {
        speedY = -speedY;
    }
    if (y < 0) {
        speedY = -speedY;
    }
}
function createCube() {
    //Background
    createRect(0, 0, canvas.width, canvas.height, 'white');
    //Player Pad
    createRect(0, padY, padTickness, padHeight, 'black')
    //AI Pad
    createRect(canvas.width - padTickness, pad2Y, padTickness, padHeight, 'black')
    //Red ball
    createCircle(x, y, 10, "red");
    //ScoreBoard
    ctx.fillStyle = 'green'
    ctx.font = "30px Verdana";
    var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");
    // Заполняем текст градиентом
    ctx.fillStyle = gradient;
    ctx.fillText(`Score: ${playerscore}`, 0, 50)
    ctx.fillText(`Score: ${computerscore}`, 650, 50)


}
function createCircle(posx, posy, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(posx, posy, radius, 0, Math.PI * 2, true);
    ctx.fill();
}
function createRect(posx, posy, rwidth, rheidth, color) {
    ctx.fillStyle = color;
    ctx.fillRect(posx, posy, rwidth, rheidth);
}
function calculateMousePos(evt) {
    let rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    let mouseX = evt.clientX - rect.left - root.scrollLeft;
    let mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    }
}
function resetBall() {
    speedX = -speedX;
    x = canvas.width / 2
    y = canvas.height / 2
}
function computerMovement() {
    let pad2YCenter = pad2Y + (padHeight / 2);
    if (pad2YCenter < y - 35)
        pad2Y += 8
    else if (pad2YCenter > y + 35)
        pad2Y -= 8
}
function drawNet() {
    for (let i = 0; i < canvas.height; i += 40) {
        createRect(canvas.width / 2, i, 2, 20, 'black')
    }
}