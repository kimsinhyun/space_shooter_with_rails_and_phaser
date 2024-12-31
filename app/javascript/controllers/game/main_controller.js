import { Controller } from "@hotwired/stimulus"
import Phaser from 'phaser'

// GameScene 클래스 정의
class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    console.log('GameScene preload');
  }

  create() {
    console.log('GameScene created');
    this.add
        .text(this.scale.width / 2, this.scale.height / 2, 'Hello World', {
          fontSize: '32px',
        })
        .setOrigin(0.5);
  }
}

// Stimulus 컨트롤러
export default class extends Controller {
  connect() {
    console.log('Game controller connected')
    this.initGame()
  }

  initGame() {
    const config = {
      type: Phaser.CANVAS,
      // type: Phaser.AUTO,
      parent: 'game-container',
      roundPixels: true,
      pixelArt: true,
      scale: {
        parent: this.element,  // Stimulus 타겟 엘리먼트를 부모로 설정
        width: 450,
        height: 640,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
        // mode: Phaser.Scale.FIT,
      },
      backgroundColor: '#000000',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0, x: 0 },
          debug: true,
        },
      },
      scene: GameScene,
    }

    // this.game = new Phaser.Game(config)
    // this.game.scene.add('GameScene', GameScene)
    // this.game.scene.start('GameScene')

    try {
      this.game = new Phaser.Game(config)
      console.log('Game initialized successfully')
    } catch (error) {
      console.error('Failed to initialize game:', error)
    }
  }

  disconnect() {
    // 게임 정리 로직
    if (this.game) {
      this.game.destroy(true)
    }
  }
}