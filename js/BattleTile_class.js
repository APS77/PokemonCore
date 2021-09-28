export class BattleTile {
    constructor (tileImg) {
        this.posX = null;
        this.posY = null;
        this.ratio = null;
        this.tileImg = tileImg;
        this.width = 20;
        this.height = 20;
        this.battleIndicator = [];
        this.playerOnTile = false;
    }

    set setTilePosX (posX) {
        this.posX = posX;
    }

    set setTilePosY (posY) {
        this.posY = posY;
    }

    set setTileRatio (ratio) {
        this.ratio = ratio;
    }

    setAttributes (x, y, ratio) {
        this.setTilePosX = x;
        this.setTilePosY = y;
        this.setTileRatio = ratio;
    }

    drawTile (context) {
        //this.setTilePosX = posx;
        //this.setTilePosY = posy;
        //this.setTileRatio = ratio;
        context.drawImage(this.tileImg, this.posX, this.posY, this.width, this.height);
    }

    getHitbox () {
        return [this.posX, this.posY, this.width, this.height];
    }

    showHitbox (context) {
        context.beginPath();
        context.rect(this.posX, this.posY, this.width, this.height);
        context.stroke();
    }

    getRandom() {
        return Math.random() * 100;
      }

    battleChecker () {
        if ( this.battleIndicator[0] >= this.battleIndicator[1] ) return true;
    }

    randomBattleHandler () {
        let randomNumber = this.getRandom();
        if (this.battleIndicator.length >= 2) return;
        this.battleIndicator.push(this.ratio);
        this.battleIndicator.push(randomNumber);
        console.log(this.battleIndicator);
        return this.battleChecker();
    }

    isbattle () {
        if ( !this.playerOnTile ) return;
        return this.randomBattleHandler();
    }

    battleLauncher () {
        if ( !this.isbattle() ) return;
        console.log("BATALLA INICIADA");
        console.log("<Deactivate player>");
    }

    /*
    drawTiles (context, posX, posY, rows, columns) {
        for (let x = posX; x < posX + rows * 20; x += 20) {
            for (let y = posY; y < posY + columns * 20; y += 20) {
                context.drawImage(this.tileImg, x, y, 20, 20);
            }
        }
    }
    */
}