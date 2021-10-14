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

// Furret Attacks
Pokemon.furret.attacks.push(Attack.scratch);
Pokemon.furret.attacks.push(Attack.slam);
Pokemon.furret.attacks.push(Attack.tackle);
Pokemon.furret.attacks.push(Attack.fire_punch);

// Bayleef Attacks
Pokemon.bayleef.attacks.push(Attack.tackle);
Pokemon.bayleef.attacks.push(Attack.razor_leaf);

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
    let sect = createSection("container", "container");
    document.body.appendChild(sect);
    drawBattle(player.pokemons[0].sprites, Pokemon.bayleef.sprites);
    textBox();
    battleHeader(player);
    battleMenu(player); // Html Battle Buttons menu
}

function createSection(className, ID) {
    let sect = document.createElement("section");
    sect.className = className;
    sect.id = ID;
    return sect;
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

function drawBattleLose(pkmn2Sprites) {
    context.drawImage(battleBG, 0, 0, canvas.width, canvas.height);
    context.drawImage(pkmn2Sprites.front, 410, 70, 200, 200);
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
        document.getElementsByClassName("container")[0].appendChild(div);
    }
    playerPkmnInfo(player);
    wildPkmnInfo();
}

function playerPkmnInfo(player) {
    let pkmn1 = createDiv("playerPkmnInfo");
    pkmn1.className = "pokemonInfo";
    document.getElementById("battleHeader").appendChild(pkmn1);
    showPlayerPkmnName(player);
    showPlayerPkmnHP(player);
}

function wildPkmnInfo() {
    let pkmn2 = createDiv("wildPkmnInfo");
    pkmn2.className = "pokemonInfo";
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
    document.getElementsByClassName("container")[0].appendChild(div);
    let msg = createMessage(`What should ${Pokemon.furret.name} do?`);
    document.getElementById("battleMenu").appendChild(msg);
    let sect = createSection("battleMain","battleButtons");
    document.getElementById("battleMenu").appendChild(sect);
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
    document.getElementById("battleButtons").appendChild(btn);
}

function showPokemonAttacks(player) {
    let sect = createSection("attacks","attackButtons");
    document.getElementById("attackMenu").appendChild(sect);
    for (let i = 0; i < 4; i++) {
        showAttackBtn(i, player, player.pokemons[0]);
    }
}
function showAttackBtn(i, player, playerPokemon) {
    let btn = createButton(playerPokemon.attacks[i].name);
    btn.addEventListener("click", function () {
        pushTextLine(`${playerPokemon.name} used ${playerPokemon.attacks[i].name}!`);
        damageDealer(i, player, playerPokemon, Pokemon.bayleef);
        enemyPokemonDamageDealer(player, playerPokemon, Pokemon.bayleef);
        battleChecker(player, playerPokemon, Pokemon.bayleef);
    });
    document.getElementById("attackButtons").appendChild(btn);
}

function damageDealer(i, player, playerPokemon, enemyPokemon) {
    clearBox("battleHeader");
    damageCalc(i, playerPokemon, enemyPokemon);
    battleHeader(player);
}

function damageCalc(i, pokemon1, pokemon2) {
    if (pokemon2.currentHP - pokemon1.attacks[i].power < 0) {
        pushTextLine(`The attack did ${pokemon2.currentHP} damage`);
        pokemon2.currentHP = 0;
    } else {
        pokemon2.currentHP -= pokemon1.attacks[i].power;
        pushTextLine(`The attack did ${pokemon1.attacks[i].power} damage`);
    }
}

function getRandomAttackId(enemyPokemon) {
    let randomAttackId = Math.floor(Math.random() * enemyPokemon.attacks.length);
    return randomAttackId;
}

function enemyPokemonDamageDealer(player, playerPokemon, enemyPokemon) {
    clearBox("battleHeader");
    let randomIndex = getRandomAttackId(enemyPokemon);
    console.log(enemyPokemon.attacks[randomIndex]);
    pushTextLine(`${enemyPokemon.name} used ${enemyPokemon.attacks[randomIndex].name}!`);
    damageCalc(randomIndex, enemyPokemon, playerPokemon);
    battleHeader(player);
}

function battleChecker(player, playerPokemon, enemyPokemon) {
    if (enemyPokemon.currentHP == 0) {
        pushTextLine("foe " + enemyPokemon.name + " fainted!");
        pushTextLine("You won the battle!");
        drawBattleWin(playerPokemon.sprites);
        setTimeout(function() {endBattle(player, playerPokemon, enemyPokemon);}, 2000);
        console.log("Battle Ended!!");
    } else if (playerPokemon.currentHP == 0) {
        pushTextLine(playerPokemon.name + " fainted!");
        pushTextLine("You lose the battle!");
        drawBattleLose(enemyPokemon.sprites);
        setTimeout(function() {endBattle(player, playerPokemon, enemyPokemon);}, 2000);
    }
}

function endBattle (player, playerPokemon, enemyPokemon) {
    clearBattleHTML();
    playerPokemon.currentHP = playerPokemon.baseStats.HP;
    enemyPokemon.currentHP = enemyPokemon.baseStats.HP;
    inBattle = false;
    player.activate();
    startAnimating(30);
}

function clearBattleHTML() {
    document.getElementsByClassName("container")[0].remove();
    document.getElementById("textBox").remove();
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
    document.getElementById("battleButtons").appendChild(btn);
    btn.addEventListener("click", function () {
        pushTextLine("You got away safely!");
        setTimeout(function() {endBattle(player);}, 2000);
    })
}