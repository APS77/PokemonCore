import { inBattle } from './battleMain.js';

const battleMusicSrc = new Audio("/audio/burning-battlefield-battle-theme.mp3"),
    routeMusicSrc = new Audio("/audio/pokemon-anime-bgm-route-3.mp3");

function routeMusic() {
    if (!inBattle) {
        routeMusicSrc.play();
    } else {
        routeMusicSrc.pause();
        routeMusicSrc.currentTime = 0;
    }
    routeMusicSrc.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
}

function battleMusic() {
    if (inBattle) {
        battleMusicSrc.play();
    } else {
        battleMusicSrc.pause();
        battleMusicSrc.currentTime = 0;
    }
    battleMusicSrc.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
}

export default {
    battleMusic,
    routeMusic
}