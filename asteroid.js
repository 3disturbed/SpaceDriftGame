class Asteroid {
    constructor(x, y, size, speed) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.speed = speed;
      this.rotation = Math.random() * Math.PI * 2; // Random initial rotation angle
      this.rotationSpeed = (Math.random() - 0.5) * 0.1; // Random rotation speed between -0.05 and 0.05 radians per frame
      this.image = new Image();
      this.image.src = 'asteroid.png'; // Path to your asteroid image
    }
  
    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation); // Apply the rotation to the asteroid
      ctx.drawImage(this.image, -this.size / 2, -this.size / 2, this.size, this.size);
      ctx.restore();
    }
  
    update() {
      this.y += this.speed; // Move asteroid downwards
      this.rotation += this.rotationSpeed; // Update the rotation based on rotation speed
    }
  
    isOffScreen() {
      return this.y > canvas.height + this.size;
    }
  }
  