import Phaser from 'phaser';
import * as CONFIG from 'game/config';
import {VerticalMovementComponent} from "game/components/movement/vertical-movement-component";
import {BotFighterInputComponent} from "game/components/input/bot-fighter-input-component";
import {WeaponComponent} from "game/components/weapon/weapon-component";
import {HealthComponent} from "game/components/health/health-component";
import {ColliderComponent} from "game/components/collider/collider-component";

export class FighterEnemy extends Phaser.GameObjects.Container {
    #InputComponent;
    #verticalMovementComponent;
    #healthComponent;
    #colliderComponent;
    #weaponComponent;
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

        this.#shipSprite = scene.add.sprite(0, 0, "fighter", 0);
        this.#shipEngineSprite = scene.add.sprite(0, 0, "fighter_engine").setFlipY(true);
        this.#shipEngineSprite.play("fighter_engine");
        this.add([this.#shipEngineSprite, this.#shipSprite]);

        this.#InputComponent = new BotFighterInputComponent(this.scene);
        this.#verticalMovementComponent = new VerticalMovementComponent(this, this.#InputComponent, CONFIG.ENEMY_FIGHTER_MOVEMENT_VERTICAL_VELOCITY);
        this.#weaponComponent = new WeaponComponent(this, this.#InputComponent,{
            speed: CONFIG.ENEMY_BULLET_SPEED,
            lifespan: CONFIG.ENEMY_BULLET_LIFESPAN,
            interval: CONFIG.ENEMY_BULLET_INTERVAL,
            maxCount: CONFIG.ENEMY_MAX_BULLET_COUNT,
            yOffset: 20,
            flipY: true
        });
        this.#healthComponent = new HealthComponent(this, CONFIG.ENEMY_FIGHTER_HEALTH);
        this.#colliderComponent = new ColliderComponent(this.#healthComponent);

        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
        this.once(
            Phaser.GameObjects.Events.DESTROY,
            () => {
                this.scene.events.off(Phaser.Scene.Events.UPDATE, this.update, this);
            }, this
        );
    }

    get weaponGameObjectGroup(){
        return this.#weaponComponent.bulletGroup;
    }

    get weaponComponent(){
        return this.#weaponComponent
    }

    get healthComponent(){
        return this.#healthComponent;
    }

    get colliderComponent() {
        return this.#colliderComponent;
    }


    update(ts, dt) {
        if(!this.active) return;
        if(this.#healthComponent.isDead){
            this.setActive(false);
            this.setVisible(false);
        }
        this.#InputComponent.update();
        this.#verticalMovementComponent.update();
        this.#weaponComponent.update(dt);
        // this.#horizontalMovementComponent.update();
        // console.log(this.#keyBoardInputComponent.downIsDown)
    }
}