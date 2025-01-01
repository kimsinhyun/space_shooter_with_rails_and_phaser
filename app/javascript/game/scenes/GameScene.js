import Phaser from 'phaser'
import {Player} from 'game/objects/player'
import {ScoutEnemy} from "game/objects/enemies/scout-enemy";
import {FighterEnemy} from "game/objects/enemies/fighter-enemy";
// 'game/objects/player'
export default class GameScene extends Phaser.Scene {
    #cursorKeys;

    constructor() {
        super({key: 'GameScene'});
    }

    preload() {
        this.load.pack('asset_pack', 'game/data/assets.json');
    }

    create() {
        console.log('GameScene created');
        const player = new Player(this);
        const enemy = new ScoutEnemy(this, this.scale.width /2, 20);
        // const enemy = new FighterEnemy(this, this.scale.width /2, 20);
    }
}