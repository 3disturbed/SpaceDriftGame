class Starfield {
    constructor(canvas, starCount = 100) {
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
      this.starCount = starCount;
      this.stars = [];
      this.initStars();
    }
  
    initStars() {
      for (let i = 0; i < this.starCount; i++) {
        // Each star has a random position, size, and speed
        const star = {
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          size: Math.random() * 2 + 1, // Size between 1 and 3 pixels
          speed: Math.random() * 1.5 + 0.5 // Speed between 0.5 and 2 pixels per frame
        };
        this.stars.push(star);
      }
    }
  
    update() {
      this.stars.forEach(star => {
        // Move each star downward based on its speed
        star.y += star.speed;
  
        // Reset star position to the top if it goes off the bottom
        if (star.y > this.canvas.height) {
          star.y = 0;
          star.x = Math.random() * this.canvas.width; // Reset x to a new random position
        }
      });
    }
  
    draw() {
      this.ctx.fillStyle = "#000000"; // Background color
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      this.ctx.save();
      this.ctx.fillStyle = "#FFFFFF"; // Star color
        
      this.stars.forEach(star => {
        
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, star.size / 2, 0, Math.PI * 2);
        this.ctx.fill();
      });
  
      this.ctx.restore();
    }
  }
  