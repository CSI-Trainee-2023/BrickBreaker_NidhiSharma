let canvas = document.getElementById('mycanvas');
let ctx = canvas.getContext('2d');
let ballRadius = 10;
let x = canvas.width/2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
//create the paddle
let paddleHeight = 12;
let paddleWidth = 130;
//specify starting point of paddle
let paddleX = (canvas.width-paddleWidth)/2;
//holding variables for right and left arrows on keyboard
let rightPressed=false;
let leftPressed=false;
//holding variables for bricks
let brickRowCount = 4;
let brickColumnCount = 7;
let brickWidth = 72;
let brickHeight = 24;
let brickPadding = 12;
let brickOffsetTop = 32;
let brickOffsetLeft = 32;
let gameActive = false;
let level = 1;
//Create variables to take score
let score = 0;
let  maxScore = 0;
let audio = document.getElementById('myAudio');


// function to play the audio
function playAudio(){
    audio.play();
}
//Creating arrays for the bricks
let bricks = [];
let count = [];
for (c =0; c<brickColumnCount; c++){
    bricks[c] = [];
    count[c] = [];
    for(r=0; r<brickRowCount; r++){
        //set the x and y position of the bricks
        bricks[c][r] = { x: 0, y: 0, status: 1};
        count[c][r] = 4-r;
    }
}

let gameOver = false;

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

//Anchor paddle movement to mouse movement
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

function keyDownHandler(e){
    if(e.keyCode === 39){
        rightPressed = true;
    }
    else if (e.keyCode === 37){
        leftPressed = true;
    }
}
function keyUpHandler(e){
    if(e.keyCode === 39){
        rightPressed = false;
    }
    else if (e.keyCode === 37){
        leftPressed = false;
    }
    else if (e.keyCode === 116) { // 116 is the key code for F5
        if(gameOver){
            document.location.reload();
        }
    }
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(x,y,ballRadius,0,Math.PI*2); 
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight); 
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
}

function drawBricks(){
    for(c=0; c < brickColumnCount; c++){
        for(r=0; r < brickRowCount; r++){
            if(bricks[c][r].status === 1){
                let brickX = (c* (brickWidth + brickPadding)) + brickOffsetLeft;
                let brickY = (r* (brickHeight+brickPadding)) + brickOffsetTop;
                bricks[c][r].x=brickX;
                bricks[c][r].y=brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                brickcolor(r);
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function brickcolor(x){
    if(x===0){
        ctx.fillStyle = '#6600cc';
    }
    if(x===1){
        ctx.fillStyle = 'green';
    }
    if(x===2){
        ctx.fillStyle = 'pink';
    }
    if(x===3){
        ctx.fillStyle = 'orange';
    }
    
}

function drawScore(){
    ctx.font = '18px Arial';
    ctx.fillStyle = 'brown';
    ctx.fillText('score: '+ score, 8, 20);
    ctx.fillText('maxScore: '+score,100,20); 
    ctx.fillText('Level:' +level, 250,20);
    if (score > maxScore) {
        maxScore = score;
        localStorage.setItem('maxScore', maxScore);
    }
}

//Collision dections for the bricks
function collisionDetection(){
    for(c=0; c<brickColumnCount;c++){
        for(r=0; r<brickRowCount; r++){
            let b = bricks[c][r];
            if(b.status === 1){
                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){
                    dy = -dy;
                    count[c][r] = count[c][r]-1;
                    b.fillStyle='red';

                    if(count[c][r]===0){
                        b.status = 0;
                        score++;
                        playAudio();
                    }

                    if(score >= 14){
                        dy = -4;
                    }

                    if (score >= 10){
                        dx = 3;
                        paddleWidth = 72;
                        drawPaddle();
                    }

                    if (score === brickRowCount*brickColumnCount){
                        gameOver = true;
                    }
                }
            }
        }
    }
}

function drawGameOverScreen() {
    ctx.font = '48px Arial';
    ctx.fillStyle = 'red';
    ctx.fillText('Game Over', canvas.width/2 - 100, canvas.height/2);
    ctx.font = '24px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('Press F5 to restart', canvas.width/2 - 80, canvas.height/2 + 50);
    playAudio();
}

function draw(){
    //clear each instance of the canvas so a new circle can be drawn
    ctx.clearRect(0,0,canvas.width, canvas.height);
    drawScore();
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();

    if(score>=14) {
        level++; //increase the level
        //reset the score
        score = 0;

    }

    // update the level display
    levelDisplay.textContent = 'Level:' +  level;

    if (!gameActive) return; // If game is not active, do nothing

    if(gameOver){
        drawGameOverScreen();
        return;
    }
    //Calculate collision detections
    //left and right walls
    if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
        console.log("Side wall")
    }
    //top walls
    if(y + dy < ballRadius){
        dy = -dy;
     console.log("Top wall")
    }
    else if (y + dy > canvas.height-ballRadius){
        //detect paddle hits
        if(x > paddleX && x < paddleX + paddleWidth){
            dy=-dy;
            console.log("Paddle hit")
            
        }
        //if no paddle hit, body of canvas is hit ==> game over
        else {
           gameOver = true;
         }
    }
    //bottom wall
    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius){
        dy = -dy;
    }
    //Make paddle move
    if(rightPressed && paddleX <canvas.width-paddleWidth){
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0){
        paddleX -= 7;
    }
    //Making the ball move
    x +=dx; //update x movement every frame
    y +=dy; //update y movement every frame
}

document.addEventListener('keydown', (e) => {
    if (e.keyCode === 32) { // 32 is the key code for spacebar
        if (!gameActive) {
            gameActive = true; // Start the game
        }
    }
});


//Create an infinite loop that creates the ball
//paints the ball on the canvas every 10 milliseconds.
setInterval(draw, 10) 





