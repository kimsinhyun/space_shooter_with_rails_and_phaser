import Phaser from 'phaser'
import {Player} from 'game/objects/player'
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


    }

    // update() {
    //     console.log(this.#cursorKeys.up.isDown, this.#cursorKeys.down.isDown, this.#cursorKeys.left.isDown, this.#cursorKeys.right.isDown);
    // }
}