// each enemy should have direction vector and a velocity
// the vector should point at the players position

function Enemy(posX, posY, img, imgDead) {
  this.pos = createVector(posX, posY);
  this.direction = createVector(0, 0);
  this.speed;
  this.size = random(25, 50);
  this.health = this.size;
  this.playerPos = createVector(0, 0);

  this.render = function () {
    push();
    if (this.health > 0) {
      this.speed = 7 - this.size / 10;
      fill(255, 0, 0);
      rect(this.pos.x - this.size / 2, this.pos.y - this.size, this.size, 5, 1);
      fill(0, 255, 0);
      rect(this.pos.x - this.size / 2, this.pos.y - this.size, this.health, 5, 1);
      translate(this.pos.x, this.pos.y);
      // draw health bar before rotation occurss
      let a = atan2(
        this.playerPos.y - this.pos.y,
        this.playerPos.x - this.pos.x
      );
      rotate(a + 90);
      image(img, 0, 0, this.size, this.size);
    } else {
      // don't draw the health bar if dead
      this.speed = 0;
      translate(this.pos.x, this.pos.y);
      rotate(this.size * 90);
      image(imgDead, 0, 0, this.size, this.size);
    }
    pop();
  };

  this.seek = function (pos) {
    // seek out the player object based on the player's position
    let direction = createVector(pos.x - this.pos.x, pos.y - this.pos.y);
    this.playerPos = pos;
    direction.normalize();
    this.pos.x += direction.x * this.speed;
    this.pos.y += direction.y * this.speed;
  };

  this.hit = function () {
    this.health -= 5;
    if (this.health <= 0) {
      return true;
    }
    return false;
  };

  this.hitPlayer = function (playerPos, playerSize) {
    if (
      dist(this.pos.x, this.pos.y, playerPos.x, playerPos.y) <
      playerSize
    ) {
      return true;
    }
    return false;
  };

  this.spawn = function (x1, y1, x2, y2) {
    // determine zone
    const zone = Math.trunc(random(0,4))%4;

    switch(zone) {
        case 0:
            // left edge
            return (random(0, x1), random(0, height));
        case 1:
            // top edge
            return (random(0, width), random(0, y1));
        case 2:
            // right edge
            return (random(x2, width), random(0,height));
        case 3:
            // bottom edge
            return (random(0, width), random(y2, height));
    }
  }
}
