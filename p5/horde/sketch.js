let player;
let enemies = [];
let deadEnemies = [];
let zombieImages = [];
let playerImage;
let playerShootingImage;
let bloodSplatterImage;
let projectiles = [];
let timer = 0;
let score = 0;
let playerSafeTimer = 0;
let maxZombies = 10;
let x1;
let x2;
let y1;
let y2;

function preload() {
  for (let i = 1; i <= 4; i++) {
    let zombie = loadImage("images/zombie" + i + ".png");
    zombieImages.push(zombie);
  }
  playerImage = loadImage("images/player.png");
  playerShootingImage = loadImage("images/playerShooting.png");
  bloodSplatterImage = loadImage("images/bloodSplatter.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  x1 = width / 4;
  x2 = (3 * width) / 4;
  y1 = height / 4;
  y2 = (3 * height) / 4;
  player = new Player(
    width,
    height,
    playerImage,
    playerShootingImage,
    bloodSplatterImage
  );
  for (let i = 0; i < maxZombies; i++) {
    let pos = spawn(x1, y1, x2, y2);
    console.log(pos)
    enemies.push(
      new Enemy(
        pos[0],
        pos[1],
        zombieImages[i % 4],
        bloodSplatterImage
      )
    );
  }
  angleMode(DEGREES);
  imageMode(CENTER);
}

function draw() {
  background(50);
  drawPlayerHealth();

  if (player.health > 0) {
    maxZombies = Math.trunc(10 + ((score / 100) % 100));
    
    drawScore();
    
    for (let i = 0; i < deadEnemies.length; i++) {
      deadEnemies[i].render();
    }

    for (let i = 0; i < enemies.length; i++) {
      enemies[i].render();
      enemies[i].seek(player.pos);

      // handle damaging the player

      if (enemies[i].hitPlayer(player.pos, player.size)) {
        if (playerSafeTimer > 1500) {
          player.damage();
          playerSafeTimer = 0;
        } else {
          playerSafeTimer += deltaTime;
        }
      }
    }

    for (let i = 0; i < projectiles.length; i++) {
      projectiles[i].render();
      projectiles[i].update();
      for (let j = 0; j < enemies.length; j++) {
        if (
          projectiles[i].checkForHit(
            enemies[j].pos,
            enemies[j].size,
            enemies[j].health
          )
        ) {
          enemies[j].hit();
        }
      }
    }

    if (mouseIsPressed) {
      timer += deltaTime;
      player.isShooting = true;
      if (timer > 125) {
        projectiles.push(
          new projectile(player.pos, createVector(mouseX, mouseY))
        );
        timer = 0;
      }
    }
    player.render();
    player.move();

    addEnemies();
    removeDeadEnemies();
  } else {
    player.render();
    endGame();
  }
}

function mousePressed() {
  player.isShooting = true;
  projectiles.push(new projectile(player.pos, createVector(mouseX, mouseY)));
}

function mouseReleased() {
  player.isShooting = false;
}

function addEnemies() {
  for (let i = 0; i < maxZombies; i++) {
    if (enemies.length < maxZombies || enemies[i].health <= 0) {
      let pos = spawn(x1, y1, x2, y2);
      enemies.push(
        new Enemy(
          pos[0],
          pos[1],
          zombieImages[i % 4],
          bloodSplatterImage
        )
      );
    }
  }
}

function removeDeadEnemies() {
  for (let i = 0; i < enemies.length; i++) {
    if (enemies[i].health <= 0) {
      score += enemies[i].size;
      score = Math.trunc(score);
      deadEnemies.push(enemies.splice(i, 1)[0]);
      i--;
    }
  }
}

function drawScore() {
  push();
  fill(255);
  textFont("monospace");
  textSize(30);
  text(score.toString(), width / 2, 40);
  pop();
}

function drawPlayerHealth() {
  push();
  fill(255, 0, 0);
  rect(75, 50, width - 150, 10, 2);
  fill(0, 255, 0);
  rect(75, 50, (width - 150) * (player.health / 100), 10, 2);
}

function spawn(x1, y1, x2, y2) {
  // determine zone
  const zone = Math.trunc(random(0, 4)) % 4;

  switch (zone) {
    case 0:
      // left edge
      return [random(0, x1), random(0, height)];
    case 1:
      // top edge
      return [random(0, width), random(0, y1)];
    case 2:
      // right edge
      return [random(x2, width), random(0, height)];
    case 3:
      // bottom edge
      return [random(0, width), random(y2, height)];
  }
}

function endGame() {
  push();
  fill(255);
  textFont('monospace');
  textSize(72);
  textAlign(CENTER);
  text("GAME OVER!!!", width/2, height/2-72);
  text("Score: " + score.toString(), width/2, height/2);
  pop();
}