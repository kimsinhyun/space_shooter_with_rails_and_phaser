import {InputComponent} from "game/components/input/input-component"

export class KeyBoardInputComponent extends InputComponent {
    #cursorKeys;
    #inputLocked;

    constructor(scene) {
        super();
        this.#cursorKeys = scene.input.keyboard.createCursorKeys();
        this.#inputLocked = false;
    }

    set lockInput(value) {
        this.#inputLocked = value;
    }

    update() {
        if (this.#inputLocked) {
            this.reset();
            return
        }
        this._up = this.#cursorKeys.up.isDown;
        this._down = this.#cursorKeys.down.isDown;
        this._left = this.#cursorKeys.left.isDown;
        this._right = this.#cursorKeys.right.isDown;
    }
}