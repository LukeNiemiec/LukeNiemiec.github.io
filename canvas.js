



let balls = [];
let clicked = false;


let colors = [
	"orange",
	"red",
	"cyan",
	"purple",
	"green",
	"blue",
	"yellow",
];

// clears the canvas of all circles
function clear_canvas() {
	let c = document.getElementById("myCanva");
	let ctx = c.getContext("2d");		


	ctx.clearRect(0, 0, c.width, c.height);
}

// draws all of the circles at the 
function show_balls(ctx) {
	for(i = 0; i < balls.length; i++) {
		// alternate color for each circle
		ctx.fillStyle = colors[i%colors.length];
		
		// draw circle
		ctx.beginPath();
		ctx.arc(balls[i][0], balls[i][1], 10, 0, 2 * Math.PI);
		ctx.fill();
	}
}


// shows the circles drawn and the circle of the mouse cursor
function onMove(event) {

	let c = document.getElementById("myCanva");
	let ctx = c.getContext("2d");
	// console.log(event.pageX);
	// console.log(event.pageY);
	let x_padding = -4;
	let y_padding = -100;

	// clear canvas and show all drawn circles
	clear_canvas();

	show_balls(ctx);

	ctx.fillStyle="orange";

	// show position of mouse cursor
	ctx.beginPath();
	
	ctx.arc(event.pageX + x_padding, event.pageY + y_padding, 10, 0, 2 * Math.PI);
	ctx.fill();

	if(clicked) {
		balls[balls.length] = [event.pageX + x_padding, event.pageY + y_padding];
	}
		
}


// toggles drawin mode
function onClick(event) {
	if(clicked) {
		clicked = false;
	} else {
		clicked = true;
	}
}
