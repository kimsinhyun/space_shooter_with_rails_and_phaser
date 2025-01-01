import Phaser from 'phaser';
import * as CONFIG from 'game/config';
import {BotScoutInputComponent} from "game/components/input/bot-scout-input-component";
import {VerticalMovementComponent} from "game/components/movement/vertical-movement-component";

export class ScoutEnemy extends Phaser.GameObjects.Container {
    #InputComponent;
    #verticalMovementComponent;
    #shipSprite;
    #shipEngineSprite;

    constructor(scene, x, y) {
        super(scene, x, y, []);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setSize(24, 24);
        this.body.setOffset(-12, -12);
        // this.body.setCollideWorldBounds(true);
        this.setDepth(2);

        this.#shipSprite = scene.add.sprite(0, 0, "scout", 0);
        this.#shipEngineSprite = scene.add.sprite(0, 0, "scout_engine").setFlipY(true);
        this.#shipEngineSprite.play("scout_engine");
        this.add([this.#shipEngineSprite, this.#shipSprite]);

        this.#InputComponent = new BotScoutInputComponent(this.scene);
        this.#verticalMovementComponent = new VerticalMovementComponent(this, this.#InputComponent, CONFIG.ENEMY_SCOUT_MOVEMENT_VERTICAL_VELOCITY);

        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
        this.once(
            Phaser.GameObjects.Events.DESTROY,
            () => {
                this.scene.events.off(Phaser.Scene.Events.UPDATE, this.update, this);
            }, this
        );
    }

    update(ts, dt) {
        // console.log(ts, dt);
        this.#InputComponent.update();
        this.#verticalMovementComponent.update();
        // this.#horizontalMovementComponent.update();
        // console.log(this.#keyBoardInputComponent.downIsDown)
    }
}