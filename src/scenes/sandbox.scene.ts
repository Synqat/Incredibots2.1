import { Environment } from 'src/environment'
import { Circle, Container, Sprite } from 'pixi.js'
import { DrawingController } from 'src/controllers/drawing.controller'
import { ButtonController } from 'src/controllers/button.controller'

export class SandboxScene {
  stage = new Container()

  drawing = new DrawingController(this.env, this.stage)

  constructor(private env: Environment) {}

  onStart() {
    const tools = [
      {
        text: 'Circle',
        color: 0xf04f2f,
        onClick: () => {
          this.drawing.shapeType = 'c'
        },
      },
      {
        text: 'Rectangle',
        color: 0xf04f2f,
        onClick: () => {
          this.drawing.shapeType = 'r'
        },
      },
    ]

    const bgGradient = new Sprite(this.env.textures.getTexture('bg_gradient_0'))

    bgGradient.width = this.env.app.screen.width
    bgGradient.height = this.env.app.screen.height

    bgGradient.tint = 0x5bbaf7

    this.stage.addChild(bgGradient)

    for (let i = 0; i < tools.length; i++) {
      const tool = tools[i]
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
          bgColor: tool.color,
          padding: [6, 8],
          text: tool.text.toUpperCase(),
          onHover: () => {
            this.env.sounds
              .getRandomFromGroup(this.env.sounds.gui.hovers)
              .play()
          },
          onClick: () => {
            this.env.sounds
              .getRandomFromGroup(this.env.sounds.gui.clicks)
              .play()
            tool.onClick()
          },
        },
      )

      this.stage.addChild(button.plane)
    }

    this.drawing.onCompleteDrawing = (shape) => {
      this.stage.addChild(shape)
      shape.interactive = true
      shape.cursor = 'pointer'
      let isDragging = false
      let shapeMouseX = 0
      let shapeMouseY = 0

      shape.on('pointerdown', (e) => {
        isDragging = true
        shapeMouseX = e.data.global.x - shape.x
        shapeMouseY = e.data.global.y - shape.y
      })
      shape.on('pointerup', (e) => {
        isDragging = false
      })
      shape.on('pointerupoutside', (e) => {
        isDragging = false
      })
      shape.on('pointermove', (e) => {
        if (isDragging) {
          shape.x = e.data.global.x - shapeMouseX
          shape.y = e.data.global.y - shapeMouseY
        }
      })
    }

    this.env.ticker.add(this.onUpdate, this)
  }

  onUpdate() {}
}
