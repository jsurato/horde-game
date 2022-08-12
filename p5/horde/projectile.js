function projectile(playerPos, mousePos) {
    this.pos = createVector(playerPos.x, playerPos.y);
    this.vel = createVector(mousePos.x - playerPos.x, mousePos.y - playerPos.y).normalize();
    this.vel.mult(10);

    this.render = function() {
        push();
        stroke(229, 215, 17);
        strokeWeight(4);
        point(this.pos.x + 4*this.vel.x, this.pos.y + 4*this.vel.y);
        pop();
    }

    this.update = function() {
        this.pos.add(this.vel);
    }

    this.checkForHit = function(enemyPos, enemySize, enemyHealth) {
        if (dist(this.pos.x, this.pos.y, enemyPos.x, enemyPos.y) < enemySize/2 && enemyHealth > 0) { 
            this.pos.x = -50;
            this.pos.y = -50; 
            this.vel = 0;
            return true;
        }
        return false;
    }
}