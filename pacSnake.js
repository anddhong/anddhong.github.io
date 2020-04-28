class SnakeHead {
    constructor(snakeElem) {
        this.snakeElem = snakeElem
        this.x = snakeElem.position().left
        this.y = snakeElem.position().top
        this.speed = .7
        this.diam = parseInt(snakeElem.css('border-right').split('px ')[0])*2
        this.lag = 80
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
            this.eating(0)
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
    eating(counter) {
        if (counter % 50 == 0) {
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
    hitSelf(body) {
        for (var [i,part] of body.entries()){
            if (i==0) {continue; }
            var px = (part.x+part.diam/2)
            var py = (part.y+part.diam/2)
            if (this.x < px+this.speed && this.x + this.diam >= px) {
                if (this.y < py+this.speed && this.y + this.diam >= py) {
                    return true;
                }
            }
        }
        return false;
    }
    hitWall() {
        var ac = $("#ac-2")
        var offset = 5;
        if (this.x <= -1*offset || this.x + this.diam >= ac.width()+offset) {
            return true;
        } else if (this.y <= -1*offset || this.y + this.diam>= ac.height()+offset) {
            return true;
        }
        return false;
    }
}

class SnakeBody extends SnakeHead {
    constructor(tail,head) {
        super(tail)
        this.tail = tail
        this.head = head
        this.diam = tail.width()
    }
    move(e) {
        this.x = this.head.lastPos[0][0]
        this.y = this.head.lastPos[0][1]
        this.tail.css({'left':this.x+6, 'top':this.y+6, 'background-color': 'white'})
        this.updateLastPos();
    }
}

class Ghost {
    constructor(obj) {
        this.ghostElem = obj;
        this.y = obj.position().top
        this.x = obj.position().left
        this.speed = .1
    }
    move(pacSnake) {
        if (this.x < pacSnake.x) {
            this.x += this.speed
        } else {
            this.x -= this.speed
        } if (this.y < pacSnake.y) {
            this.y += this.speed
        } else {
            this.y -= this.speed
        }
        this.ghostElem.css({'top':this.y, 'left':this.x})
    }
}

class SnakeGame {
    constructor() {
        this.construct();
    }
    construct() {
        this.snake = new SnakeHead($("#pacsnake"));
        this.container = $("#ac-2")
        this.edible = $("#edible")
        this.ghost = new Ghost($("#ghost"))

        this.id;
        this.spawn();
        this.body = [this.snake];
        this.counter = 0
        this.death = false;
    }
    animate(e) {
        // restart
        if (this.death) {
            this.recenter()
            this.death = false;
        }
        // eating
        this.counter += 1
        this.snake.eating(this.counter);

        // snake moving
        for (const obj of this.body) {
            obj.move(e)
        }
        //ghost moving
        this.ghost.move(this.snake);

        //collision checks
        if (this.snake.collide(this.edible)) {
            this.addToBody();
            this.spawn();
            this.updateScore();
        }
        if (this.snake.collide($("#ghost")) ||
            this.snake.hitWall() || 
            this.snake.hitSelf(this.body)) {
            this.deathAnimation()
        }

    }
    recenter() {
        $("#ac-2").empty()
        $("#ac-2").append('<div id="edible"></div>\
        <div id="pacsnake"></div>\
        <div class="ghost pinky" id="ghost">\
          <div class="eyes">\
            <div class="eye leftEye"><div class="iris"></div></div>\
            <div class="eye rightEye"><div class="iris"></div></div>\
          </div>\
          <div class="ghostTail"></div>\
        </div>\
        <p id="instruct-2" class="instruct">Press any arrow key to play!</p>\
        <p id="score-2" class="score">Score: 0</p>')
        this.construct();
    }
    updateScore() {
        var scoreText = $("#score-2").html().split(' ')
        var newText = scoreText[0] + ' ' + (parseInt(scoreText[1])+1).toString()
        $("#score-2").html(newText);
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
    deathAnimation() {
        clearInterval(this.id)
        this.death = true;
        for (var [i,part] of this.body.entries()) {
            var elem = "<div class='wipe' id='wipe-" + i + "'></div>"
            this.container.append(elem)
            $("#wipe-"+i).css({'top':part.y,'left':part.x, 'width':this.snake.diam})
        }
        this.id = setInterval(function() {window.snakeGame.wipe()}, 10);
    }
    wipe() {
        for (var [i,part] of this.body.entries()) {
            $("#wipe-"+i).css({'height':'+=1'})
        }
        if ($('#wipe-0').height()>=this.snake.diam) {
            clearInterval(this.id)
        }
    }
  }
  


// Load
  $(window).on('load', function() {
    window.snakeGame = new SnakeGame();
    $(document).on('keydown', turn)
    window.inSnake = false;
  });

  function turn(event) {
    if ([37,38,39,40].includes(event.keyCode) &&
    window.inSnake) {
        clearInterval(window.snakeGame.id)
        window.snakeGame.id = setInterval(function() {window.snakeGame.animate(event.keyCode)}, 5);
    }
  }
  function activateSnake(event) {
    window.inSnake = true;
  }
  function deactivateSnake(event) {
    window.inSnake = false;
}


  /***************  Key Stuff   ****************/    
  window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
  }, false);

  // Array.last
if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};