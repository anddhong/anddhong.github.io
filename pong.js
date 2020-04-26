class bouncer {
    constructor(ball) {
      this.ball = ball
      this.diam = ball.width()
      this.xpos = this.ball.position().left
      this.ypos = this.ball.position().top
      this.xspeed = this.yspeed = 2
    }
    recenter(pong) {
      this.xpos = pong.ac1.width()/2;
      this.ypos = pong.ac1.height()/2
      this.xspeed = this.yspeed = 2
      pong.ballElem.css({"background-color": "white"});
    }
    move() {
        this.xpos += this.xspeed
        this.ypos += this.yspeed
        this.ball.css({left:this.xpos,top:this.ypos});
    }
    checkDeath(pong) {
      if (this.xpos<0) {
        pong.animation=false;
        pong.ballElem.css({"background-color": "black"});
      }
    }
    checkCollision(pong) {
      // Container check
        if (this.ypos+this.diam>=pong.ac1.height() || this.ypos < 0) {
          this.yspeed = -this.yspeed
        }
        if (this.xpos+this.diam>=pong.ac1.width()*.97) {
          this.xspeed = -this.xspeed
          this.xspeed = (Math.abs(this.xspeed) + .3) * -1
        }      
      // paddle check
        var right = pong.p1.position().left + pong.p1.width()
        var top = pong.p1.position().top
        var bot = pong.p1.position().top + pong.p1.height()
        if (this.xspeed<0 && right >= this.xpos) {
          if (this.ypos + this.diam >= top && this.ypos <= bot) {
            this.xspeed = Math.abs(this.xspeed) + .3
            pong.updateScore();
            this.yspeed += .3 * (this.yspeed / Math.abs(this.yspeed))
          }
        }
    }
  }
  
  class Pong {
    constructor() {
      this.animation = false;
      this.id;
      this.ac1 = $("#ac-1")
      this.ballElem = $("#ball");
      this.ball = new bouncer(this.ballElem);
      this.p1 = $("#player-1");
      this.p2 = $("#player-2");
    }
    updateScore() {
      var scoreText = $("#score").html().split(' ')
      var newText = scoreText[0] + ' ' + (parseInt(scoreText[1])+1).toString()
      $("#score").html(newText);
    }
    play() {
      if (!this.animation) {
        this.animation = true;
        this.ball.recenter(this);
        $("#score").html('score: 0')
        $('#instruct').html('')
        this.id = setInterval(function() {window.pong.timerFired()}, 5);
      }
    }
    timerFired() {
      if (this.animation) {
        this.p2move();
        this.ball.move();
        this.ball.checkDeath(this);
        this.ball.checkCollision(this);
      } else {
        $('#instruct').html('click to restart!')
        clearInterval(this.id)
      }
    }  
    joystick(event) {
        var bound = this.ac1.offset().top;
        var newTop = event.pageY - bound- this.p1.height()/2;
        if (newTop>=0 && newTop+this.p1.height() <= this.ac1.height()) {
          this.p1.css({top: newTop});
        }
    }
    p2move() {
        var newTop = this.ball.ypos
        if (newTop>=0 && newTop+this.p2.height() <= this.ac1.height()) {
            this.p2.css({top: this.ball.ypos});
        }
    }
  }
  
  $(window).on('load', function() {
    window.pong = new Pong();
  });