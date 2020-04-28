
class PacmanGame {
    constructor() {
        [this.rows, this.cols] = [10, 10]
        [this.width, this.height] = [$('#ac-3').width(), $('#ac-3').width()]
    }
}

// Load
$(window).on('load', function() {
    window.pacmanGame = new PacGame();
})

/***************** Misc. ***************/
// Array.last
if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};