import Phaser from 'phaser';
import {KeyBoardInputComponent} from "game/components/input/keyboard-input-component";
import {HorizontalMovementComponent} from "game/components/movement/horizontal-movement-component";
import * as CONFIG from 'game/config';

export class Player extends Phaser.GameObjects.Container {
    #keyBoardInputComponent;
    #horizontalMovementComponent;
    #shipSprite;
    #shipEngineSprite;
    #shipEngineThrusterSprite;

    constructor(scene) {
        super(scene, scene.scale.width / 2, scene.scale.height - 32, []);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setSize(24, 24);
        this.body.setOffset(-12, -12);
        this.body.setCollideWorldBounds(true);
        this.setDepth(2);

        this.#shipSprite = scene.add.sprite(0, 0, "ship");
        this.#shipEngineSprite = scene.add.sprite(0, 0, "ship_engine");
        this.#shipEngineThrusterSprite = scene.add.sprite(0, 0, "ship_engine_thruster");
        this.#shipEngineThrusterSprite.play("ship_engine_thruster");
        this.add([this.#shipEngineThrusterSprite, this.#shipEngineSprite, this.#shipSprite]);

        this.#keyBoardInputComponent = new KeyBoardInputComponent(this.scene);
        this.#horizontalMovementComponent = new HorizontalMovementComponent(this, this.#keyBoardInputComponent, CONFIG.PLAYER_MOVEMENT_HORIZONTAL_VELOCITY);

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
        this.#keyBoardInputComponent.update();
        this.#horizontalMovementComponent.update();
        // console.log(this.#keyBoardInputComponent.downIsDown)
    }
}