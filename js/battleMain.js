import Pokemon from "./Pokemon/PokemonsAPI.js";
import Attack from "./attack_class.js";
import { startAnimating } from "./script.js";

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

canvas.width = 760;
canvas.height = 400;

// Imagenes
const battleBG = new Image();
battleBG.src = "img/battle/battle3.png";

export let inBattle = false;

const DO_ATTACK = "attack",
    DO_ATTACK_SELECTION = "selected_attack";

class Battle {
    constructor(pkmn1, pkmn2) {
        this.pkmn1 = pkmn1;
        this.pkmn2 = pkmn2;
        this.currentTurn = 0;
    }

    isFinished() {
        return this.pkmn1.currentHP <= 0 || this.pkmn2.currentHP <= 0 // si algun pokemon fue debilitado
    }
}

class Turn {
    constructor() {
        this.command1 = null;
        this.command2 = null;
    }

    canStart() {
        return this.command1 != null && this.command2 != null;
    }
}

class Command {
    constructor(action) {
        this.action = action; // Por ejemplo atacar
    }
}

// BATTLE MAIN ------------------------------------------------------------------------------------------

// Attacks
Pokemon.furret.attacks.push(Attack.scratch);
Pokemon.furret.attacks.push(Attack.slam);
Pokemon.furret.attacks.push(Attack.tackle);
Pokemon.furret.attacks.push(Attack.fire_punch);

new Battle(Pokemon.furret, Pokemon.bayleef);

// USEFUL FUNCTIONS FOR HTML
function clearBox(elementID) {
    let div = document.getElementById(elementID);
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}

function createButton(text) {
    let btn = document.createElement("button");
    btn.id = text.replace(/ /g, "") + "_btn";
    btn.insertAdjacentText('afterbegin', text);
    return btn;
}

function createDiv(elementID) {
    let div = document.createElement("div");
    div.id = elementID;
    return div;
}

function createMessage(texto) {
    let msg = document.createElement("p");
    msg.innerText = texto;
    return msg;
}
/*
#################
# Launch Battle #
#################
*/
export function launchBatlle(player) {
    inBattle = true;
    drawBattle(player.pokemons[0].sprites, Pokemon.bayleef.sprites);
    battleHeader(player);
    battleMenu(player); // Html Battle Buttons menu
    textBox();
}
/* 
#####################
### Draw Battle ###
#####################
*/
function drawBattle(pkmn1Sprites, pkmn2Sprites) {
    context.drawImage(battleBG, 0, 0, canvas.width, canvas.height);
    context.drawImage(pkmn1Sprites.back, 110, 130, 250, 250);
    context.drawImage(pkmn2Sprites.front, 410, 70, 200, 200);
}

function drawBattleWin(pkmn1Sprites) {
    context.drawImage(battleBG, 0, 0, canvas.width, canvas.height);
    context.drawImage(pkmn1Sprites.back, 110, 130, 250, 250);
}
/* 
#####################
### Battle HEADER ###
#####################
*/
function battleHeader(player) {
    if ( !document.getElementById("battleHeader") ) {
        let div = createDiv("battleHeader");
        document.body.appendChild(div);
    }
    playerPkmnInfo(player);
    wildPkmnInfo();
}

function playerPkmnInfo(player) {
    let pkmn1 = createDiv("playerPkmnInfo");
    document.getElementById("battleHeader").appendChild(pkmn1);
    showPlayerPkmnName(player);
    showPlayerPkmnHP(player);
}

function wildPkmnInfo() {
    let pkmn2 = createDiv("wildPkmnInfo");
    document.getElementById("battleHeader").appendChild(pkmn2);
    showWildPkmnName();
    showWildPkmnHP();
}

function showPlayerPkmnName(player) {
    let msg = createMessage(player.pokemons[0].name);
    document.getElementById("playerPkmnInfo").appendChild(msg);
}

function showWildPkmnName() {
    let msg = createMessage(Pokemon.bayleef.name);
    document.getElementById("wildPkmnInfo").appendChild(msg);
}

function showPlayerPkmnHP(player) {
    let msg = createMessage("HP: "+ player.pokemons[0].currentHP + "/" + player.pokemons[0].baseStats.HP);
    document.getElementById("playerPkmnInfo").appendChild(msg);
}

