import Music from "./audio.js";
import Pokemon from './Pokemon/PokemonsAPI.js';
import { Player } from "./Player.js";
import { BattleTile } from "./BattleTile.js";
import { inBattle } from './battleMain.js';
import Attack from "./Attack.js";

Music.routeMusic();

const config = {
    debug: false
};


let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let fpsInterval, startTime, now, then, elapsed;

canvas.height = 400;
canvas.width = 760;

// Images
const playerSprite = new Image(); // 128 x 192 ideal
playerSprite.src = "img/characters/p3.png";
const imagenFondo = new Image();
imagenFondo.src = "img/fondo.png";
const pasto = new Image();
pasto.src = "img/pasto.png";

// BattleTile Instance
let grass1 = new BattleTile (pasto);
grass1.setAttributes(50, 200, 40); //(x,y,ratio)

// Player Instance
let player = new Player (playerSprite);
player.setPosition(25, 65);
player.addPokemonToTheParty(Pokemon.furret);
// Furret Attacks
player.pokemons[0].attacks.push(Attack.scratch);
player.pokemons[0].attacks.push(Attack.slam);
player.pokemons[0].attacks.push(Attack.tackle);
player.pokemons[0].attacks.push(Attack.fire_punch);

function animate () {
    if (!inBattle) overWorld(animate);
}

function overWorld(animate) {
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if (elapsed <= fpsInterval) return;
    then = now - (elapsed % fpsInterval);
    context.drawImage(imagenFondo, 0, 0, canvas.width, canvas.height);
    grass1.drawTile();
    player.drawSprite();
    grass1.collisionDetect( player.getHitboxCoordinates() );
    grass1.battleLauncher(player);
    player.update();
    requestAnimationFrame(animate);
    debugIfItIsNecessary();
}

export function startAnimating (fps) {
    fpsInterval = 1000/fps;
    then = Date.now();
    startTime = then;
    animate();
}

function debugIfItIsNecessary() {
    if (!config.debug) return;
    grass1.showHitbox(context);
    player.showHitbox(context);
}

startAnimating(30);