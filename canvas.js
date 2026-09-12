class Ball {
	constructor(ctx, startx, starty, radius) {
		this.ctx = ctx;
		this.x = startx;
		this.y = starty;
		this.r = radius;
		this.time = 0;
		this.velocity = 1;
		this.mass = 20;
		this.direction = 270;
		this.pnts = [];
		this.radius = 20; // 20 pixel radius
	}

	get_area() {
		let pnts = [];
		for(let i = 0; i < 360; i++) {
			let angle = i*(Math.PI/180);
			
			let x = this.x + Math.round(this.r * Math.cos(angle));
			let y = this.y + Math.round(this.r * Math.sin(angle));
			pnts[i] = [x, y];
		}

		this.pnts = pnts;
	}


	is_touching(ball) { 
	
		my_pnts = this.get_area();	

		function is_in(value, index, array) {
			for (let i = 0; i < my_pnts.length; i++) {
				if (my_pnts[i] == value){
					return i;
				}
			}
			return false;
		};
	
		//returns true if ball is touching this ball	
		ball_pnts = ball.get_area();
		contact = [];

		for(let angle = 0; angle < ball_pnts.length; angle++) {
			ball = ball_pnts[angle];
			let c = my_pnts.find(is_in);
			
			if(c != false) {
				this.direction = (this.direction + c) % 360;
				ball.direction = (ball.direction + angle) % 360;
				
				let vc = Math.abs(this.direction%180 - ball.direction%180)/180;
				this.velocity = Math.round(this.velocity * vc);
				ball.velocity = Math.round(ball.velocity * vc);
				
				
			}
		}

		
	}

	to_radians(x) {
		return x*(Math.PI/180);
	}

	to_degrees(x) {
		return x * (180/Math.PI);
	}

	update_position() {
		this.time++;
		
		if((this.x + this.r >= 500) || (this.x - this.r <= 0) || (this.y + this.r >= 500) || (this.y - this.r <= 0))  {
			this.direction = (this.direction + this.direction) % 360;
		} 
		let new_x = this.x+Math.round(this.to_degrees(Math.cos(this.direction)) * this.velocity);
		let new_y = this.y+Math.round(this.to_degrees(Math.sin(this.direction)) * this.velocity);

		this.velocity = Math.round((new_x + new_y - this.x - this.y) / this.time);

		

		this.get_area();
	}

	show() {
		this.ctx.beginPath();
		this.ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
		this.ctx.fillStyle="orange";
		this.ctx.fill();
	}
}

function clear_canvas(ctx, w, h) {
	ctx.clearRect(0, 0, w, h);
}

function create_balls(ctx, n) {

	let startx = 50;
	let starty = 50;

	let balls = [];

	for(let i = 0; i < n; i++) {
		startx += 50;
		let new_ball = new Ball(ctx, startx, starty, 20);
		balls[i] = new_ball;
	} 
	return balls;
}

function button_create_balls() {

	const c = document.getElementById("myCanva");
	const ctx = c.getContext("2d");

	let balls = create_balls(ctx, 5);

	for(let i = 0; i < balls.length; i++) {
		let ball = balls[i];

		ball.show();
	}

	while(true) {
		clear_canvas(ctx, 500, 500)
		for(let i = 0; i < 5; i++) {
			let ball = balls[i];
			ball.update_position();
			ball.show();
			
		}
									
	}
}
