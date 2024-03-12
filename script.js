const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");

let player = { speed: 15, score: 0 };

// keys object to determine which key is pressed
let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
};

// <------------------------keyDown and keyUp--------->
function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true;
}

function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;
}
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

// <----------KeyDown and KeyUp end----------------->

function isCollide(a, b) {
    arect = a.getBoundingClientRect();
    brect = b.getBoundingClientRect();
    return !(
        arect.top > brect.bottom ||
        arect.bottom < brect.top ||
        arect.right < brect.left ||
        arect.left > brect.right
    );
}

function moveEnemy(car) {
    let enemy = document.querySelectorAll(".enemy");
    enemy.forEach((value) => {
        if (isCollide(car, value)) {
            endGame();
        }

        if (value.y >= 750) {
            value.y = -300;
            value.style.left = Math.floor(Math.random() * 350) + "px";
        }
        value.y += player.speed;
        value.style.top = value.y + "px";
    });
}

function moveLines() {
    let lines = document.querySelectorAll(".lines");
    lines.forEach((value) => {
        if (value.y >= 700) {
            value.y -= 750;
        }
        value.y += player.speed;
        value.style.top = value.y + "px";
    });
}


function endGame() {
    player.start = false;
    startScreen.classList.remove("hide");
    startScreen.innerHTML =
        "Game Over <br>  Your Final Score is " +
        player.score +
        "<br>Press here to start the game";
}

function gamePlay() {
    let car = document.querySelector(".Car");
    let road = gameArea.getBoundingClientRect();

    if (player.start) {
        moveLines();
        moveEnemy(car);

        if (keys.ArrowUp && player.y > road.top + 70) {
            player.y -= player.speed;
        }
        if (keys.ArrowDown && player.y < road.bottom - 85) {
            player.y += player.speed;
        }
        if (keys.ArrowLeft && player.x > 0) {
            player.x -= player.speed;
        }
        if (keys.ArrowRight && player.x < 350) {
            player.x += player.speed;
        }

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";

        window.requestAnimationFrame(gamePlay); // It is responsible for continuous animation

        player.score++;
        let ps = player.score - 1;
        score.innerText = "Score: " + ps;
    }
}

function start() {
    player.start = true;
    player.score = 0;

    // start pe click kiya toh phele hmara startscreen chup jaani chaiye aur gameArea dikh jaana chaiye

    //gameArea.classList.remove("hide");
    startScreen.classList.add("hide");
    gameArea.innerHTML = "";

    //generate our car
    let car = document.createElement("div");
    car.setAttribute("class", "Car");
    // car.innerText="hi";
    gameArea.append(car);

    //generate our road
    for (let i = 0; i < 5; i++) {
        let roadLine = document.createElement("div");
        roadLine.setAttribute("class", "lines");
        roadLine.y = i * 150;
        roadLine.style.top = roadLine.y + "px";
        gameArea.append(roadLine);
    }

    //generate our enemy car
    for (let x = 0; x < 3; x++) {
        let enemyCar = document.createElement("div");
        enemyCar.setAttribute("class", "enemy");
        enemyCar.y = (x + 1) * 350 * -1;
        enemyCar.style.top = enemyCar.y + "px";
        // enemyCar.style.backgroundColor = "blue";
        enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
        gameArea.append(enemyCar);
    }

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    window.requestAnimationFrame(gamePlay);
}

//Initial function to start the game
startScreen.addEventListener("click", start);
