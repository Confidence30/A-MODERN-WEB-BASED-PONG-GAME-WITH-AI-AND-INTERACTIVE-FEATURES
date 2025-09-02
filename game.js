// Initialize canvas and context
const canvas = document.getElementById('gameCanvas');
if (!canvas) console.error('Canvas element not found');
canvas.width = 800;
canvas.height = 400;
const ctx = canvas.getContext('2d');
//console.log('Canvas initialized:', canvas.width, 'x', canvas.height');

// Game objects
const playerPaddle = {
    x: 10,
    y: 150,
    width: 20,
    height: 100,
    speed: 5
};
const aiPaddle = {
    x: canvas.width - 30, 
    y: canvas.height / 2 - 50,
    width: 20,
    height: 100,
    speed: 2 // Default, will be set by difficulty selection
};
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speedX: 5,
    speedY: 5,
};

// Score tracking
let highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0;
const scoreElement = document.getElementById('scoreValue');
scoreElement.textContent = highScore;
let playerScore = 0;
let aiScore = 0;
let gameStarted = false;
let paused = false;

// Difficulty menu setup
const difficultyMenu = document.getElementById('difficultyMenu');
const difficultyButtons = document.querySelectorAll('.difficulty-btn');
difficultyButtons.forEach(button => {
    button.addEventListener('click', () => {
        aiPaddle.speed = parseInt(button.dataset.speed);
        difficultyMenu.style.display = 'none';
        gameStarted = true;
        paused = false; // Ensure game starts unpaused
        gameLoop(); // Start game loop after difficulty selection
        console.log(`Difficulty set to ${button.textContent}, speed: ${aiPaddle.speed}`);
    });
});

// Pause/Play button and key control
const pausePlayBtn = document.getElementById('pausePlayBtn');
pausePlayBtn.addEventListener('click', togglePause);
document.addEventListener('keydown', (e) => {
    if (gameStarted && e.key === ' ') togglePause(); // Spacebar to pause/play
});

function togglePause() {
    paused = !paused;
    pausePlayBtn.textContent = paused ? 'Play' : 'Pause';
    console.log(`Game ${paused ? 'paused' : 'resumed'}`);
}

// Player controls
document.addEventListener('keydown', (e) => {
    if (gameStarted && !paused) {
        if (e.key === 'ArrowUp' && playerPaddle.y > 0) {
            playerPaddle.y -= playerPaddle.speed;
            console.log('Player paddle moved up');
        }
        if (e.key === 'ArrowDown' && playerPaddle.y < canvas.height - playerPaddle.height) {
            playerPaddle.y += playerPaddle.speed;
            console.log('Player paddle moved down');
        }
    }
});

// Game loop
function gameLoop() {
    if (gameStarted && !paused) {
        update();
        draw();
    }
    requestAnimationFrame(gameLoop);
}

// Update game state
function update() {
    if (gameStarted && !paused) {
        // Move ball
        ball.x += ball.speedX;
        ball.y += ball.speedY;

        // Ball collision with top/bottom
        if (ball.y <= 0 || ball.y >= canvas.height) {
            ball.speedY = -ball.speedY;
        }

        // Ball collision with paddles
        if (
            (ball.x <= playerPaddle.x + playerPaddle.width && 
             ball.y >= playerPaddle.y && ball.y <= playerPaddle.y + playerPaddle.height) ||
            (ball.x >= aiPaddle.x - ball.radius && 
             ball.y >= aiPaddle.y && ball.y <= aiPaddle.y + aiPaddle.height)
        ) {
            ball.speedX = -ball.speedX;
        }

        // Scoring
        if (ball.x <= 0) {
            aiScore++;
            resetBall();
        } else if (ball.x >= canvas.width) {
            playerScore++;
            if (playerScore + aiScore > highScore) {
                highScore = playerScore + aiScore;
                localStorage.setItem('highScore', highScore);
                scoreElement.textContent = highScore;
                console.log('New high score:', highScore);
            }
            resetBall();
        }

        // AI paddle movement
        if (aiPaddle.y + aiPaddle.height / 2 < ball.y) {
            aiPaddle.y += aiPaddle.speed;
        } else if (aiPaddle.y + aiPaddle.height / 2 > ball.y) {
            aiPaddle.y -= aiPaddle.speed;
        }
        aiPaddle.y = Math.max(0, Math.min(canvas.height - aiPaddle.height, aiPaddle.y));
    }
}

// Reset ball to center
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speedX = -ball.speedX; // Reverse direction
    ball.speedY = Math.random() * 10 - 5; // Random vertical bounce
}

// Draw game with visual polish
function draw() {
    // Clear canvas with gradient
    const grd = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grd.addColorStop(0, '#111');
    grd.addColorStop(0.5, '#333');
    grd.addColorStop(1, '#111');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw paddles with neon glow
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#0ff';
    ctx.fillStyle = '#0ff';
    ctx.fillRect(playerPaddle.x, playerPaddle.y, playerPaddle.width, playerPaddle.height);
    ctx.fillStyle = '#0ff';
    ctx.fillRect(aiPaddle.x, aiPaddle.y, aiPaddle.width, aiPaddle.height);

    // Draw ball with neon glow
    ctx.shadowColor = '#f0f';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#f0f';
    ctx.fill();
    ctx.shadowBlur = 0; // Reset shadow

    // Draw scores
    ctx.font = '30px Orbitron';
    ctx.fillStyle = '#0ff';
    ctx.textShadow = '0 0 5px #0ff';
    ctx.fillText(`Player: ${playerScore}`, 50, 50);
    ctx.fillText(`AI: ${aiScore}`, canvas.width - 150, 50);
    scoreElement.textContent = highScore; // Update high score in div
}

// Show difficulty menu on load (game starts only after selection)
difficultyMenu.style.display = 'block';