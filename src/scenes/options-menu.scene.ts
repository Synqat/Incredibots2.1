import { Environment } from 'src/environment'
import { ButtonController } from 'src/controllers/button.controller'
import { Container, Sprite } from 'pixi.js'

export class OptionsMenuScene {
  stage = new Container()

  constructor(private env: Environment) {}

  onStart() {
    const bgGradient = new Sprite(this.env.textures.getTexture('bg_gradient_0'))

    bgGradient.width = this.env.app.screen.width
    bgGradient.height = this.env.app.screen.height

    bgGradient.tint = 0xce9e84

    this.stage.addChild(bgGradient)

    const buttons = [
      {
        text: 'Go Back',
        color: 0xf04f2f,
        onClick: () => {
          this.env.setScene('mainMenu')
        },
      },
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

  onUpdate() {}
}
