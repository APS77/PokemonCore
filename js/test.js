class Player {
    constructor (spriteIMG) {
        this.posX = null;
        this.posY = null;
        this.width = null / 4;
        this.height = null / 4;
        this.frameX = 0;
        this.frameY = 0;
        this.speed = null;
        this.moving = false;
        this.spriteIMG = spriteIMG;
    }

    // SETTERS AND GETTERS
    set setPlayerPos (posX ,posY) {
        this.posX = posX + 3;
        this.posY = posY;
    } // Utilizar multiplos de 5 para que calze con velocidad 5 ( o multiplo de 5 tb)

    set setPlayerDimensions (width, height) {
        this.width = width;
        this.height = height;
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
        context.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
    }

    movePlayer () {  //  A D W S (en ese orden)
        if (keys[0] == 87 || keys[0] == 83 || keys[0] == 65 || keys[0] == 68) this.moving = true;
    
        if (keys[0] == 65 && keys.length == 1 || keys[0] == 68 && keys[1] == 65 || keys[0] == 65 && keys[1] == 68) {
            this.frameY = 1;
            if (this.posX > 0) {
                this.posX -= this.speed;
            }
        }
        if (keys[0] == 68 && keys.length == 1) {
            this.frameY = 2;
            if (this.posX < canvas.width - this.width/1.4) {
                this.posX += this.speed;
            }
        }
        if (keys[keys.length - 1] == 87    ||
            keys[0] == 87                  || 
            keys[0] == 83 && keys[1] == 87 ||
            keys[0] == 87 && keys[1] == 83
            ){
            this.frameY = 3;
            if (this.posY > 28) {
                this.posY -= this.speed;
            }    
        }
        if (keys[keys.length - 1] == 83 && keys[0] != 87 || keys[0] == 83 && keys[1] != 87) {
            this.frameY = 0;
            if (this.posY < canvas.height - this.height + 10) {
                this.posY += this.speed;
            }
        }
    }

    handlePlayerFrame () {
        (this.frameX < 3 && this.moving) ? 
        this.frameX++ : this.frameX = 0;
    }

    rectPlayer() {
        return [this.posX + 2, this.posY + 5, this.width - 12, this.height - 18]; // hitbox Player
    }
}
