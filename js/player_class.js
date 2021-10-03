let keys = [];
let move = false; // check if it is moving or not

window.addEventListener("keydown", function (e) {
    if (keys.length == 0) {
        keys.push(e.keyCode);
        //console.log(keys);
    }
    if (keys[0] != e.keyCode && keys.length < 2) {
        keys.push(e.keyCode);
        //console.log(keys)
    }
});
window.addEventListener("keyup", function (e) {
    if(keys[1] == e.keyCode) {
        keys.pop();
        //console.log(keys);
    }
    if(keys[0] == e.keyCode) {
        keys.shift();
        //console.log(keys);
    }
    if (keys.length == 0) {
        move = false;
    }
});

export class Player {
    constructor (spriteImg) {
        this.posX = null;
        this.posY = null;
        this.width = 32;
        this.height = 48;
        this.frameX = 0;
        this.frameY = 0;
        this.speed = 5;
        this.moving = false;
        this.spriteImg = spriteImg;
        this.canMove = true;
    }

    // Setters
    set setPlayerPosX (posX) {this.posX = posX + 3;} // Utilizar multiplos de 5 para que calze con velocidad 5 ( o multiplo de 5 tb)
    set setPlayerPosY (posY) {this.posY = posY;}
    set setPlayerWidth (width) {this.width = width/4;}
    set setPlayerHeight (height) {this.height = height/4;}
    set setPlayerSpeed (speed) {this.speed = speed;}
    // Getters
    get getPlayerPos () {return (`Posicion inicial = x: ${this.posX}, y: ${this.posY}`);}
    get getPlayerDimensions () {return (`Player sprite = Width: ${this.width}, Height: ${this.height}`);}
    get getPlayerSpeed () {return (`Player Speed: ${this.speed}`);}

    // METHODS
    setPosition (x, y) {
        this.setPlayerPosX = x;
        this.setPlayerPosY = y;
    }

    drawSprite (context) { // Pool this Object Method
        let spriteImage = this.spriteImg,
            sx = this.width * this.frameX,
            sy = this.height * this.frameY,
            sWidth = this.width,
            sHeight = this.height,
            dx = this.posX,
            dy = this.posY,
            dWidth = this.width/1.3,
            dHeight = this.height/1.3;
        context.drawImage(spriteImage, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    }

    // Movement
    setMoveSentinels() {
        if (move == false) this.moving = false;
        if ( !this.isSomeMovementKeyPress() ) return;
        this.moving = true;
        move = true;
    }

    isSomeMovementKeyPress() {
        return keys[0] == 87 || keys[0] == 83 || keys[0] == 65 || keys[0] == 68;
    }

    setAllMovement(keys) {
        // A D W S (en ese orden)
        this.setMovement(keys, 'left', 1);
        this.setMovement(keys, 'right', 2);
        this.setMovement(keys, 'up', 3);
        this.setMovement(keys, 'down', 0);
    }

    setMovement(keys, direction, frameIndex) {
        let { isTheKeyPriority, checkBorderCollision } = this.getMovementFuncs(direction);
        if ( !this[isTheKeyPriority](keys) ) return;
        this.frameY = frameIndex;
        this[checkBorderCollision]();
    }

    getMovementFuncs(direction) {
        return {
            isTheKeyPriority: `${direction}KeyPriority`,
            checkBorderCollision: `${direction}BorderCollisionCheck`
        };
    }
    // ---> Left
    leftKeyPriority(keys) {
        return keys[0] == 65 && keys.length == 1 || keys[0] == 68 && keys[1] == 65 || keys[0] == 65 && keys[1] == 68;
    }

    leftBorderCollisionCheck() {
        if (this.x > 0) this.x -= this.speed;
    }
    //---> Right
    rightKeyPriority(keys) {
        return keys[0] == 68 && keys.length == 1;
    }

    rightBorderCollisionCheck() {
        if (this.x < canvas.width - this.width + 10) this.x += this.speed;
    }
    // ---> Up
    upKeyPriority(keys) {
        return keys[keys.length - 1] == 87 || keys[0] == 87 || keys[0] == 83 && keys[1] == 87 || keys[0] == 87 && keys[1] == 83;
    }

    upBorderCollisionCheck() {
        if (this.y > 25) this.y -= this.speed;
    }
    // ---> Down
    downKeyPriority(keys) {
        return keys[keys.length - 1] == 83 && keys[0] != 87 || keys[0] == 83 && keys[1] != 87;
    }

    downBorderCollisionCheck() {
        if (this.y < canvas.height - this.height + 10) this.y += this.speed;
    }
    // End movement
    deactivate() {
        this.canMove = false;
        // hidden al player sprite or stop drawing, i think you were right the other day
    }
    // Update
    update() {
        this.move();
        this.animate();
    }

    move () { 
        if ( !this.canMove ) return;
        this.setMoveSentinels();
        this.setAllMovement(keys);
    }

    animate () {
        (this.frameX < 3 && this.moving) ? this.frameX++ : this.frameX = 0;
    }
    // Hitbox
    showHitbox () {
        let { x, y, width, height } =  this.getHitboxCoordinates();
        context.beginPath();
        context.rect(x, y, width, height);
        context.stroke();
    }

    getHitboxCoordinates() {
        return {
            x: this.x + 2,
            y: this.y + 5,
            width: this.width - 12,
            height: this.height - 18
        }
    }
}