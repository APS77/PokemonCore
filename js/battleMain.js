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

// BATTLE MAIN ------------------------------------------------------------------------------------------

// Attacks
Pokemon.furret.attacks.push(Attack.scratch);
Pokemon.furret.attacks.push(Attack.slam);
Pokemon.furret.attacks.push(Attack.tackle);
Pokemon.furret.attacks.push(Attack.fire_punch);

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
    textBox();
    battleHeader(player);
    battleMenu(player); // Html Battle Buttons menu
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
############
# Text Box #
############
*/
function textBox() {
    let txtbox = createDiv("textBox");
    document.body.appendChild(txtbox);
    pushTextLine(`A wild ${Pokemon.bayleef.name} appeared!`);
    pushTextLine("---");
    pushTextLine("---");
    pushTextLine("---");
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
    runAwayButton(player);
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
        backButton(player);

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
    clearBattleHTML();
    Pokemon.bayleef.currentHP = Pokemon.bayleef.baseStats.HP;
    inBattle = false;
    player.activate();
    startAnimating(30);
}

function clearBattleHTML() {
    document.getElementById("textBox").remove();
    document.getElementById("battleHeader").remove();
    document.getElementById("battleMenu").remove();
}
// Back
function backButton(player) {
    let btn = createButton("Back");
    btn.addEventListener("click", function () {
        console.log("Clicked on Back!");
        resetBattleMenu(player);
    })
    document.getElementById("battleMenu").appendChild(btn);
}

function resetBattleMenu(player) {
    document.getElementById("battleHeader").remove();
    document.getElementById("battleMenu").remove();
    battleHeader(player);
    battleMenu(player);
}
// Run Away
function runAwayButton(player) {
    let btn = createButton("Run Away");
    document.getElementById("battleMenu").appendChild(btn);
    btn.addEventListener("click", function () {
        pushTextLine("You got away safely!");
        setTimeout(function() {endBattle(player);}, 2000);
    })
}