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



// Screen Saver
var animation = false;
var id;
var xpos = 0;
var ypos = 0;
var yspeed = 1
var xspeed = 1

function myMove() {
  if (animation) {
    clearInterval(id);
    animation=false;
  } else {
    animation = true;
    id = setInterval(frame, 5);
    var elem = document.getElementById("animate");   
    function frame() {
      if (ypos+50>=400) {
        yspeed = -yspeed
      }
      if (ypos < 0) {
        yspeed = -yspeed
      }
      if (xpos+50>=600) {
        xspeed = -xspeed
      }
      if (xpos < 0) {
        xspeed = -xspeed
      }
      xpos += xspeed
      ypos += yspeed
      elem.style.top = ypos + "px"; 
      elem.style.left = xpos + "px"; 
      }
    }
  }
