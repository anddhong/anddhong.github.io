// Inspired by w3 schools

$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    var target = $(this.hash);
    if (target.length) {
      $("html, body").animate(
        {
          scrollTop: target.offset().top
        },
        1000
      );
    }
  });
});



//*************************** Pong ***************************\\

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
  }
  move(pong) {
      this.xpos += this.xspeed
      this.ypos += this.yspeed
      this.ball.css({left:this.xpos,top:this.ypos});
      this.checkDeath(pong);
  }
  checkDeath(pong) {
    if (this.xpos<0) {
      pong.animation=false;
    }
  }
  checkCollision(pong) {
    // Container check
      if (this.ypos+this.diam>=pong.ac1.height() || this.ypos < 0) {
        this.yspeed = -this.yspeed
      }
      if (this.xpos+this.diam>=pong.ac1.width()) {
        this.xspeed = -this.xspeed
      }      
    // paddle check
      var right = pong.p1.position().left + pong.p1.width()
      var top = pong.p1.position().top
      var bot = pong.p1.position().top + pong.p1.height()
      if (right >= this.xpos) {
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
    this.ball = new bouncer($("#ball"));
    this.p1 = $("#player-1");
  }
  updateScore() {
    var scoreObj = $("#score")
    var scoreText = scoreObj.html().split(' ')
    var newText = scoreText[0] + ' ' + (parseInt(scoreText[1])+1).toString()
    scoreObj.html(newText);
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
      this.ball.move(this);
      this.ball.checkCollision(this);
    } else {
      $('#instruct').html('click to restart!')
      clearInterval(this.id)
    }
  }  
  joystick(event) {
    if (this.animation == true) {
      var p1 = this.p1;
      var bound = this.ac1.offset().top;
      var newTop = event.pageY - bound- this.p1.height()/2;
      if (newTop>=0 && newTop+p1.height() <= this.ac1.height()) {
        p1.css({top: newTop});
      }
    }
  }
}

window.onload = (event) => {
  window.pong = new Pong();
};


/* *********************************************************

Key parts:
mobile responsive
Pong
JQuery

To-do: 
Different color for what i'm up to now
resume on right
Invert project image (hover vs color 
parallax scrolling

*********************************************************** */