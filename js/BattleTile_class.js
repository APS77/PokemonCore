import {launchBatlle} from "./battleMain.js";

let context = canvas.getContext("2d");

export class BattleTile {
    constructor (tileImg) {
        this.x = null;
        this.y = null;
        this.ratio = null;
        this.tileImg = tileImg;
        this.width = 20;
        this.height = 20;
        this.battleIndicator = [];
        this.playerOnTile = false;
    }

    set setX (x) { this.x = x; }
    set setY (y) { this.y = y; }
    set setBattleRatio (ratio) { this.ratio = ratio; }

    setAttributes (x, y, ratio) {
        this.setX = x;
        this.setY = y;
        this.setBattleRatio = ratio;
    }

    drawTile () {
        context.drawImage(this.tileImg, this.x, this.y, this.width, this.height);
    }

    getHitbox () {
        return [this.x, this.y, this.width, this.height];
    }

    showHitbox () {
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.stroke();
    }

    getRandom() {
        return Math.random() * 100;
    }

    battleChecker () {
        if ( this.battleIndicator[0] >= this.battleIndicator[1] ) return true;
    }

    randomBattleHandler () {
        if (this.battleIndicator.length >= 2) return;
        this.setBattleIndicator();
        return this.battleChecker();
    }

    setBattleIndicator() {
        let randomNumber = this.getRandom();
        this.battleIndicator.push(this.ratio);
        this.battleIndicator.push(randomNumber);
        console.log(this.battleIndicator);
    }

    isbattle () {
        if ( !this.playerOnTile ) return;
        return this.randomBattleHandler();
    }

    battleLauncher (player) {
        if ( !this.isbattle() ) return;
        console.log("BATALLA INICIADA");
        console.log("<Deactivate player>");
        player.deactivate();
        // Move battle tile off screen (canvas) and set ratio to 0
        launchBatlle(player);
    }

    collisionDetect(playerHitbox) {
        this.resetHitboxColor();
        if (this.isPlayerOffTheTile(playerHitbox) ) return;
        this.actionsOnPlayerOnTheTile();
    }

    isPlayerOffTheTile(playerHitbox) {
        this.playerOnTile = false;
        if ( this.isPlayerOffTheTileChecker(playerHitbox, this.getHitbox() )) {
            this.battleIndicator = [];    
            return true;
        }
        return false;
    }

    isPlayerOffTheTileChecker(playerHitbox, battleTile) {
        return playerHitbox.x >= battleTile[2] + battleTile[0] - 5 ||
            playerHitbox.width + playerHitbox.x <= battleTile[0] + 5 ||
            playerHitbox.height + playerHitbox.y <= battleTile[1] ||
            playerHitbox.height + playerHitbox.y >= battleTile[3] + battleTile[1] + 10
    };

    actionsOnPlayerOnTheTile() {
        this.playerOnTile = true;
        this.changeHitboxColor();
    }

    resetHitboxColor () {context.strokeStyle = "black";}
    changeHitboxColor () {context.strokeStyle = "red";}

    /*
    drawTiles (context, x, y, rows, columns) {
        for (let x = x; x < x + rows * 20; x += 20) {
            for (let y = y; y < y + columns * 20; y += 20) {
                context.drawImage(this.tileImg, x, y, 20, 20);
            }
        }
    }
    */
}