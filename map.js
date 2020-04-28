
class PacmanGame {
    constructor() {
        [this.rows, this.cols] = [10, 10]
        this.ac = $('#ac-3')
        console.log(this.rows, this.ac)
        this.width = this.ac.width()
        this.height = this.ac.height()
        this.buildMap();
    }
    buildMap() {
        var elem1;
        var elem2;
        for (var r of range(0,this.rows-1)) {
            for (var c of range(0,this.cols-1)) {
                if (Math.random() < .4) {
                    var h = 'h-' +r+'-'+c;
                    var div1 = "<div id='" + h + "' class='h-line'></div>"
                    this.ac.append(div1)
                    $('#'+h).css({'top':r*this.height/this.rows,
                        'left':c*this.width/this.cols,
                        'width':this.width/this.cols})
                }  else if (Math.random() < .5) {
                    var v = 'v-' +r+'-'+c;
                    var div2 = "<div id='" + v + "' class='v-line'></div>"
                    this.ac.append(div2)    
                    $('#'+v).css({'top':r*this.height/this.rows,
                        'left':c*this.width/this.cols,
                        'height':this.height/this.rows})
                }
    
            }
        }
    }
}

// Load
$(window).on('load', function() {
    window.pacmanGame = new PacmanGame();
    window.inSnake = false;
})

function activatePac(event) {
    window.inSnake = true;
  }
  function deactivatePac(event) {
    window.inSnake = false;
}

/***************** Misc. ***************/
// Array.last
if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};
var range = (x,y) => Array.from((function*(){
    while (x <= y) yield x++;
  })());