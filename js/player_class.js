import KEYS from './Keys.js';

let context = canvas.getContext("2d");
let keys = [];
let move = false; // check if it is moving or not
const MAX_KEYS_PRESS = 2;
const POKEMON_MAX_NUMBER = 6;

window.addEventListener("keydown", function (e) {
    if (keys.length == 0) keys.push(e.keyCode);
    if (keys[0] != e.keyCode && keys.length < MAX_KEYS_PRESS) keys.push(e.keyCode);
});

window.addEventListener("keyup", function (e) {
    if(keys[1] == e.keyCode) keys.pop();
    if(keys[0] == e.keyCode) keys.shift();
    if (keys.length == 0) move = false;
});

export class Player {
    constructor (spriteImg) {
        this.x = null;
        this.y = null;
        this.width = 32;
        this.height = 48;
        this.frameX = 0;
        this.frameY = 0;
        this.speed = 5;
        this.moving = false;
        this.spriteImg = spriteImg;
        this.canMove = true;
        this.pokemons = new Array(POKEMON_MAX_NUMBER);
    }
    // Setters
    set setX (x) {this.x = x + 3;} // Utilizar multiplos de 5 para que calze con velocidad 5 ( o multiplo de 5 tb)
    set setY (y) {this.y = y;}
    set setWidth (width) {this.width = width/4;}
    set setHeight (height) {this.height = height/4;}
    set setSpeed (speed) {this.speed = speed;}
    // Getters
    get getPos () {return (`Posicion inicial = x: ${this.x}, y: ${this.y}`);}
    get getDimensions () {return (`Player sprite = Width: ${this.width}, Height: ${this.height}`);}
    get getSpeed () {return (`Player Speed: ${this.speed}`);}

    setPosition (x, y) {
        this.x = x;
        this.y = y;
    }

    drawSprite () { // Pool this Object Method
        let spriteImage = this.spriteImg,
            sx = this.width * this.frameX,
            sy = this.height * this.frameY,
            sWidth = this.width,
            sHeight = this.height,
            dx = this.x,
            dy = this.y,
            dWidth = this.width / 1.3,
            dHeight = this.height / 1.3;
        context.drawImage(spriteImage, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    }

    addPokemonToTheParty(pokemon) {
        this.pokemons.unshift(pokemon);
    }

    deactivate() {
        this.canMove = false;
        this.moving = false;
    }
    // Movement
    setMoveSentinels() {
        if (move == false) this.moving = false;
        if ( !this.isSomeMovementKeyPress() ) return;
        this.moving = true;
        move = true;
    }

    isSomeMovementKeyPress() {
        return keys[0] == KEYS.W || keys[0] == KEYS.S || keys[0] == KEYS.A || keys[0] == KEYS.D;
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
        return keys[0] == KEYS.A && keys.length == 1 || keys[0] == KEYS.D && keys[1] == KEYS.A || keys[0] == KEYS.A && keys[1] == KEYS.D;
    }

    leftBorderCollisionCheck() {
        if (this.x > 0) this.x -= this.speed;
    }
    //---> Right
    rightKeyPriority(keys) {
        return keys[0] == KEYS.D && keys.length == 1;
    }

    rightBorderCollisionCheck() {
        if (this.x < canvas.width - this.width + 8) this.x += this.speed;
    }
    // ---> Up
    upKeyPriority(keys) {
        return keys[keys.length - 1] == KEYS.W || keys[0] == KEYS.W || keys[0] == KEYS.S && keys[1] == KEYS.W || keys[0] == KEYS.W && keys[1] == KEYS.S;
    }

    upBorderCollisionCheck() {
        if (this.y > 25) this.y -= this.speed;
    }
    // ---> Down
    downKeyPriority(keys) {
        return keys[keys.length - 1] == KEYS.S && keys[0] != KEYS.W || keys[0] == KEYS.S && keys[1] != KEYS.W;
    }

    downBorderCollisionCheck() {
        if (this.y < canvas.height - this.height + 9) this.y += this.speed;
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
    showHitbox (context) {
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