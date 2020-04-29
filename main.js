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
  animate gate swings
  fix lecture slides, add one more project
  game notes
  Different color for what i'm up to now
  resume on right / image


  Ideas:
  Pacsnake can escape box
  playing with fire 
  space bar to change map when playing
  user can change dimensions, sparseness...


  pacsnake 
    - organize when recenter, put more,
    - ghosts multiply by eating pacman's tail
  
  *********************************************************** */