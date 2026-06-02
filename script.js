// Canvas setup
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Game objects
const paddleWidth = 10;
const paddleHeight = 80;
const ballSize = 8;

// Player paddle (left)
const playerPaddle = {
    x: 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0,
    speed: 6
};

// Computer paddle (right)
const computerPaddle = {
    x: canvas.width - paddleWidth - 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0,
    speed: 5
};

// Ball
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: ballSize,
    dx: 5,
    dy: 5,
    speed: 5
};

// Score
let playerScore = 0;
let computerScore = 0;

// Input handling
const keys = {};

window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Mouse tracking for paddle control
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    
    // Move paddle to mouse position
    playerPaddle.y = mouseY - paddleHeight / 2;
    
    // Keep paddle within bounds
    if (playerPaddle.y < 0) {
        playerPaddle.y = 0;
    }
    if (playerPaddle.y + paddleHeight > canvas.height) {
        playerPaddle.y = canvas.height - paddleHeight;
    }
});

// Update game state
function update() {
    // Player paddle - keyboard controls (alternative to mouse)
    if (keys['ArrowUp'] || keys['w'] || keys['W']) {
        playerPaddle.y -= playerPaddle.speed;
    }
    if (keys['ArrowDown'] || keys['s'] || keys['S']) {
        playerPaddle.y += playerPaddle.speed;
    }

    // Keep player paddle in bounds
    if (playerPaddle.y < 0) {
        playerPaddle.y = 0;
    }
    if (playerPaddle.y + playerPaddle.height > canvas.height) {
        playerPaddle.y = canvas.height - playerPaddle.height;
    }

    // Computer AI - follows the ball
    const computerCenter = computerPaddle.y + computerPaddle.height / 2;
    if (computerCenter < ball.y - 35) {
        computerPaddle.y += computerPaddle.speed;
    } else if (computerCenter > ball.y + 35) {
        computerPaddle.y -= computerPaddle.speed;
    }

    // Keep computer paddle in bounds
    if (computerPaddle.y < 0) {
        computerPaddle.y = 0;
    }
    if (computerPaddle.y + computerPaddle.height > canvas.height) {
        computerPaddle.y = canvas.height - computerPaddle.height;
    }

    // Ball movement
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Ball collision with top and bottom walls
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.dy = -ball.dy;
        ball.y = ball.y - ball.radius < 0 ? ball.radius : canvas.height - ball.radius;
    }

    // Ball collision with player paddle
    if (
        ball.x - ball.radius < playerPaddle.x + playerPaddle.width &&
        ball.y > playerPaddle.y &&
        ball.y < playerPaddle.y + playerPaddle.height
    ) {
        if (ball.dx < 0) {
            ball.dx = -ball.dx;
            ball.x = playerPaddle.x + playerPaddle.width + ball.radius;

            // Add spin based on where ball hits paddle
            const hitPos = (ball.y - (playerPaddle.y + playerPaddle.height / 2)) / (playerPaddle.height / 2);
            ball.dy += hitPos * 3;

            // Increase ball speed slightly
            ball.speed += 0.5;
            ball.dx = Math.abs(ball.dx) * (ball.speed / 5);
        }
    }

    // Ball collision with computer paddle
    if (
        ball.x + ball.radius > computerPaddle.x &&
        ball.y > computerPaddle.y &&
        ball.y < computerPaddle.y + computerPaddle.height
    ) {
        if (ball.dx > 0) {
            ball.dx = -ball.dx;
            ball.x = computerPaddle.x - ball.radius;

            // Add spin based on where ball hits paddle
            const hitPos = (ball.y - (computerPaddle.y + computerPaddle.height / 2)) / (computerPaddle.height / 2);
            ball.dy += hitPos * 3;

            // Increase ball speed slightly
            ball.speed += 0.5;
            ball.dx = -Math.abs(ball.dx) * (ball.speed / 5);
        }
    }

    // Ball out of bounds - scoring
    if (ball.x - ball.radius < 0) {
        computerScore++;
        resetBall();
    }
    if (ball.x + ball.radius > canvas.width) {
        playerScore++;
        resetBall();
    }

    // Update score display
    document.getElementById('playerScore').textContent = playerScore;
    document.getElementById('computerScore').textContent = computerScore;
}

// Reset ball to center
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speed = 5;
    const angle = (Math.random() - 0.5) * Math.PI / 4;
    ball.dx = Math.cos(angle) * ball.speed * (Math.random() > 0.5 ? 1 : -1);
    ball.dy = Math.sin(angle) * ball.speed;
}

// Draw functions
function drawPaddle(paddle) {
    ctx.fillStyle = '#00d4ff';
    ctx.shadowColor = 'rgba(0, 212, 255, 0.8)';
    ctx.shadowBlur = 10;
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.shadowColor = 'transparent';
}

function drawBall() {
    ctx.fillStyle = '#ffd700';
    ctx.shadowColor = 'rgba(255, 215, 0, 0.8)';
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowColor = 'transparent';
}

function drawCenterLine() {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.setLineDash([10, 10]);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);
}

// Main game loop
function gameLoop() {
    // Clear canvas
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw elements
    drawCenterLine();
    drawPaddle(playerPaddle);
    drawPaddle(computerPaddle);
    drawBall();

    // Update game state
    update();

    // Continue loop
    requestAnimationFrame(gameLoop);
}

// Start game
gameLoop();