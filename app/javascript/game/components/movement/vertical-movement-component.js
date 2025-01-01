import * as CONFIG from 'game/config';

export class VerticalMovementComponent {
    #gameObject;
    #inputComponent;
    #velocity;

    constructor(gameObject, inputComponent, velocity) {
        this.#gameObject = gameObject;
        this.#inputComponent = inputComponent;
        this.#velocity = velocity;

        // 1. 추진력을 주면 계속 움직임 (관성)
        // 2. 매우 천천히 감속 (낮은 항력)
        // 3. 일정 속도 이상 가속되지 않음 (최대 속도)
        this.#gameObject.body.setDamping(true);      // 관성 효과 활성화
        this.#gameObject.body.setDrag(CONFIG.COMPONENT_MOVEMENT_VERTICAL_DRAG);         // 매우 큰 저항 (우주 환경)
        this.#gameObject.body.setMaxVelocity(CONFIG.COMPONENT_MOVEMENT_VERTICAL_MAX_VELOCITY);   // 최대 속도 제한
    }

    reset() {
        this.#gameObject.body.velocity.y = 0;
        this.#gameObject.body.setangularVelocity = 0;
    }

    update() {
        if (this.#inputComponent.downIsDown) {
            this.#gameObject.body.velocity.y += this.#velocity;
        } else if (this.#inputComponent.upIsDown) {
            this.#gameObject.body.velocity.y -= this.#velocity;
        } else {
            this.#gameObject.body.setAngularAcceleration(0);
        }
    }
}