//global variables to easily change key parameters
var colWidth = 101,
    rowHeight = 83,
    canvasWidth = 505,
    canvasHeight = 606,
    numEnemy = 3, //number of bugs
    numStars = 3; //number of stars


// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0; //enemy start at left side of canvas
    //enemies start randomly in rows 2, 3, or 4
    var randomRow = Math.random();
    if (randomRow < .33) { //1/3 of the time start in row 2
        this.y = 63;
    } else if (randomRow < .67) { // 1/3 of the time start in row 3
        this.y = 146;
    }
    else { //1/3 of the time start in row 4
        this.y = 229; 
    }
    this.speed = Math.random()*170; 
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers
    this.x = this.x + dt * this.speed;
    //if enemy reaches the right side of canvas, reset to left side of canvas
    //for collision processing, set the right side and top of enemy
    if (this.x > canvasWidth) {
        this.x = -101;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.x = (canvasWidth/2) - (colWidth/2);
    this.y = 395; //initial player position
    this.score = 0; //used to keep score
    this.updateScoreDisplay();
};

Player.prototype.updateScoreDisplay = function(){ //updates the score
        document.getElementById("score").innerHTML = "Score: " + this.score;
}

Player.prototype.resetGame = function(){ //resets game when the player is in the water
    this.x = 202; //initial player position calculates as 202
    this.y = 395;//initial player position calculates as 395.
};

Player.prototype.resetButton = function(){ //resets score to 0
    player.resetGame();
    this.score = 0;
    this.updateScoreDisplay();
};

Player.prototype.update = function(){
        player.checkCollisions(); //collision processing
    };

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keys){
    switch(keys){
        case 'left':
            this.x = this.x - colWidth;//move to the left
            if (this.x < 0) {
                this.x = 0;
            }
            break;
        case 'up':
            this.y = this.y - rowHeight;//move up
            if (this.y === -20) { // Player is in the water row
                this.score = this.score + 3;
                document.getElementById("score").innerHTML = "Score: " + this.score;
                this.y = -10;
            } else if (this.y < -20) { //Player is in water row, when the up button is pressed, the game resets
                this.y = -10;
                player.resetGame();
            }
            break;
        case 'right':
            this.x = this.x + colWidth;//move to the right
            if (this.x > canvasWidth - colWidth) {
                this.x = canvasWidth - colWidth;
            }
            break;
        case 'down':
            this.y = this.y + rowHeight;//move down
            if (this.y > 395) {
                this.y = 395;
            }
            if (this.y === 73) {
                player.resetGame();//Player is in water row, when the down button is pressed, the game resets
            }
            break;
    }

};

//check if there are collisions
Player.prototype.checkCollisions = function(){
    this.top = this.y; //top of the player sprite
    this.left = this.x + 15; //left side of the player sprite
    this.right = this.x + 85; //right of the player sprite
    //this.sameRow = false;
    //this.sameColumn = false;

    for (var i = 0; i < allEnemies.length; i++){
        this.bugRight = allEnemies[i].x + 101;//right side of the enemy sprite
        this.bugTop = allEnemies[i].y; //top of the enemy sprite
        this.bugLeft = allEnemies[i].x; //left side of the enemy sprite
        if (this.top === this.bugTop) {
        //enemy and player are in the same row
            if (this.bugRight > this.left && this.right > this.bugLeft) { //enemy and player are in the same column
                this.score = this.score - 1; //player collides with enemy and looses one point
                this.updateScoreDisplay();//updates score
                player.resetGame();
            }
        }
    }

    for (var i = 0; i < stars.length; i ++) {
        this.starRight = stars[i].x +101; //right side of the star sprite
        this.starTop = stars[i].y; //top of the star sprite
        this.starLeft = stars[i].x;//left of the star sprite
        
    if (this.top === this.starTop) {
    //star and player are in the same row
        if (this.starRight > this.left && this.right > this.starLeft) { //star and player are in the same column
            this.score = this.score + 1; //player collects star and adds one point
            this.updateScoreDisplay(); //updates score
                var randomColumn = Math.random(); //star placed in a random column
                if (randomColumn < .2) {
                    stars[i].x = 0;//code
                } else if (randomColumn < .4 ) {
                    stars[i].x = 101;//code
                } else if (randomColumn < .6) {
                    stars[i].x = 202;
                } else if (randomColumn < .8){
                     stars[i].x = 303;
                } else if (randomColumn < 1){
                    stars[i].x = 404;//code
                }
                var randomRow = Math.random(); //star placed in a random row
                if (randomRow < .33) {  //1/3 of the time start in row 2
                    stars[i].y = 63;
                } else if (randomRow < .67) { // 1/3 of the time start in row 3
                    stars[i].y = 146;
                }
                else { //1/3 of the time start in row 4
                    stars[i].y = 229; 
                } 
            }
        }
    }
};

var Star = function(){ //stars our player can collect
    this.sprite = 'images/Star.png';
    var randomColumn = Math.random(); //star placed in a random column
    if (randomColumn < .2) {
        this.x = 0;
    } else if (randomColumn < .4 ) {
        this.x = 101;
    } else if (randomColumn < .6) {
        this.x = 202;
    } else if (randomColumn < .8){
        this.x = 303;
    } else if (randomColumn < 1){
        this.x = 404;
    }
    var randomRow = Math.random(); //star placed in a random row
    if (randomRow < .33) {  //1/3 of the time start in row 2
        this.y = 63;
    } else if (randomRow < .67) {  // 1/3 of the time start in row 3
        this.y = 146;
    }
    else {  //1/3 of the time start in row 4
        this.y = 229; 
    } 
};

var stars = []; //contains stars to collect
var i;
for (i =0; i < numStars; i ++){
    var star = new Star;
    stars.push(star);
}


Star.prototype.update = function() {
    //this is updated through the engine.js file
};

Star.prototype.render = function() { //draws stars on the screen
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now instantiate your objects.
var allEnemies = [];
// Place all enemy objects in an array called allEnemies
var i; 
for (i = 0; i< numEnemy; i++) {
    var enemy = new Enemy;
    allEnemies.push(enemy);//code
}

// Place the player object in a variable called player
var player = new Player;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});





