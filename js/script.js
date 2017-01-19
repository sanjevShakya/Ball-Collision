;(function() {
	var BOX_LIMIT = 10;
	var BOX_X = 50
	var BOX_Y = 50;
	var RADIUS = 25;
	var CANVAS_HEIGHT = 500;
	var CANVAS_WIDTH = 900;
	var DIRECTION = 2;
	var TIME_LOOP = 50;
	var OFFSET = 100;
	var score =0;
	var DIAMETER = 50;
	function Box() {
		var that = this;
		this.x = 0;
		this.y = 0;
		this.centerX = 0;
		this.centerY = 0;
		this.score = 0;
		this.element;
		this.dx = getRandom(0,200) > 100 ? DIRECTION : -DIRECTION;
		this.dy = getRandom(0,200) > 100 ? DIRECTION : -DIRECTION;
		this.color = randomColor();
		
		this.init = function() {
			this.element = document.createElement('div');
			this.element.setAttribute('class','box');
			this.container = document.getElementById('container');
			this.element.addEventListener('click',this.disappear, false);
     	this.element.style.background = 'rgb('+ this.color +')';
     	this.container.appendChild(this.element);
		}

		this.setBoxValues = function(_X, _Y) {
			this.centerX = _X;
			this.centerY = _Y;
			this.x = this.centerX - RADIUS;
			this.y = this.centerY - RADIUS;
		} 

		this.draw = function() {
			this.element.style.top = this.y + 'px';
			this.element.style.left = this.x +'px';
		}

		this.changeColor = function() {
			this.element.style.background = 'rgb('+ randomColor() + ')';
		}

		this.disappear = function() {
			that.element.style.display = 'none';
			incrementScore();
		}

	}

	function incrementScore() {		
		score++;
	}

	function randomColor(){
		var redColor = getRandom(0,255);
		var greenColor = getRandom(0,255);
		var blueColor = getRandom(0,255);
		return redColor + "," + greenColor +',' + blueColor;
	}

	function BoxAnimation() {
		var that = this;
		var boxes = [];
		var scoreBoard	= document.getElementById('scoreBoard');
		var timer = document.getElementById('timer');
		var counter = 0;
		var counterFlag = true;

		this.init = function() {
			createBoxes();
			setInterval(moveBoxes,TIME_LOOP);
		}

		var createBoxes = function() {
			for(i = 0; i < BOX_LIMIT; i++) {
				var box = new Box();
				//do {
					var randX = getRandom(OFFSET, CANVAS_WIDTH - OFFSET);
					var randY= getRandom(OFFSET, CANVAS_HEIGHT - OFFSET);
					console.log(randX);
					console.log(randY);
					box.init();
					box.setBoxValues(randX,randY);
				//}while(overlapCheck(box))	
				box.draw();
				boxes.push(box);
			}
		}

		// var overlapCheck = function(box) {
		// 	for(var j = 0; j < boxes.length; j++) {
		// 		var nextBox = boxes[j];
		// 		if(collideCheck(box, nextBox)){
		// 			console.log('collideCheck true');
		// 			return true;
		// 		}
		// 	}
		// 	return false;
		// }

		// var collideCheck = function(box1, box2) {
		// 	var centerXDist = box1.centerX * box2.centerX;
		// 	centerXDist *= centerXDist;
		// 	var centerYDist = box1.centerY * box2.centerY;
		// 	centerYDist *= centerYDist;
		// 	var d = Math.sqrt(centerXDist, centerYDist);
		// 	if(d > 0 && d > RADIUS) {
		// 		return true;
		// 	} else {
		// 		return false;
		// 	}

		// }

		var checkWallCollision = function(box) {
			if(box.x <= 0) {
				box.dx = DIRECTION;
			}
			if(box.y <=0) {
				box.dy = DIRECTION;
			}
			if(box.x >= (CANVAS_WIDTH - BOX_X)){
				box.dx = -DIRECTION;
			}
			if(box.y >= (CANVAS_HEIGHT - BOX_Y)){
				box.dy = -DIRECTION;
			}
			box.draw();
		}

		var collisionDetection = function(box1, position) {
			for(var i = 0; i < BOX_LIMIT; i++) {
				if(i != position) {
					var centerxdist = box1.x - boxes[i].x;
					var centerydist = box1.y - boxes[i].y;
					var dist = Math.sqrt(centerxdist*centerxdist + centerydist*centerydist);
					if (dist <= DIAMETER) {
    				if(centerxdist <= DIAMETER) {
    					box1.dx *= -1;
    					boxes[i].dx *= 1;
    				}
    				if(centerydist <= DIAMETER) {
    					box1.dy *= -1;
    					boxes[i].dy *= 1;
    				}
					}
				}
			}
		}

		var gameScore = function() {
			scoreBoard.innerHTML = "Score: "+score;		
		}

		var startCounter = function() {
			if(counterFlag) {
				counter+=(TIME_LOOP/10000) ;
				timer.innerHTML = parseInt(counter);
			}
			if(boxes.length == score) {
				counterFlag = false;
				timer.innerHTML = "Finished at " + parseInt(counter) + "s";
			}

		}

		var moveBoxes = function() {
			for(var i=0; i<BOX_LIMIT; i++){
				var box = boxes[i];
				box.x += box.dx;
				box.y += box.dy;
				box.draw();
				gameScore();
				startCounter();
				collisionDetection(box, i);
				checkWallCollision(box);
			}
		}


	}

	function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
	}	

	new BoxAnimation().init();
})();
	