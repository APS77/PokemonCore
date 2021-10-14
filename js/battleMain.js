import Pokemon from "./Pokemon/PokemonsAPI.js";
import Attack from "./attack_class.js";
import { startAnimating } from "./script.js";
import Music from "./audio.js";

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
    Music.routeMusic();
    Music.battleMusic();
    let sect = createSection("container", "container");
    document.body.appendChild(sect);
    let enemyPokemon = Pokemon.bayleef,
        playerPokemon = player.pokemons[0];
    drawBattle(playerPokemon.sprites, enemyPokemon.sprites);
    battleHeader(playerPokemon, enemyPokemon);
    battleMenu(player, playerPokemon, enemyPokemon); // Html Battle Buttons menu
    textBox();
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
function battleHeader(playerPokemon, enemyPokemon) {
    if ( !document.getElementById("battleHeader") ) {
        let div = createDiv("battleHeader");
        document.getElementsByClassName("container")[0].appendChild(div);
    }
    playerPkmnInfo(playerPokemon);
    wildPkmnInfo(enemyPokemon);
}

function playerPkmnInfo(playerPokemon) {
    let pkmn1 = createDiv("playerPkmnInfo");
    pkmn1.className = "pokemonInfo";
    document.getElementById("battleHeader").appendChild(pkmn1);
    showPlayerPkmnName(playerPokemon);
    showPlayerPkmnHP(playerPokemon);
}

function wildPkmnInfo(enemyPokemon) {
    let pkmn2 = createDiv("wildPkmnInfo");
    pkmn2.className = "pokemonInfo";
    document.getElementById("battleHeader").appendChild(pkmn2);
    showWildPkmnName(enemyPokemon);
    showWildPkmnHP(enemyPokemon);
}

function showPlayerPkmnName(playerPokemon) {
    let msg = createMessage(playerPokemon.name);
    document.getElementById("playerPkmnInfo").appendChild(msg);
}

function showWildPkmnName(enemyPokemon) {
    let msg = createMessage(enemyPokemon.name);
    document.getElementById("wildPkmnInfo").appendChild(msg);
}

function showPlayerPkmnHP(playerPokemon) {
    let msg = createMessage("HP: "+ playerPokemon.currentHP + "/" + playerPokemon.baseStats.HP);
    document.getElementById("playerPkmnInfo").appendChild(msg);
}

function showWildPkmnHP(enemyPokemon) {
    let msg = createMessage("HP: "+ enemyPokemon.currentHP + "/" + enemyPokemon.baseStats.HP);
    document.getElementById("wildPkmnInfo").appendChild(msg);
}
/*
###################
### Battle menu ###
###################
*/
function battleMenu(player, playerPokemon, enemyPokemon) {
    let div = createDiv("battleMenu");
    document.getElementsByClassName("container")[0].appendChild(div);
    let msg = createMessage(`What should ${playerPokemon.name} do?`);
    document.getElementById("battleMenu").appendChild(msg);
    let sect = createSection("battleMain","battleButtons");
    document.getElementById("battleMenu").appendChild(sect);
    attackButton(player, playerPokemon, enemyPokemon);
    runAwayButton(player, playerPokemon, enemyPokemon);
}

function attackButton(player, playerPokemon, enemyPokemon) {
    let btn = createButton("Attack");
    btn.addEventListener("click", function () {
        console.log("Clicked on Attack!");
        clearBox("battleMenu");
        let div = createDiv("attackMenu");
        document.getElementById("battleMenu").appendChild(div);
        let msg = createMessage("Choose your move:");
        document.getElementById("attackMenu").appendChild(msg);
        showPokemonAttacks(player);
        backButton(player, playerPokemon, enemyPokemon);

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
        if ( speedCheck (playerPokemon, Pokemon.bayleef) ) {
            damageDealer(i, player, playerPokemon, Pokemon.bayleef);
            enemyPokemonDamageDealer(player, playerPokemon, Pokemon.bayleef);
        } else {
            enemyPokemonDamageDealer(player, playerPokemon, Pokemon.bayleef);
            damageDealer(i, player, playerPokemon, Pokemon.bayleef);
        }
        battleChecker(player, playerPokemon, Pokemon.bayleef);
    });
    document.getElementById("attackButtons").appendChild(btn);
}

function speedCheck(playerPokemon, enemyPokemon) {
    if (playerPokemon.baseStats.SPEED >= enemyPokemon.baseStats.SPEED) {
        return true;
    } else {
        return false;
    }
}

function damageDealer(i, player, playerPokemon, enemyPokemon) {
    clearBox("battleHeader");
    pushTextLine(`${playerPokemon.name} used ${playerPokemon.attacks[i].name}!`);
    damageCalc(i, playerPokemon, enemyPokemon);
    battleHeader(playerPokemon, enemyPokemon);
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
    pushTextLine(`${enemyPokemon.name} used ${enemyPokemon.attacks[randomIndex].name}!`);
    damageCalc(randomIndex, enemyPokemon, playerPokemon);
    battleHeader(playerPokemon, enemyPokemon);
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
    // Deactivate Users Attacks inputs
    inBattle = false;
    Music.battleMusic();
    Music.routeMusic();
    clearBattleHTML();
    playerPokemon.currentHP = playerPokemon.baseStats.HP;
    enemyPokemon.currentHP = enemyPokemon.baseStats.HP;
    player.activate();
    startAnimating(30);
}

function clearBattleHTML() {
    document.getElementsByClassName("container")[0].remove();
    document.getElementById("textBox").remove();
}
// Back
function backButton(player, playerPokemon, enemyPokemon) {
    let btn = createButton("Back");
    btn.addEventListener("click", function () {
        console.log("Clicked on Back!");
        resetBattleMenu(player, playerPokemon, enemyPokemon);
    })
    document.getElementById("battleMenu").appendChild(btn);
}

function resetBattleMenu(player, playerPokemon, enemyPokemon) {
    document.getElementById("battleHeader").remove();
    document.getElementById("battleMenu").remove();
    battleHeader(player);
    battleMenu(player, playerPokemon, enemyPokemon);
}
// Run Away
function runAwayButton(player, playerPokemon, enemyPokemon) {
    let btn = createButton("Run Away");
    document.getElementById("battleButtons").appendChild(btn);
    btn.addEventListener("click", function () {
        pushTextLine("You got away safely!");
        setTimeout(function() {endBattle(player, playerPokemon, enemyPokemon);}, 2000);
    })
}