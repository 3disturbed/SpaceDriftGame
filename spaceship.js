class Spaceship {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.width = 100;
      this.height = 150;
      this.speed = 2;
      this.image = new Image();
      this.image.src = 'spaceship.png'; // Use your spaceship image path
    }
  
    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.drawImage(this.image, -this.width / 2 -10, -this.height / 2 -10, this.width + 20, this.height+20) ;
      ctx.restore();
    }
  
    updatePosition(tiltX, tiltY) {
      this.x += tiltX * this.speed;
      this.y += tiltY * this.speed;
  
      // Keep spaceship within canvas boundaries
      this.x = Math.max(this.width / 2, Math.min(canvas.width - this.width / 2, this.x));
      this.y = Math.max(this.height / 2, Math.min(canvas.height - this.height / 2, this.y));
    }
  
    checkCollision(asteroid) {
      const dx = asteroid.x - this.x;
      const dy = asteroid.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < asteroid.size + this.width / 2;
    }
  }
  