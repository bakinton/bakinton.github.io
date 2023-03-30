

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;
document.body.appendChild(canvas);

// Background image
var background = false;
var backgroundImage = new Image();
backgroundImage.onload = function () {
	background = true;
};
backgroundImage.src = "platform_thick.gif";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "Hero.png";

// Enemy image
var enemyReady = false;
var enemyImage = new Image();
enemyImage.onload = function () {
	enemyReady = true;
};
   enemyImage.src = "Enemy.png";

// Game objects
var hero = {
	speed: 200
};
var enemy = {};
var enemyCaught = 0;


var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);


var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	
	enemy.x = 32 + (Math.random() * (canvas.width - 64));
	enemy.y = 32 + (Math.random() * (canvas.height - 64));
};
// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { 
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown) { 
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown) { 
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) { 
		hero.x += hero.speed * modifier;
       
	}

    var resetSpeedBtn = document.getElementById("resetSpeedButton");
    resetSpeedBtn.addEventListener("click", ()=>{
        hero.y += hero.speed,
        hero.y -= hero.speed
        
    })



	//When they touching
	if (
		hero.x <= (enemy.x + 32)
		&& enemy.x <= (hero.x + 32)
		&& hero.y <= (enemy.y + 32)
		&& enemy.y <= (hero.y + 32)
	) {
		++enemyCaught;
		reset();
	}
};

// Draw
var render = function () {
	if (background) {
		ctx.drawImage(backgroundImage, 0, 0);
	}

	if (hero) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (enemy) {
		ctx.drawImage(enemyImage, enemy.x, enemy.y);
	}

	// Score
	ctx.fillStyle = "rgb(150, 75, 0)";
	ctx.font = "20px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Score: " + enemyCaught, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	requestAnimationFrame(main);
};


var w = window;
requestAnimationFrame = w.requestAnimationFrame;


var then = Date.now();
reset();
main();

var resetScoreBtn = document.getElementById("resetScore");
resetScoreBtn.addEventListener("click", ()=>{

    enemyCaught = 0;
    
})



