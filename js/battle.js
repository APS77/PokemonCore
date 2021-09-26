const battleBG = new Image();
battleBG.src = "img/battle/battle3.png";
const pkmn1 = new Image();
pkmn1.src = "img/pokemons/back/b_bw_162.png"
const pkmn2 = new Image();
pkmn2.src = "img/pokemons/front/spr_bw_153.png"

export function createBattle (ctx, cvs) {
    //player.deactivate();
    imagenFondo.src = battlePathBG;
    ctx.drawImage(imagenFondo, 0, 0, cvs.width, cvs.height);
    ctx.drawImage(pkmn1, 120, 130, 250, 250);
    ctx.drawImage(pkmn2, 420, 60, 180, 180);
}