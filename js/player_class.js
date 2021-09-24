let context = canvas.getContext("2d");
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

window.addEventListener('click', (event) => {
    if(event.target.matches('#btn')) console.log('click');
    else if (event.target.matches('.btn2')) console.log('click 22222');
})

export class Player {
    constructor (spriteIMG) {
        this.posX = null;
        this.posY = null;
        this.width = null;
        this.height = null;
        this.frameX = 0;
        this.frameY = 0;
        this.speed = null;
        this.moving = false;
        this.spriteIMG = spriteIMG;
        this.canMove = true;
    }

    // SETTERS AND GETTERS
    set setPlayerPosX (posX) {
        this.posX = posX + 3;
    } // Utilizar multiplos de 5 para que calze con velocidad 5 ( o multiplo de 5 tb)

    set setPlayerPosY (posY) {
        this.posY = posY;
    }

    set setPlayerWidth (width) {
        this.width = width/4;
    }

    set setPlayerHeight (height) {
        this.height = height/4;
    }

    set setPlayerSpeed (speed) {
        this.speed = speed;
    }

    get getPlayerPos () {
        return (`Posicion inicial = x: ${this.posX}, y: ${this.posY}`);
    }

    get getPlayerDimensions () {
        return (`Player sprite = Width: ${this.width}, Height: ${this.height}`);
    }

    get getPlayerSpeed () {
        return (`Player Speed: ${this.speed}`);
    }

    // METHODS
    drawSprite (img, sX, sY, sW, sH, dX, dY, dW, dH) {
        context.drawImage(this.spriteIMG, this.width * this.frameX, this.height * this.frameY,
            this.width, this.height, this.posX, this.posY, this.width/1.3, this.height/1.3);
    }

    movePlayer () {  //  A D W S (en ese orden)
        if ( !this.canMove ) return;
        this.setMoveSentinels();
        this.setAllMovement(keys);
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
        if (this.posX > 0) this.posX -= this.speed;
    }
    //---> Right
    rightKeyPriority(keys) {
        return keys[0] == 68 && keys.length == 1;
    }

    rightBorderCollisionCheck() {
        if (this.posX < canvas.width - this.width + 10) this.posX += this.speed;
    }
    // ---> Up
    upKeyPriority(keys) {
        return keys[keys.length - 1] == 87 || keys[0] == 87 || keys[0] == 83 && keys[1] == 87 || keys[0] == 87 && keys[1] == 83;
    }

    upBorderCollisionCheck() {
        if (this.posY > 25) this.posY -= this.speed;
    }
    // ---> Down
    downKeyPriority(keys) {
        return keys[keys.length - 1] == 83 && keys[0] != 87 || keys[0] == 83 && keys[1] != 87;
    }

    downBorderCollisionCheck() {
        if (this.posY < canvas.height - this.height + 10) this.posY += this.speed;
    }
    // End movement
    deactivate() {
        this.canMove = false;
        // hidden al player sprite
    }

    handlePlayerFrame () {
        (this.frameX < 3 && this.moving) ? this.frameX++ : this.frameX = 0;
    }

    getHitboxCoordinates() {
        return {
            x: this.posX + 2,
            y: this.posY + 5,
            width: this.width - 12,
            height: this.height - 18
        }
    }

    showHitbox () {
        let { x, y, width, height } =  this.getHitboxCoordinates();
        context.beginPath();
        context.rect(x, y, width, height);
        context.stroke();
    }
}