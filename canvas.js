let c = document.getElementById("myCanva");
let ctx = c.getContext("2d");		

// SRC: https://www.tutorialspoint.com/article/get-the-size-of-the-screen-current-web-page-and-browser-window-in-javascript
// sets the canvas 
c.width = 500;
c.height = 500;
// 
// 
// 



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

	// clear canvas and show all drawn circles
	clear_canvas();

	show_balls(ctx);

	ctx.fillStyle="orange";

	// show position of mouse cursor
	ctx.beginPath();
	
	ctx.arc(event.pageX - 5, event.pageY - 110, 10, 0, 2 * Math.PI);
	ctx.fill();

	if(clicked) {
		balls[balls.length] = [event.pageX - 5, event.pageY-110];
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
