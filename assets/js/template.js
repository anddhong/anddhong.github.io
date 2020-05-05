

// Load
$(window).on('load', function() {
    window.snakeGame = new SnakeGame();
}

/***************** Misc. ***************/
// Array.last
if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};