function showWildPkmnHP() {
    let msg = createMessage("HP: "+ Pokemon.bayleef.currentHP + "/" + Pokemon.bayleef.baseStats.HP);
    document.getElementById("wildPkmnInfo").appendChild(msg);
}
/*
###################
### Battle menu ###
###################
*/
function battleMenu(player) {
    let div = createDiv("battleMenu");
    document.body.appendChild(div);
    let msg = createMessage(`What should ${Pokemon.furret.name} do?`);
    document.getElementById("battleMenu").appendChild(msg);
    attackButton(player);
    runAwayButton();
}

function attackButton(player) {
    let btn = createButton("Attack");
    btn.addEventListener("click", function () {
        console.log("Clicked on Attack!");
        clearBox("battleMenu");
        let div = createDiv("attackMenu");
        document.getElementById("battleMenu").appendChild(div);
        let msg = createMessage("Choose your move:");
        document.getElementById("attackMenu").appendChild(msg);
        showPokemonAttacks(player);
        backButton();

    })
    document.getElementById("battleMenu").appendChild(btn);
}

function showPokemonAttacks(player) {
    for (let i = 0; i < 4; i++) {
        showAttackBtn(i, player);
    }
}
function showAttackBtn(i, player) {
    let btn = createButton(player.pokemons[0].attacks[i].name);
    btn.addEventListener("click", function () {
        pushTextLine(`${player.pokemons[0].name} used ${player.pokemons[0].attacks[i].name}!`);
        damageDealer(i, player)
        battleChecker(player);
    });
    document.getElementById("attackMenu").appendChild(btn);
}

function damageDealer(i, player) {
    clearBox("battleHeader");
    if (Pokemon.bayleef.currentHP - player.pokemons[0].attacks[i].power < 0) {
        pushTextLine(`The attack did ${Pokemon.bayleef.currentHP} damage`);
        Pokemon.bayleef.currentHP = 0;
    } else {
        Pokemon.bayleef.currentHP -= player.pokemons[0].attacks[i].power;
        pushTextLine(`The attack did ${player.pokemons[0].attacks[i].power} damage`);
    }
    battleHeader(player);
}

function battleChecker(player) {
    if (Pokemon.bayleef.currentHP == 0) {
        pushTextLine("foe " + Pokemon.bayleef.name + " fainted!");
        pushTextLine("You won the battle!");
        drawBattleWin(player.pokemons[0].sprites);
        setTimeout(function() {endBattle(player);}, 2000);
        console.log("Battle Ended!!");
    }
}

function endBattle (player) {
    removeBattleMenu();
    Pokemon.bayleef.currentHP = Pokemon.bayleef.baseStats.HP;
    inBattle = false;
    player.activate();
    startAnimating(30);
}

function removeBattleMenu() {
    document.getElementById("battleHeader").remove();
    document.getElementById("battleMenu").remove();
    document.getElementById("textBox").remove();
}

function backButton() {
    let btn = createButton("Back");
    btn.addEventListener("click", function () {
        console.log("Clicked on Back!");
        resetBattleMenu();
    })
    document.getElementById("battleMenu").appendChild(btn);
}

function resetBattleMenu() {
    clearBox("battleMenu");
    battleMenu();
}

function runAwayButton() {
    let btn = createButton("Run Away");
    document.getElementById("battleMenu").appendChild(btn);
    btn.addEventListener("click", function () {
        document.getElementById("battleHeader").remove();
        document.getElementById("battleMenu").remove();
        pushTextLine("You got away safely!");
    })
}
/*
############
# Text Box #
############
*/
function textBox() {
    let txtbox = createDiv("textBox");
    document.body.appendChild(txtbox);
    pushTextLine(`A wild ${Pokemon.bayleef.name} appeared!`);
}

function pushTextLine(text) {
    textBoxLinesHandler(4);
    let msg = createMessage(text);
    document.getElementById("textBox").appendChild(msg);
}

function textBoxLinesHandler(lines) {
    let textbox = document.getElementById("textBox");
    if ( textbox.childElementCount > lines-1 ) {
        textbox.removeChild(textbox.firstChild);
    }
}