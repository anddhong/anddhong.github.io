
class PacMap {
    constructor() {
        [this.rows, this.cols] = [12, 12]
        this.ac = $('#ac-3')
        console.log(this.rows, this.ac)
        this.width = this.ac.width()
        this.height = this.ac.height()
        this.id1;
        this.lines = [];
        this.buildMap();
    }
    buildMap() {
        for (var r of range(0,this.rows-1)) {
            for (var c of range(0,this.cols-1)) {
                if (Math.random() < .4) {
                    var s = 'h-' +r+'-'+c;
                    this.lines.push(s)
                    var div = "<div id='" + s + "' class='h-line'></div>"
                }  else if (Math.random() < .5) {
                    var s = 'v-' +r+'-'+c;
                    var div = "<div id='" + s + "' class='v-line'></div>"
                }   else {
                    continue;
                }
                this.lines.push(s)
                this.ac.append(div)
                $('#'+s).css({'top':r*this.height/this.rows,
                    'left':c*this.width/this.cols,
                    'width': this.width/this.cols,})
            }
        }
    }
    shuffle() {
        this.newLines = [];
        for (var [i,s] of this.lines.entries()) {
            if (Math.random()<.3) {
                this.newLines.push(s);
                if (s[0]=='h') {
                    var newS = 'v' + s.substring(1)
                } else {
                    var newS = 'h'+ s.substring(1)
                }
                this.lines[i] = newS;
            }
        }
        window.pacMap.id1 = setInterval(function() {window.pacMap.detract()}, 10);
    }
    detract() {
        for (var s of this.newLines) {
            $('#'+s).width('-=2')
        }
        console.log(s, $('#'+s), $('#'+s).width())
        if ($('#'+s).width() <= 1) {
            clearInterval(this.id1)
            console.log('b')
            this.replaceId();
            window.pacMap.id1 = setInterval(function() {window.pacMap.expand()}, 10);
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
    }
    expand() {
        for (var s of this.newLines) {
            $('#'+s).width('+=2')
        }
        if ($('#'+s).width() >= this.width/this.cols) {
            clearInterval(this.id1)
            for (var s of this.newLines) {
                $('#'+s).width(this.width/this.cols)
            }
        }
    }
}

// Load
$(window).on('load', function() {
    window.pacMap = new PacMap();
    window.inPac = false;
})

function activatePac(event) {
    window.inPac = true;
    window.pacMap.shuffle()
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