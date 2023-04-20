//캔버스 세팅
let canvas;
let ctx;

canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;

document.body.appendChild(canvas);

let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameOverImage;
let gameOver = false;
let score = 0;

//우주선 좌표
let spaceshipX = canvas.width / 2 - 30;
let spaceshipY = canvas.height - 60;

let bulletList = []; //총알들을 저장하는 리스트

class Bullet {
  constructor() {
    this.x = 0;
    this.y = 0;

    this.init = function () {
      this.x = spaceshipX + 22;
      this.y = spaceshipY;
      this.alive = true;

      bulletList.push(this);
    };

    this.update = function () {
      this.y -= 7;
    };

    this.checkHit = function () {
      for (let i = 0; i < enemyList.length; i++) {
        if (
          this.y <= enemyList[i].y &&
          this.x >= enemyList[i].x &&
          this.x <= enemyList[i].x + 40
        ) {
          score++;
          this.alive = false;
          enemyList.splice(i, 1);
        }
      }
    };
  }
}

function loadImage() {
  backgroundImage = new Image();
  backgroundImage.src = "images/background.jpeg";

  spaceshipImage = new Image();
  spaceshipImage.src = "images/spaceship.png";

  bulletImage = new Image();
  bulletImage.src = "images/bullet.png";

  enemyImage = new Image();
  enemyImage.src = "images/enemy.png";

  gameOverImage = new Image();
  gameOverImage.src = "images/gameover.jpeg";
}

let keysDown = {};
function setupKeyboardListener() {
  document.addEventListener("keydown", function (event) {
    keysDown[event.key] = true;
    console.log("스페이스바", event.key);
  });
  document.addEventListener("keyup", function (event) {
    delete keysDown[event.key];

    if (event.keyCode == 32) {
      createBullet();
    }
  });
}

function generateRandomValue(min, max) {
  let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNum;
}

let enemyList = [];

class Enemy {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.init = function () {
      this.y = 0;
      this.x = generateRandomValue(0, canvas.width - 48);
      enemyList.push(this);
    };
    this.update = function () {
      this.y += 1; //적군 속도 조절

      if (this.y >= canvas.height - 48) {
        gameOver = true;
        console.log("gameover");
      }
    };
  }
}

function createBullet() {
  console.log("총알리스트", bulletList);
  let b = new Bullet();
  b.init();
}

function createEnemy() {
  const interval = setInterval(function () {
    let e = new Enemy();
    e.init();
  }, 1000);
}

function update() {
  if ("ArrowRight" in keysDown) {
    spaceshipX += 5; //우주선 속도
  }
  if ("ArrowLeft" in keysDown) {
    spaceshipX -= 5;
  }

  if (spaceshipX <= 0) {
    spaceshipX = 0;
  }
  if (spaceshipX >= canvas.width - 60) {
    spaceshipX = canvas.width - 60;
  }

  for (let i = 0; i < bulletList.length; i++) {
    bulletList[i].update();
    bulletList[i].checkHit();
  }

  for (let i = 0; i < enemyList.length; i++) {
    enemyList[i].update();
  }
}

function render() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);

  for (let i = 0; i < bulletList.length; i++) {
    if (bulletList[i].alive) {
      ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);
    }
  }

  for (let i = 0; i < enemyList.length; i++) {
    ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y);
  }
}

function main() {
  if (!gameOver) {
    update(); // 좌표값 업데이트
    render(); // 그리기
    requestAnimationFrame(main);
  } else {
    ctx.drawImage(gameOverImage, 10, 100, 380, 380);
  }
}

loadImage();
setupKeyboardListener();
createEnemy();
main();
