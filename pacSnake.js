class Snake {
    constructor(snakeElem) {
        this.snakeElem = snakeElem
        this.x = snakeElem.position().left
        this.y = snakeElem.position().top
        this.speed = .5
    }
    move(e) {
        if (e == 37) {
            this.x -= this.speed
        } if (e == 38){
            this.y -= this.speed
        } if (e == 39) {
            this.x += this.speed
        } if (e == 40) {
            this.y += this.speed
        }
        this.snakeElem.css({'left': this.x, 'top': this.y})
    }
}

class SnakeGame {
    constructor() {
        this.snakeElem = $("#pacsnake");
        this.snake = new Snake(this.snakeElem);
        this.id;
    }    
    play(e) {
        clearInterval(this.id)
        this.id = setInterval(function() {window.snakeGame.snake.move(e)}, 5);
    }
  }
  


  $(window).on('load', function() {
    window.snakeGame = new SnakeGame();
    $(document).on('keydown', turn)
  });

  function turn(event) {
    window.snakeGame.play(event.keyCode)
  }

  /***************  Key Stuff   ****************/    
  window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
  }, false);
