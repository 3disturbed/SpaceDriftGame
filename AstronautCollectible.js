class AstronautCollectible {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
      this.size = 100; // Size of the astronaut
      this.x = Math.random() * this.canvas.width;
      this.y = -100
      this.lifetime = 30000; // Lifetime in frames (around 5 seconds at 60 FPS)
      this.image = new Image();
      this.image.src = 'astronaut.png'; // Path to your astronaut image
    }
  
    draw(ctx) {
      ctx.save();
      ctx.drawImage(this.image, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
      ctx.restore();
    }
  
    update() {
      // Decrease the lifetime of the astronaut collectible

      this.y += 1;
      if (this.y > this.canvas.height + this.size) {
        this.lifetime = 0; // Set lifetime to 0 to remove the collectible
      }
    }
  
    isExpired() {
      // Check if the collectible has expired
      return this.lifetime <= 0;
    }
  
    checkCollision(spaceship) {
      const dx = this.x - spaceship.x;
      const dy = this.y - spaceship.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < this.size / 2 + spaceship.width / 2;
    }
  }
  