import { inBattle } from './battleMain.js';

const townMusicSrc = new Audio("/audio/bg1.mp3"),
    battleMusicSrc = new Audio("/audio/burning-battlefield-battle-theme.mp3"),
    routeMusicSrc = new Audio("/audio/pokemon-anime-bgm-route-3.mp3");

function routeMusic() {
    if (!inBattle) {
        routeMusicSrc.play();
    } else {
        routeMusicSrc.pause();
        routeMusicSrc.currentTime = 0;
    }
}

function battleMusic() {
    if (inBattle) {
        battleMusicSrc.play();
    } else {
        battleMusicSrc.pause();
        battleMusicSrc.currentTime = 0;
    }
}

export default {
    battleMusic,
    routeMusic
}