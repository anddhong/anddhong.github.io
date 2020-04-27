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
  *fitting 2 games in the window
  
  To-do: 
  random map generation
  game notes
  fix animation containers
  Different color for what i'm up to now
  resume on right
  Invert project image (hover vs color)
  parallax scrolling
  all mobile responsive

  Ideas:
  no boxes, just top and bottom borders
  pacman map from name

  pacsnake 
    - snake can kill himself
    - ghosts multiply by eating pacman's tail
  
  *********************************************************** */