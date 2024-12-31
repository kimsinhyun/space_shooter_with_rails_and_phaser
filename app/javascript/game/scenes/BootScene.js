import Phaser from 'phaser'

export default class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // this.load.pack('asset_pack', 'game/data/assets.json');
        this.load.json('animations_json', 'game/data/animations.json');
    }

    create() {
        console.log('BootScene created');
        this.scene.start("PreloadScene");
    }
}