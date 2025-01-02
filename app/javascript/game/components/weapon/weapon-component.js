import Phaser from "phaser";

// import {Phaser} from "../../../../../vendor/javascript/phaser";

export class WeaponComponent {
    #gameObject;
    #inputComponent;
    #bulletGroup;
    #bulletConfig;
    #fireBulletInterval = 0;

    constructor(gameObject, inputComponent, bulletConfig) {
        this.#gameObject = gameObject;
        this.#inputComponent = inputComponent;
        this.#bulletConfig = bulletConfig;
        this.#bulletGroup = this.#gameObject.scene.physics.add.group({
            name: `bullet-${Phaser.Math.RND.uuid()}`,
            enable: false, // 필요하기 전까지는 false.
        });
        // 총알 풀을 만들어서 총알을 관리한다.
        this.#bulletGroup.createMultiple({
            key: 'bullet',
            quantity: this.#bulletConfig.maxCount,
            active: false,
            visible: false,
        })

        // 물리 연산이 수행될 때마다 발생하는 이벤트
        this.#gameObject.scene.physics.world.on(Phaser.Physics.Arcade.Events.WORLD_STEP, this.worldStep, this);
        this.#gameObject.once(
            Phaser.GameObjects.Events.DESTROY,
            () => {
                this.#gameObject.scene.physics.world.off(Phaser.Physics.Arcade.Events.WORLD_STEP, this.worldStep, this);
            }, this
        );
    }

    get bulletGroup() {
        return this.#bulletGroup;
    }

    update(dt) {
        this.#fireBulletInterval -= dt;
        if (this.#fireBulletInterval > 0) {
            return;
        }
        if (this.#inputComponent.shootIsDown) {
            const bullet = this.#bulletGroup.getFirstDead(); //PhysicsGroup 에서 비활성화된 첫번째 오브젝트를 가져온다.
            if (bullet === undefined || bullet === null) {
                return;
            }
            const x = this.#gameObject.x;
            const y = this.#gameObject.y + this.#bulletConfig.yOffset;
            // enableBody(active, x, y, show, show)
            // - 물리 바디 활성화
            // - 지정된 위치(x,y)로 이동
            // - 화면에 표시
            // - 충돌 감지 활성화
            bullet.enableBody(true, x, y, true, true);
            bullet.body.velocity.y -= this.#bulletConfig.speed;
            bullet.setState(this.#bulletConfig.lifespan);
            bullet.setState('bullet');
            bullet.setScale(0.8);
            bullet.body.setSize(14, 18);
            bullet.setFlipY(this.#bulletConfig.flipY);

            this.#fireBulletInterval = this.#bulletConfig.interval;
        }
    }

    worldStep(delta) {
        this.#bulletGroup.getChildren().forEach(bullet => {
            if (!bullet.active) {
                return
            }

            bullet.state -= delta;
            if (bullet.state <= 0) {
                bullet.disableBody(true, true); // 물리 바디 비활성화, 화면에서 제거
            }
        });
    }

    destroyBullet(bullet) {
        bullet.setState(0);
    }
}