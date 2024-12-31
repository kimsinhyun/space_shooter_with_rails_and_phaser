import Phaser from 'phaser'

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        console.log('GameScene preload');
        this.load.pack('asset_pack', 'game/data/assets.json');
    }

    create() {
        console.log('GameScene created');
        this.add
            .text(this.scale.width / 2, this.scale.height / 2, 'Hello World', {
                fontSize: '32px',
            })
            .setOrigin(0.5);
        this.add.image(100, 100, "ship");
    }
}