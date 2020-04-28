// Scrolling animation

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

  /* *********************************************************
  
  Key parts:
  Scrolling animations and boostrap
  (mostly) mobile responsive
  Pong
  pacSnake - Object Oriented Javascript + all divs
  JQuery
  
  To-do: 
  fix lecture slides, add one more project
  random map generation
  game notes
  Different color for what i'm up to now
  resume on right / image
  parallax scrolling
  all mobile responsive

  Ideas:
  no boxes, just top and bottom borders
  pacman map from name, constantly changing pacman map

  pacsnake 
    - snake can kill himself
    - ghosts multiply by eating pacman's tail
  
  *********************************************************** */