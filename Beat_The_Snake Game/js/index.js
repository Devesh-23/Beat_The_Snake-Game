let inputdir = { x: 0, y: 0 };
const foodsound = new Audio("../Xfiles/music/food.mp3");
const gameoversound = new Audio("../Xfiles/music/gameover.mp3");
const movesound = new Audio("../Xfiles/music/move.mp3");
let speed = 5;
let lastPaintTime = 0;
let score = 0;
let snakeArr = [{ x: 13, y: 15 }];

food = { x: 6, y: 7 };

//Game Functions
function main(Ctime) {
  window.requestAnimationFrame(main);
  if ((Ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = Ctime;
  gameEngine();
}

function iscollide(snake) {
  //bite itself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }

  //bump into wall
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }

  return false;
}

function gameEngine() {
  //1. updating food and snake
  if (iscollide(snakeArr)) {
    gameoversound.play();
    inputdir = { x: 0, y: 0 };
    alert(" Game over press any key to play again! ");
    snakeArr = [{ x: 13, y: 15 }];
    score = 0;
    scoreBox.innerHTML = "Score: " + score;
  }

 
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodsound.play();
    score += 10;

    //increase the speed with score
    let i=1;
    if(score > i*100){
      speed +=2;
      i +=1;
    }


    //highscore is updated
    if (score > highscoreval) {
      highscoreval = score;
      localStorage.setItem("highscore", JSON.stringify(highscoreval));
      highscoreBox.innerHTML = "HighScore: " + highscoreval;
    }

    //score is incresed 
    scoreBox.innerHTML = "Score: " + score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputdir.x,
      y: snakeArr[0].y + inputdir.y,
    });

    //food is regenrated
    let a = 2;
    let b = 16;
    food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
  }

  //moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] }; //created a new object so that all does not reffer to the same point
  }
  snakeArr[0].x += inputdir.x;
  snakeArr[0].y += inputdir.y;

  //2. diplay snake and food
  //Display the snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  //Display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//Game Main Logic
let highscore = localStorage.getItem("highscore");
if (highscore === null) {
  highscoreval = 0;
  localStorage.setItem("highscore", JSON.stringify(highscoreval));
} else {
  highscoreval = JSON.parse(highscore);
  highscoreBox.innerHTML = "HighScore: " + highscore;
}

window.requestAnimationFrame(main);
window.addEventListener("keydown", e => {
  //if any key is pressed
  inputdir = { x: 0, y: 1 }; //start game
  movesound.play();
  switch (e.key) {
    case "ArrowUp":
      // console.log("up")
      inputdir.x = 0;
      inputdir.y = -1;
      break;
    case "ArrowDown":
      // console.log("down")
      inputdir.x = 0;
      inputdir.y = 1;
      break;
    case "ArrowLeft":
      // console.log("left")
      inputdir.x = -1;
      inputdir.y = 0;
      break;
    case "ArrowRight":
      // console.log("right")
      inputdir.x = 1;
      inputdir.y = 0;
      break;
  }
});
