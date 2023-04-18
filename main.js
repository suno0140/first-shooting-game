//캔버스 세팅
let canvas;
let ctx;

canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;

document.body.appendChild(canvas);

let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameOverImage;

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

      bulletList.push(this);
    };
    this.update = function () {
      this.y -= 7;
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

function createBullet() {
  console.log("총알리스트", bulletList);
  let b = new Bullet();
  b.init();
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
  }
}

function render() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);

  for (let i = 0; i < bulletList.length; i++) {
    ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);
  }
}

function main() {
  update(); // 좌표값 업데이트
  render(); // 그리기
  requestAnimationFrame(main);
  console.log("animation calls main function");
}

loadImage();
setupKeyboardListener();
main();
