import { Environment } from 'src/environment'
import { ButtonController } from 'src/controllers/button.controller'
import { Container, Sprite } from 'pixi.js'

export class MainMenuScene {
  stage = new Container()

  clouds: [number, Sprite][] = []

  constructor(private env: Environment) {}

  onStart() {
    const bgGradient = new Sprite(this.env.textures.getTexture('bg_gradient_0'))

    bgGradient.width = this.env.app.screen.width
    bgGradient.height = this.env.app.screen.height

    bgGradient.tint = 0x5bbaf7

    this.stage.addChild(bgGradient)

    const createCloud = () => {
      const sprite = new Sprite(this.env.textures.getTexture('cloud_0'))
      sprite.anchor.set(0.5)
      sprite.x = Math.random() * this.env.app.screen.width

      const scale = Math.random() * 4 + 4

      sprite.scale.set(scale)
      sprite.y =
        Math.random() * this.env.app.screen.height * 0.5 +
        this.env.app.screen.height * 0.5 -
        sprite.height

      this.stage.addChild(sprite)

      return sprite
    }

    const buttons = [
      {
        text: 'Start Game',
        color: 0x3ba7ff,
        onClick: () => {
          this.env.setScene('sandbox')
        },
      },
      {
        text: 'Options',
        color: 0xe0ab8f,
        onClick: () => {
          this.env.setScene('optionsMenu')
        },
      },
      {
        text: 'Credits',
        color: 0x316d7c,
        onClick: () => {},
      },
      {
        text: 'Exit',
        color: 0xf04f2f,
        onClick: () => {},
      },
    ]

    const maxSpeed = 0.4

    this.clouds = [
      [Math.random() * maxSpeed, createCloud()],
      [Math.random() * maxSpeed, createCloud()],
      [Math.random() * maxSpeed, createCloud()],
      [Math.random() * maxSpeed, createCloud()],
      [Math.random() * maxSpeed, createCloud()],
      [Math.random() * maxSpeed, createCloud()],
      [Math.random() * maxSpeed, createCloud()],
      [Math.random() * maxSpeed, createCloud()],
    ]

    for (let i = 0; i < buttons.length; i++) {
      const variant = buttons[i]
      const button = new ButtonController(
        [
          this.env.textures.getTexture('gui_button_0'),
          this.env.textures.getTexture('gui_button_0_hover'),
          this.env.textures.getTexture('gui_button_0_pressed'),
        ],
        {
          x: 64,
          y: 64 + i * (64 + 20),
          color: 0xf0f0f0,
          bgColor: variant.color,
          padding: [6, 8],
          text: variant.text.toUpperCase(),
          onHover: () => {
            this.env.sounds
              .getRandomFromGroup(this.env.sounds.gui.hovers)
              .play()
          },
          onClick: () => {
            this.env.sounds
              .getRandomFromGroup(this.env.sounds.gui.clicks)
              .play()
            variant.onClick()
          },
        },
      )

      this.stage.addChild(button.plane)
    }

    this.env.ticker.add(this.onUpdate, this)
  }

  onUpdate() {
    for (const [speed, cloud] of this.clouds) {
      cloud.x += speed

      if (cloud.x > this.env.app.screen.width + cloud.width) {
        cloud.x = -cloud.width
      }
    }
  }
}
