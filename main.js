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
  (mostly) mobile responsive
  Pong
  pacSnake - Object Oriented Javascript
  JQuery
  fitting 2 games in the window
  
  To-do: 
  pacSnake
  fix animation containers
  Different color for what i'm up to now
  resume on right
  Invert project image (hover vs color)
  game notes
  parallax scrolling
  all mobile responsive

  Ideas:
  ghosts will chase after pacman if he leaves the box 
  no boxes, just top and bottom borders

  pacsnake - snake but there are ghosts who can become more 
    ghosts just like pacman.
    - ghosts multiply by eating pacman's tail
  
  *********************************************************** */