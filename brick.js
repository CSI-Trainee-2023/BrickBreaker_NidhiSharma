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
//Create variables to take score
let score = 0;

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


document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);