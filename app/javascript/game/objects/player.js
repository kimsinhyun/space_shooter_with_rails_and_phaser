import Phaser from 'phaser';
import {KeyBoardInputComponent} from "game/components/input/keyboard-input-component";
import {HorizontalMovementComponent} from "game/components/movement/horizontal-movement-component";
// import {VerticalMovementComponent} from "game/components/movement/vertical-movement-component";
import * as CONFIG from 'game/config';
import {WeaponComponent} from "game/components/weapon/weapon-component";

export class Player extends Phaser.GameObjects.Container {
    #weaponComponent;
    #keyBoardInputComponent;
    #horizontalMovementComponent;
    #verticalMovementComponent;
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
        // this.#verticalMovementComponent = new VerticalMovementComponent(this, this.#keyBoardInputComponent, CONFIG.PLAYER_MOVEMENT_HORIZONTAL_VELOCITY);
        this.#weaponComponent = new WeaponComponent(this, this.#keyBoardInputComponent,{
            speed: CONFIG.PLAYER_BULLET_SPEED,
            lifespan: CONFIG.PLAYER_BULLET_LIFESPAN,
            interval: CONFIG.PLAYER_BULLET_INTERVAL,
            maxCount: CONFIG.PLAYER_MAX_BULLET_COUNT,
            yOffset: -20,
            flipY: false
        });

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
        // this.#verticalMovementComponent.update();
        // console.log(this.#keyBoardInputComponent.downIsDown)
        this.#weaponComponent.update(dt);
    }
}