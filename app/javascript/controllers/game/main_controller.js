import { Controller } from "@hotwired/stimulus"
import Phaser from 'phaser'
// import GameScene from '../../game/scenes/GameScene'
import GameScene from 'game/scenes/GameScene'
import PreloadScene from 'game/scenes/PreloadScene'
import BootScene from 'game/scenes/BootScene'

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
    }

    this.game = new Phaser.Game(config)

    this.game.scene.add('GameScene', GameScene)
    this.game.scene.add('PreloadScene', PreloadScene)
    this.game.scene.add('BootScene', BootScene)
    this.game.scene.start('BootScene')

    // try {
    //   this.game = new Phaser.Game(config)
    //   console.log('Game initialized successfully')
    // } catch (error) {
    //   console.error('Failed to initialize game:', error)
    // }
  }

  disconnect() {
    // 게임 정리 로직
    if (this.game) {
      this.game.destroy(true)
    }
  }
}