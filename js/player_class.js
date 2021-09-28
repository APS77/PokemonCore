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
})
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
})
/*
window.addEventListener('click', (event) => {
    if(event.target.matches('#btn')) console.log('click');
    else if (event.target.matches('.btn2')) console.log('click 22222');
})
*/
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

    // SETTERS AND GETTERS
    set setPlayerPosX (posX) {this.posX = posX + 3;} // Utilizar multiplos de 5 para que calze con velocidad 5 ( o multiplo de 5 tb)
    set setPlayerPosY (posY) {this.posY = posY;}
    set setPlayerWidth (width) {this.width = width/4;}
    set setPlayerHeight (height) {this.height = height/4;}
    set setPlayerSpeed (speed) {this.speed = speed;}
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

    movePlayer () {  //  A D W S (en ese orden)
        if ( !this.canMove ) return;
        if (move == false) this.moving = false;
        this.isMoving(keys);
        this.setLeftMovement(keys);
        this.setRightMovement(keys);
        this.setUpMovement(keys);
        this.setDownMovement(keys);
        this.handlePlayerFrame();
    }

    deactivate() {
        this.canMove = false;
        // hidden al player sprite
    }
    
    isMoving (keys) {
        if ( !this.isAnyArrowKey(keys) ) return;
        this.moving = true;
        move = true;
    }

    isAnyArrowKey (keys) {
        return keys[0] == 87 || keys[0] == 83 || keys[0] == 65 || keys[0] == 68;
    }

    // Left
    setLeftMovement(keys) {
        if ( !this.isLeftThePriority(keys) ) return;
        this.frameY = 1;
        this.checkLeftBorderCollision();
    }

    isLeftThePriority(keys) { 
        return keys[0] == 65 && keys.length == 1 || keys[0] == 68 && keys[1] == 65 || keys[0] == 65 && keys[1] == 68;
    }

    checkLeftBorderCollision() {
        if (this.posX > 0) this.posX -= this.speed;
    }
    //Right
    setRightMovement (keys) {
        if ( !this.isRightThePriority(keys) ) return; 
        this.frameY = 2;
        this.checkRightBorderCollision();
    }

    isRightThePriority (keys) {
        return keys[0] == 68 && keys.length == 1;
    }

    checkRightBorderCollision () {
        if (this.posX < canvas.width - this.width + 10) this.posX += this.speed;
    }
    //Up
    setUpMovement (keys) {
        if ( !this.isUpThePriority(keys) ) return;
        this.frameY = 3;
        this.checkUpBorderColission();
    }

    isUpThePriority (keys) {
        return keys[keys.length - 1] == 87 || keys[0] == 87 || keys[0] == 83 && keys[1] == 87 || keys[0] == 87 && keys[1] == 83
    }

    checkUpBorderColission () {
        if (this.posY > 25) this.posY -= this.speed; 
    }
    //Down
    setDownMovement (keys) {
        if ( !this.isDownThePriority(keys) ) return;
        this.frameY = 0;
        this.checkDownBorderColission();
    }

    isDownThePriority (keys) {
        return keys[keys.length - 1] == 83 && keys[0] != 87 || keys[0] == 83 && keys[1] != 87;
    }

    checkDownBorderColission () {
        if (this.posY < canvas.height - this.height + 10) this.posY += this.speed;
    }
    // ------------------------------------------------------------------------------
    handlePlayerFrame () {
        (this.frameX < 3 && this.moving) ? this.frameX++ : this.frameX = 0;
    }

    getHitbox() {
        return [this.posX + 2, this.posY + 5, this.width - 12, this.height - 18];
    }

    showHitbox (context) {
        context.beginPath();
        context.strokeStyle = "black"; //always black
        context.rect(this.posX + 2, this.posY + 5, this.width - 12, this.height - 18);
        context.stroke();
    }
}