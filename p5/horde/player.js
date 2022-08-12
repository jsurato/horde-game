function Player(screenWidth, screenHeight, img, imgShooting, imgDead) {
  this.pos = createVector(screenWidth / 2, screenHeight / 2);
  this.isShooting = false;
  this.size = 50;
  this.playerSpeed = 5;
  this.health = 100;
  this.invincible = false;

  this.render = function () {
    push();
    fill(105, 200, 30);
    translate(this.pos.x, this.pos.y);
    let a = atan2(mouseY - this.pos.y, mouseX - this.pos.x);
    rotate(a + 90);
    if (this.isShooting) {
      image(imgShooting, 0, 0, this.size, this.size);
    } else {
      image(img, 0, 0, this.size, this.size);
    }
    pop();
  };

  this.move = function () {
    if (this.isShooting) {
      this.playerSpeed = 4;
    } else {
      this.playerSpeed = 5;
    }
    // move left
    if (keyIsDown(65) && this.pos.x > 0 + this.size / 2) {
      this.pos.x -= this.playerSpeed;
    }
    // move up
    if (keyIsDown(87) && this.pos.y > 0 + this.size / 2) {
      this.pos.y -= this.playerSpeed;
    }
    // move right
    if (keyIsDown(68) && this.pos.x < width - this.size / 2) {
      this.pos.x += this.playerSpeed;
    }
    // move down
    if (keyIsDown(83) && this.pos.y < height - this.size / 2) {
      this.pos.y += this.playerSpeed;
    }
  };

  this.damage = function () {
    if (this.health > 0) {
      this.health -= 10;
    }
  };
}
