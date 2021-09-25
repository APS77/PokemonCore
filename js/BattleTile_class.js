export class BattleTile {
    constructor (tileIMG) {
        this.posX = null;
        this.posY = null;
        this.ratio = null;
        this.tileIMG = tileIMG;
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

    drawTile (context) {
        context.drawImage(this.tileIMG, this.posX, this.posY, this.width, this.height);
    }

    getHitbox () {
        return [this.posX, this.posY, this.width, this.height];
    }

    showTileHitbox (context) {
        context.beginPath();
        context.rect(this.posX, this.posY, this.width, this.height);
        context.stroke();
    }

    getRandom() {
        return Math.random() * 100;
      }

    randomBattleCalculator () {
        let randomNumber = this.getRandom();
        this.battleIndicator = [];
        if (this.ratio >= randomNumber) {
            this.battleIndicator.push(this.ratio);
            this.battleIndicator.push(randomNumber);
            console.log(this.battleIndicator);
        } 
    }

    isbattle () {
        if ( !this.playerOnTile ) return;
        this.randomBattleCalculator ();
    }

    battleLauncher () {
        this.isbattle();
        if ( this.battleIndicator[0] >= this.battleIndicator[1] ) {
            console.log("BATALLA INICIADA");
        }
    }

    /*
    insertTiles (posX, posY, rows, columns) {
        for (let x = posX; x < posX + rows * 20; x += 20) {
            for (let y = posY; y < posY + columns * 20; y += 20) {
                context.drawImage(this.tileIMG, x, y, 20, 20);
            }
        }
    }
    */
}