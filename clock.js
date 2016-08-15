(function(win,doc,$){
	win.clock = function clock(opt){
		this._init(opt);
		this._timer();
		};
	$.extend((win.clock.prototype),{
		_init: function(opt){
			var self = this;
			self.opt = {
				canvas:"",
				width:"",
				height:"",
				pixelSize:"",
				pixelRidus:"",
				fontMargin:"",
				digit:"",
				startX:"",
				startY:"",
				}
			$.extend(true,self.opt,opt||{});
			self.canvas = $(self.opt.canvas)[0];
			self.context = self.canvas.getContext("2d");
			self.context.canvas.width = self.opt.width;
			self.context.canvas.height = self.opt.height;
			self.context.clearRect(0,0,self.context.canvas.width,self.context.height);
			self.pixelSize = self.opt.pixelSize;
			self.pixelRidus = self.opt.pixelRidus;
			self.fontMargin = self.opt.fontMargin;
			self.digit = self.opt.digit;
			self.startX = self.opt.startX;
			self.startY = self.opt.startY;
			self.positions = [];
			self.balls = [];
			self.colors = ["#33b5e5","#0099cc","#aa66cc","#9933cc","#99cc00","#669900","#ff4444","#cc0000","#ffbb33","ff8800"];
		},
		_draw: function(digitArray){
			self = this;
			_num = digitArray.length;
			var _startX = self.startX;
			var _startY = self.startY;
			self.context.clearRect(0,0,self.context.canvas.width,self.context.canvas.height);
			for(var i = 0; i < _num; i++){
				self.positions.push(_startX);
				self._drawSingle(digitArray[i],_startX,_startY);
				_startX = _startX + digitArray[i][0].length*self.pixelSize + self.fontMargin;
			}
		},
		_drawSingle: function(digitNum,startX,startY){
			var x0 = startX;
			var y0 = startY;
			self = this;
			for(var i = 0; i < digitNum.length; i++){
				for(var j = 0; j < digitNum[0].length; j++){
					if(digitNum[i][j] == 1){
						self.context.beginPath();
						self.context.arc(startX + j*self.pixelSize + 0.5*self.pixelSize, startY + i*self.pixelSize + 0.5*self.pixelSize, self.pixelRidus, 0,2*Math.PI);
						self.context.fillStyle = "#0c6";
						self.context.fill();						
					}
				}
			}
		},
		_drawBalls: function(){
			var self = this;
			var _index = 0;
			for(var i = 0; i < self.balls.length; i++){
				self.context.beginPath();
				self.context.arc(self.balls[i].x, self.balls[i].y, self.pixelRidus+1, 0,2*Math.PI);
				/*
				if(self.balls[i].x >= self.context.canvas.width || self.balls[i].x <=0){
					self.balls.splice(i,1);
					}/**/

				if(self.balls[i].x <= self.context.canvas.width && self.balls[i].x >=0){
					self.balls[_index] = self.balls[i];
					_index = _index + 1;
				}
				self.context.fillStyle = self.balls[i].color;
				self.context.fill();
				self.context.strokeStyle = "#FFF";
				self.context.stroke();		
			}
			while(self.balls.length > _index){
				self.balls.pop();
			}
			console.log(self.balls.length);
		},
		_timer: function(){
			var self = this;
			var oneSecond = 0;
			var second = 0;
			var minute = 0;
			var hour = 0;
			var frameRate = 50;
			setInterval(update,50);
			function update(){
				oneSecond = (oneSecond + 1)%20;
				if(oneSecond == 0){
					second = (second + 1)%60;
					if(second == 0){
						minute = (minute + 1)%60;
						if(minute == 0){
							hour = (hour + 1)%24;
						}
					}
				}
				self._update(hour,minute,second,oneSecond);
			}
		},
		_update: function(hour,minute,second,oneSecond){
			var self = this;
			var hh,hl,mh,ml,sh,sl;
			var _startX = 30, _startY = 30, T = self.pixelSize*7 + self.fontMargin, mT = self.pixelSize*4 + self.fontMargin;
			hh = Math.floor(hour/10);
			hl = hour%10;
			mh = Math.floor(minute/10);
			ml = minute%10;
			sh = Math.floor(second/10);
			sl = second%10;
			self._updateBalls();
			
			
			
			if(oneSecond == 19){
				self._addBalls(digit[sl],_startX+5*T+2*mT,_startY);
			}
			if(sl == 9 && oneSecond == 19){
				self._addBalls(digit[sh],_startX+4*T+2*mT,_startY);
			}
			if(second == 59 && oneSecond == 19){
				self._addBalls(digit[ml],_startX+3*T+mT,_startY);
			}
			if(ml == 9 && second == 59 && oneSecond == 19){
				self._addBalls(digit[mh],_startX+2*T+mT,_startY);
			}
			if(minute == 9 && second == 59 && oneSecond == 19){
				self._addBalls(digit[hl],_startX+1*T,_startY);
			}
			if(hl == 9 && second == 59 && oneSecond == 19){
				self._addBalls(digit[hh],_startX+0*T,_startY);
			}
			
			var updateArray = [self.digit[hh],self.digit[hl],self.digit[10],self.digit[mh],self.digit[ml],self.digit[10],self.digit[sh],self.digit[sl]]
			self._draw(updateArray);
			self._drawBalls();
		},
		_updateBalls: function(){
			var self = this;
			for(var i = 0; i < self.balls.length; i++){
				
				self.balls[i].x = self.balls[i].x + self.balls[i].vx;
				self.balls[i].y = self.balls[i].y + self.balls[i].vy;
				self.balls[i].vy = self.balls[i].vy + self.balls[i].g
				
				if(self.balls[i].y >= self.context.canvas.height){
					self.balls[i].y = self.context.canvas.height;
					self.balls[i].vy = -self.balls[i].vy*0.65 + Math.pow(1,Math.ceil(Math.random()*1000));
				}
			}
		},
		_addBalls: function(digitNum,startX,startY){
			var self = this;
			for(var i = 0; i < digitNum.length; i++){
				for(var j = 0; j < digitNum[0].length; j++){
					if(digitNum[i][j] == 1){
						var _ball = {};
						_ball.x = startX + j*self.pixelSize + 0.5*self.pixelSize;
						_ball.y = startY + i*self.pixelSize + 0.5*self.pixelSize;
						_ball.vx = Math.pow(-1,Math.ceil(Math.random()*1000))*4;
						_ball.vy = -5;
						_ball.g = Math.random()*10 + 1.5;						
						_ball.color = self.colors[Math.floor(Math.random()*self.colors.length)];
						self.balls.push(_ball);
					}
				}
			}
		}
		
	});
})(window,document,jQuery);



var clock = new clock({
	canvas:"#canvas",
	width:700,
	height:300,
	pixelSize:10,
	pixelRidus:4,
	fontMargin:20,
	digit:digit,
	startX:30,
	startY:30,
	});/**/

