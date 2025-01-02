export class ColliderComponent {
    #healthComponent;

    constructor(lifeComponent) {
        this.#healthComponent = lifeComponent;
    }

    collideWithEnemyShip() {
        if (this.#healthComponent.isDead) return;
        this.#healthComponent.die();
    }

    collideWithEnemyProjectile() {
        if (this.#healthComponent.isDead) return;
        this.#healthComponent.hit();
    }
}