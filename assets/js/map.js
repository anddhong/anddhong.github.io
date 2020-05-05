class PacMap {
    constructor() {
        [this.rows, this.cols] = [11, 10]
        this.ac = $('#ac-3')
        this.width = this.ac.width()
        this.height = this.ac.height()
        this.id1;
        this.lines = [];
        this.spd=5
        this.buildMap();
        this.hr = (this.height/this.rows)/(this.width/this.cols)*1.1
        $('.v-line').css('transform','rotate(90deg) scale(' + this.hr + ')')
    }
    buildMap() {
        for (var r of range(0,this.rows-1)) {
            for (var c of range(0,this.cols-1)) {
                if (Math.random() < .3) {
                    var s = 'h-' +r+'-'+c;
                    this.lines.push(s)
                    var div = "<div id='" + s + "' class='h-line'></div>"
                }  else if (Math.random() < .4) {
                    var s = 'v-' +r+'-'+c;
                    var div = "<div id='" + s + "' class='v-line'></div>"
                }   else {
                    continue;
                }
                this.lines.push(s)
                $('#lines').append(div)
                $('#'+s).css({'top':r*this.height/this.rows,
                    'left':c*this.width/this.cols,
                    'width': this.width/this.cols,})
            }
        }
    }
    shuffle() {
        this.newLines = [];
        for (var [i,s] of this.lines.entries()) {
            if (Math.random()<.5) {
                this.newLines.push(s);
            }
        }
        window.pacGame.pacMap.id1 = setInterval(function() {window.pacGame.pacMap.detract()}, 50);
    }
    detract() {
        for (var s of this.newLines) {
            $('#'+s).width('-='+this.spd)
        }
        if ($('#'+s).width() <= 1) {
            clearInterval(this.id1)
            this.replaceId();
            this.id1 = setInterval(function() {window.pacGame.pacMap.expand()}, 30);
        }
    }
    replaceId() {
        for (var [i,s] of this.newLines.entries()) {
            if (s[0]=='h') {
                var newS = 'v'+s.substring(1)
                $('#'+s).prop('id',newS)
                $('#'+newS).removeClass('h-line')
                $('#'+newS).addClass('v-line')
            } else {
                var newS = 'h'+s.substring(1)
                $('#'+s).prop('id',newS)
                $('#'+newS).removeClass('v-line')
                $('#'+newS).addClass('h-line')
            }
            this.newLines[i] = newS
        }
        $('.h-line').css('transform','none')
        $('.v-line').css('transform','rotate(90deg) scale(' + this.hr + ')')
    }
    expand() {
        for (var s of this.newLines) {
            $('#'+s).width('+='+this.spd)
        }
        if ($('#'+s).width() >= this.width/this.cols) {
            clearInterval(this.id1)
            for (var s of this.newLines) {
                $('#'+s).width(this.width/this.cols)
            }
            var newLines = [];
            $("#lines").find("div").each(function(){ newLines.push(this.id); 30});
            this.lines = newLines;
        }
    }
}

class Pacman extends SnakeHead {
    constructor(pacmap) {
        super($('#pacman'))
        this.pacmap = pacmap
        var ratio = Math.min(pacmap.height/pacmap.rows, pacmap.width/pacmap.cols)/2*.7
        $('#pacman').css({'border-right': ratio + 'px solid transparent',
            'border-top': ratio + 'px solid yellow',
            'border-left': ratio + 'px solid yellow',
            'border-bottom': ratio + 'px solid yellow',
            'border-top-left-radius': ratio,
            'border-top-right-radius': ratio,
            'border-bottom-left-radius': ratio,
            'border-bottom-right-radius': ratio,}
          )
        this.ratio = ratio
        this.diam = parseInt(this.snakeElem.css('border-right').split('px ')[0])*2
        this.speed = 5
        this.x = 0
        this.y = 0
        this.snakeElem.css({'left': this.x, 'top': this.y})
    }
    eating(counter) {
        if (counter % 10 == 0) {
            for (var face of ['top','right','left','bottom']) {
                if (face != this.facing) {
                    this.snakeElem.css('border-' + face, this.ratio+'px solid yellow');
                }
            }
            if (!this.close) {
                this.snakeElem.css('border-' + this.facing, this.ratio+'px solid yellow');
            } else {
                this.snakeElem.css('border-' + this.facing, this.ratio+'px solid transparent');
            }
            this.close = !this.close;
        }
    }
    move(e) {
        super.move(e) 
        for (var s of this.pacmap.lines) {
            if (this.borderCollide(s)) {
                this.stepBack(e)
                break
            }
        }
    }
    borderCollide(s) {
        var obj = $('#'+s)
        if (s[0]=='v') {
            var objLeft = obj.position().left
            var objRight = objLeft+obj.height()
            var objTop = obj.position().top
            var objBot = objTop + obj.width()*this.pacmap.hr
            if (this.x < objRight && this.x + this.diam >= objLeft) {
                if (this.y < objBot && this.y + this.diam >= objTop) {
                    console.log(this.pacmap.hr)
                    return true;
                }
            }
            return false;
        } else {
            return this.collide(obj)
        }
    }
    stepBack(e) {
        if (e==37) {
            this.x += this.speed
        } else if (e==38) {
            this.y += this.speed
        } else if (e==39) {
            this.x -= this.speed
        } else if (e==40) {
            this.y -= this.speed
        }
    }
}

class PacGame {
    constructor() {
        this.pacMap = new PacMap();
        this.pacman = new Pacman(this.pacMap);
        this.id2;
        this.counter = 0;
    }
    animate(e) {
        this.counter += 1
        this.pacman.eating(this.counter);
        this.pacman.move(e);
    }
}

// Load
$(window).on('load', function() {
    window.pacGame = new PacGame();
    window.inPac = false;
    $(document).on('keydown', turn2)
})

  // Turn
  function turn2(event) {
    if ([37,38,39,40].includes(event.keyCode) &&
    window.inPac) {
        clearInterval(window.pacGame.id2)
        window.pacGame.id2 = setInterval(function() {window.pacGame.animate(event.keyCode)}, 30);
    }
  }


// Activate / Deactivate window
function activatePac(event) {
    window.inPac = true;
    window.pacGame.pacMap.shuffle()
  }
function deactivatePac(event) {
    window.inPac = false;
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