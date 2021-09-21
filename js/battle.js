//let canvasBattle = document.getElementById("battle");
//let context = canvas.getContext("2d");

//canvasBattle.height = 400;
//canvasBattle.width = 760;

const battlePathBG = "img/battle/battle3.png";
export const pkmn1 = new Image();
pkmn1.src = "img/pokemons/back/b_bw_162.png"
export const pkmn2 = new Image();
pkmn2.src = "img/pokemons/front/spr_bw_157.png"

export function createBattle (ctx, cvs) {
    //player.deactivateMove();
    // imagenFondo.src = battlePathBG;
    ctx.drawImage(battleBG, 0, 0, cvs.width, cvs.height);
    ctx.drawImage(pkmn1, 120, 130, 250, 250);
    ctx.drawImage(pkmn2, 420, 60, 180, 180);
}