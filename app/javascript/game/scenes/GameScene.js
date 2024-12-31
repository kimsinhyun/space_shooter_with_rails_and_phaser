import Phaser from 'phaser'
import {Player} from 'game/objects/player'
// 'game/objects/player'
export default class GameScene extends Phaser.Scene {
    constructor() {
        super({key: 'GameScene'});
    }

    preload() {
        this.load.pack('asset_pack', 'game/data/assets.json');
    }

    create() {
        console.log('GameScene created');
        const player = new Player(this);
    }
}