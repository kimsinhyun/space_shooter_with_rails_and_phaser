import Phaser from 'phaser'

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({key: 'PreloadScene'});
    }

    preload() {
        this.load.pack('asset_pack', 'game/data/assets.json');
    }

    create() {
        console.log('PreloadScene created');
        this.#createAnimations();
        this.scene.start("GameScene");
    }

    #createAnimations() {
        const animations = this.cache.json.get('animations_json');
        console.log(animations)
        animations.forEach(animation => {
            const frames = animation.frames
                ? this.anims.generateFrameNumbers(animation.assetKey, {frames: animation.frames})
                : this.anims.generateFrameNumbers(animation.assetKey);

            console.log(`frames : ${frames}`)

            this.anims.create(
                {
                    key: animation.key,
                    frames: frames,
                    frameRate: animation.frameRate,
                    repeat: animation.repeat,
                }
            );
        });
    }
}