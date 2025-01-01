import {InputComponent} from "game/components/input/input-component"
import * as CONFIG from 'game/config';

export class BotScoutInputComponent extends InputComponent {
    #gameObject;
    #startX;
    #maxXMovement;

    constructor(gameObject) {
        super();
        this.#gameObject = gameObject;
        this.#startX = this.#gameObject.x;
        this.#maxXMovement = CONFIG.ENEMY_SCOUT_MOVEMENT_MAX_X
        this._right = true;
        this._down = true;
        this._left = false;
    }

    update(){
        if(this.#gameObject.x > this.#startX + this.#maxXMovement){
            this._right = false;
            this._left = true;
        }
        if(this.#gameObject.x < this.#startX - this.#maxXMovement){
            this._right = true;
            this._left = false;
        }
    }
}