import { Environment } from 'src/environment'
import { Rectangle, Circle } from 'src/objects/shapes'
import {
  Rectangle as PixiRectangle,
  Circle as PixiCircle,
  Graphics,
  Sprite,
  Container,
  Point,
} from 'pixi.js'

export class DrawingController {
  shape: Graphics

  start = { x: 0, y: 0 }
  end = { x: 0, y: 0 }

  isDrawing = false
  isPreDrawing = false

  shapeType: 'r' | 'c' | null = null

  constructor(private env: Environment, private stage: Container) {
    this.env.app.stage.interactive = true

    this.shape = new Graphics()

    this.env.app.stage.on('pointerup', () => this.onPointerUp())
    this.env.app.stage.on('pointerdown', () => this.onPointerDown())
    this.env.app.stage.on('pointermove', () => this.onPointerMove())
  }

  getCursorPos() {
    return {
      ...(this.env.app.renderer.events as any).rootPointerEvent.global,
    }
  }

  onCompleteDrawing(shape: Graphics) {}

  onDraw(pos: { x: number; y: number }) {
    this.shape.x = this.start.x
    this.shape.y = this.start.y

    this.shape.clear()

    if (this.shapeType === 'r') {
      this.shape.beginFill(0xfd422a)
      this.shape.lineStyle(4, 0x9a2819)
      this.shape.drawRect(0, 0, pos.x - this.start.x, pos.y - this.start.y)
      this.shape.endFill()
    } else {
      this.shape.beginFill(0xfd422a)
      this.shape.lineStyle(4, 0x9a2819)
      this.shape.drawCircle(
        0,
        0,
        Math.sqrt(
          Math.pow(pos.x - this.start.x, 2) + Math.pow(pos.y - this.start.y, 2),
        ),
      )
      this.shape.endFill()

      const angle = 15
      const radius = Math.sqrt(
        Math.pow(pos.x - this.start.x, 2) + Math.pow(pos.y - this.start.y, 2),
      )
      const center = new Point(0, 0)

      const cursorAngleDegrees = Math.atan2(
        pos.y - this.start.y,
        pos.x - this.start.x,
      )

      for (let i = 0; i < 360 / angle; i++) {
        const angleRadians = (angle * i * Math.PI) / 180 + cursorAngleDegrees
        const x = center.x + radius * Math.cos(angleRadians)
        const y = center.y + radius * Math.sin(angleRadians)

        this.shape.lineStyle(2, 0x9a2819)
        this.shape.moveTo(x, y)
        this.shape.lineTo(
          x - (radius / 10) * Math.cos(angleRadians),
          y - (radius / 10) * Math.sin(angleRadians),
        )
      }
    }

    this.stage.addChild(this.shape)
  }

  onPointerUp() {
    if (this.isPreDrawing && !this.isDrawing) {
      this.isPreDrawing = false
      this.shapeType = null
    } else if (this.isDrawing) {
      this.isDrawing = false
      this.isPreDrawing = false
      this.end = this.getCursorPos()

      this.onDraw(this.end)

      const shape = this.shape.clone()

      shape.x = this.start.x
      shape.y = this.start.y

      this.onCompleteDrawing(shape)

      this.env.sounds
        .getRandomFromGroup(this.env.sounds.gui.createShapes)
        .play()

      this.stage.removeChild(this.shape)
      this.shape = new Graphics()
      this.shapeType = null
    }
  }

  onPointerDown() {
    if (!this.shapeType) {
      return
    }
    this.isPreDrawing = true
  }

  onPointerMove() {
    if (this.isPreDrawing) {
      if (!this.isDrawing) {
        this.start = this.getCursorPos()
        this.onDraw(this.start)
        this.isDrawing = true
      }

      this.onDraw(this.getCursorPos())
    }
  }
}
