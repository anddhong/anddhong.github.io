class SnakeHead {
    constructor(snakeElem) {
        this.snakeElem = snakeElem
        this.x = snakeElem.position().left
        this.y = snakeElem.position().top
        this.speed = .7
        this.diam = parseInt(snakeElem.css('border-right').split('px ')[0])*1.5
        this.lag = 70
        this.lastPos = [];
        this.close = false;
        this.facing = 'right'
    }
    move(e) {
        var oldface = this.facing
        if (e == 37) {
            this.x -= this.speed
            this.facing='left'
        } else if (e == 38){
            this.y -= this.speed
            this.facing='top'
        } else if (e == 39) {
            this.x += this.speed
            this.facing='right'
        } else if (e == 40) {
            this.y += this.speed
            this.facing='bottom'
        }
        if (oldface != this.facing) {
            this.eating()
        }
        this.snakeElem.css({'left': this.x, 'top': this.y})
        this.updateLastPos();
    }
    updateLastPos() {
        this.lastPos.push([this.x, this.y])
        if (this.lastPos.length >= this.lag) {
            this.lastPos.shift()
        }
    }
    collide(obj) {
        var objLeft = obj.position().left
        var objRight = objLeft + obj.width() 
        var objTop = obj.position().top
        var objBot = objTop + obj.height()
        if (this.x < objRight && this.x + this.diam >= objLeft) {
            if (this.y < objBot && this.y + this.diam >= objTop) {
                return true;
            }
        }
    }
    eating() {
        for (var face of ['top','right','left','bottom']) {
            if (face != this.facing) {
                this.snakeElem.css('border-' + face, '20px solid yellow');
            }
        }
        if (!this.close) {
            this.snakeElem.css('border-' + this.facing, '20px solid yellow');
        } else {
            this.snakeElem.css('border-' + this.facing, '20px solid transparent');
        }
        this.close = !this.close;
    }
}

class SnakeBody extends SnakeHead {
    constructor(tail,head) {
        super(tail)
        this.tail = tail
        this.head = head
    }
    move(e) {
        this.x = this.head.lastPos[0][0]
        this.y = this.head.lastPos[0][1]
        this.tail.css({'left':this.x, 'top':this.y, 'background-color': 'white'})
        this.updateLastPos();
    }
}

class SnakeGame {
    constructor() {
        this.snakeElem = $("#pacsnake");
        this.snake = new SnakeHead(this.snakeElem);
        this.container = $("#ac-2")
        this.edible = $("#edible")
        this.id;
        this.spawn();
        this.body = [this.snake];
        this.counter = 0
    }
    animate(e) {
        this.counter += 1
        if (this.counter % 50 == 0) {
            this.snake.eating();
        }
        for (const obj of this.body) {
            obj.move(e)
        }
        if (this.snake.collide(this.edible)) {
            this.addToBody();
            this.spawn();
        }
    }
    addToBody() {
        this.container.append("<div class='snake-body' id='body-" + this.body.length + "'></div>")
        var tail = new SnakeBody($('#body-' + this.body.length), this.body.last())
        this.body.push(tail)
    }
    spawn() {
        var y = Math.random()*(this.container.height()-this.edible.height());
        var x = Math.random()*(this.container.width()-this.edible.width());
        this.edible.css({'left':x, 'top':y, 'background-color':'white'})
    }
  }
  
// Array.last
if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};

// Load
  $(window).on('load', function() {
    window.snakeGame = new SnakeGame();
    $(document).on('keydown', turn)
  });

  function turn(event) {
    // window.snakeGame.move(event.keyCode)
    clearInterval(window.snakeGame.id)
    window.snakeGame.id = setInterval(function() {window.snakeGame.animate(event.keyCode)}, 5);
  }

  /***************  Key Stuff   ****************/    
  window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
  }, false);