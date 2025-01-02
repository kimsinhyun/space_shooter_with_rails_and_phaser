import Phaser from 'phaser'
import {Player} from 'game/objects/player'
import {ScoutEnemy} from "game/objects/enemies/scout-enemy";
import {FighterEnemy} from "game/objects/enemies/fighter-enemy";
// 'game/objects/player'
export default class GameScene extends Phaser.Scene {
    #cursorKeys;

    constructor() {
        super({key: 'GameScene'});
    }

    preload() {
        this.load.pack('asset_pack', 'game/data/assets.json');
    }

    create() {
        console.log('GameScene created');
        const player = new Player(this);
        // const enemy = new ScoutEnemy(this, this.scale.width /2, 20);
        const enemy = new FighterEnemy(this, this.scale.width /2, 20);

        // Phaser 에서는 overlap 이랑 collide 두가지로 충돌을 처리할 수 있다.
        this.physics.add.overlap(player, enemy, (playerGameObject, enemyGameObject)=>{
            playerGameObject.colliderComponent.collideWithEnemyShip();
            enemyGameObject.colliderComponent.collideWithEnemyShip();
        });
        this.physics.add.overlap(player, enemy.weaponGameObjectGroup, (playerGameObject, projectileGameObject)=>{
            enemy.weaponComponent.destroyBullet(projectileGameObject);
            playerGameObject.colliderComponent.collideWithEnemyProjectile();
        });
        this.physics.add.overlap(enemy, player.weaponGameObjectGroup, (enemyGameObject, projectileGameObject)=>{
            player.weaponComponent.destroyBullet(projectileGameObject);
            enemyGameObject.colliderComponent.collideWithEnemyProjectile();
        });

    }
}