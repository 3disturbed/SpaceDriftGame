const game = new Game();

let gameMode = "tilt"; // Default mode
let isGameStarted = false;
let isDragging = false; // Track whether mouse or touch is pressed for dragging

// Set up mode selection and start game
document.getElementById("tiltModeButton").addEventListener("click", () => setGameMode("tilt"));
document.getElementById("fingerModeButton").addEventListener("click", () => setGameMode("finger"));
document.getElementById("mouseModeButton").addEventListener("click", () => setGameMode("mouse"));


let highScore = localStorage.getItem("highScore") || 0;
document.getElementById("highScore").innerText = `High Score: ${highScore}`;


// Set the control mode
function setGameMode(mode) {
  gameMode = mode;

  // Remove all listeners and set up the correct mode
  removeAllListeners();
  
  if (mode === "tilt") {
    setupMotionListeners();
  } else if (mode === "finger") {
    setupTouchListeners();
  } else if (mode === "mouse") {
    setupMouseListeners();
  }
  startGame();

}

function startGame() {
    if (!isGameStarted) {
      isGameStarted = true;
      document.getElementById("tiltModeButton").style.display = "none";
      document.getElementById("fingerModeButton").style.display = "none";
      document.getElementById("mouseModeButton").style.display = "none";
      game.start(endGame);
    }
    
  }

function endGame(score) {
    isGameStarted = false;
    
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
    }
    
    document.getElementById("highScore").innerText = `High Score: ${highScore} Last Score ${game.score}`;
    document.getElementById("tiltModeButton").style.display = "block";
    document.getElementById("fingerModeButton").style.display = "block";
    document.getElementById("mouseModeButton").style.display = "block";


}

// Remove all listeners before setting a new mode
function removeAllListeners() {
  removeMotionListeners();
  removeMouseListeners();
  removeTouchListeners();
}

// Motion (Tilt) Listeners
function setupMotionListeners() {
  if ('ondeviceorientation' in window) {
    window.addEventListener('deviceorientation', handleOrientation);
  }
}

function removeMotionListeners() {
  window.removeEventListener('deviceorientation', handleOrientation);
}

// Mouse Listeners for Mouse Mode
function setupMouseListeners() {
  canvas.addEventListener('mousedown', startDragging);
  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mouseup', stopDragging);
}

function removeMouseListeners() {
  canvas.removeEventListener('mousedown', startDragging);
  canvas.removeEventListener('mousemove', handleMouseMove);
  canvas.removeEventListener('mouseup', stopDragging);
}

// Touch Listeners for Finger Mode
function setupTouchListeners() {
  canvas.addEventListener('touchstart', startDragging);
  canvas.addEventListener('touchmove', handleMouseMove);
  canvas.addEventListener('touchend', stopDragging);
}

function removeTouchListeners() {
  canvas.removeEventListener('touchstart', startDragging);
  canvas.removeEventListener('touchmove', handleMouseMove);
  canvas.removeEventListener('touchend', stopDragging);
}

// Handle dragging state for mouse or touch
function startDragging(event) {
  isDragging = true;
}

function stopDragging(event) {
  isDragging = false;
}

// Handle orientation changes for Tilt Mode
function handleOrientation(event) {
  if (gameMode === "tilt") {
    game.tiltX = event.gamma;
    game.tiltY = event.beta;
    game.tiltX = Math.min(20, Math.max(-20, tiltX));
    game.tiltY = Math.min(20, Math.max(-20, tiltY));
  }
}

// Handle movements for Finger and Mouse Modes
function handleMouseMove(event) {
  if (gameMode !== "tilt" && isDragging) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Map mouseX to gamma (tiltX) and mouseY to beta (tiltY) ranges
    game.tiltX = ((mouseX / (canvas.width / 2)) - 0.5) * 40; // Simulate gamma: -20 to 20
    game.tiltY = ((mouseY / (canvas.height / 2)) - 0.5) * 40; // Simulate beta: -20 to 20
  }
}
