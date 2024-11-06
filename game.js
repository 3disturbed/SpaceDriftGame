class Game {
    constructor() {
      this.canvas = document.getElementById('gameCanvas');
      this.ctx = this.canvas.getContext('2d');
      this.canvas.width = window.innerWidth * 2;
      this.canvas.height = window.innerHeight * 2;
      this.starfield = new Starfield(this.canvas, 150); // Initialize starfield with 150 stars
      this.collectibles = [];
      this.spaceship = new Spaceship(this.canvas.width / 2, this.canvas.height - 100);
      this.asteroids = [];
      this.tiltX = 0;
      this.tiltY = 0;
      this.isRunning = false;
      this.score = 0;
      this.fuel = 100;
      this.endGameCallback = null;
    }
    
    start(callback) {
      this.isRunning = true;
      this.score = 0;
      this.fuel = 100;
      this.asteroids = [];
      this.gameLoop();
      this.collectibles = [];
        this.endGameCallback = callback;
    }
    spawnCollectible() {
        if (Math.random() < 0.003) { // Adjust spawn rate as needed
          this.collectibles.push(new AstronautCollectible(this.canvas));
        }
      }
    spawnAsteroid() {
      const size = 50 + Math.random() * 80;
      const speed = 2 + Math.random() * 2;
      const x = Math.random() * this.canvas.width;
      const y = -size;
      this.asteroids.push(new Asteroid(x, y, size, speed));
    }
  
    update() {
      // Update spaceship position based on tilt values
      this.spaceship.updatePosition(this.tiltX, this.tiltY);
      this.spawnCollectible(); // Spawn collectibles
      this.starfield.update(); // Update starfield
     // Update collectibles
     this.collectibles.forEach((collectible, index) => {
        collectible.update();
  
        // Check if astronaut is collected by the spaceship
        if (collectible.checkCollision(this.spaceship)) {
          this.score += 10; // Increase score when an astronaut is rescued
          this.collectibles.splice(index, 1); // Remove rescued astronaut
        } else if (collectible.isExpired()) {
          this.collectibles.splice(index, 1); // Remove expired collectible
        }
      });
      // Update and draw each asteroid, remove if off-screen
      this.asteroids.forEach((asteroid, index) => {
        asteroid.update();
        if (asteroid.isOffScreen()) {
          this.asteroids.splice(index, 1);
        }
      });
  
      // Check for collisions
      this.checkCollisions();
    }
  
    checkCollisions() {
      this.asteroids.forEach((asteroid, index) => {
        if (this.spaceship.checkCollision(asteroid)) {
          this.endGame();
          // callback

        }
      });
    }
  
    endGame() {
      this.isRunning = false;
            if (this.endGameCallback) {
                this.endGameCallback(this.score);
            }

    }
  
    draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      if (!this.isRunning) return;
      this.starfield.draw(); // Draw the starfield in the background

      // Draw spaceship and asteroids
      this.spaceship.draw(this.ctx);
      this.asteroids.forEach(asteroid => asteroid.draw(this.ctx));
      this.collectibles.forEach(collectible => collectible.draw(this.ctx));

      // Draw HUD
      this.drawHUD();
    }
  
    drawHUD() {
      this.ctx.font = "20px Arial";
      this.ctx.fillStyle = "#FFF";
      this.ctx.fillText(`Score: ${this.score}`, 20, 30);
      this.ctx.fillText(`Fuel: ${this.fuel}`, 20, 60);
      this.ctx.fillText(`Rescue Astronauts!`, 20, 90); // New message in HUD
    }
  
    gameLoop() {
     
        this.update();
        this.draw();
         if (this.isRunning) {
        // Spawn asteroids at intervals
        if (Math.random() < 0.02) this.spawnAsteroid();
        let highScore = localStorage.getItem("highScore") || 0;
        if (this.score > highScore)
        {
          localStorage.setItem("highScore", this.score);
        }

        requestAnimationFrame(() => this.gameLoop());
      }
    }
  }
  