import { BitmapText, NineSlicePlane, Texture } from 'pixi.js'

interface ButtonControllerProps {
  text: string

  onClick: () => void
  onHover: () => void

  x?: number
  y?: number

  color?: number
  bgColor?: number

  fontSize?: number

  padding?: [number, number]
}

export class ButtonController {
  plane: NineSlicePlane

  constructor(
    private nineSliceTextures: [Texture, Texture, Texture],
    private props: ButtonControllerProps,
  ) {
    const defaultButton = nineSliceTextures[0]
    const hoverButton = nineSliceTextures[1]
    const pressedButton = nineSliceTextures[2]

    const hoverPlane = new NineSlicePlane(hoverButton, 9, 9, 9, 9)
    this.plane = new NineSlicePlane(defaultButton, 8, 8, 8, 8)
    this.plane.interactive = true
    this.plane.onclick = props.onClick
    this.plane.cursor = 'pointer'

    this.plane.scale.set(4)

    this.plane.tint = props.bgColor ?? 0xffffff

    const bitmapText = new BitmapText(props.text, {
      fontName: 'Early GameBoy Regular',
      fontSize: 8,
      align: 'center',
      tint: props.color ?? 0xffffff,
    })

    bitmapText.scale.set(1)
    bitmapText.anchor.set(0.5)

    this.plane.position.set(props.x ?? 0, props.y ?? 0)

    this.plane.addChild(bitmapText)
    this.plane.addChild(hoverPlane)

    hoverPlane.visible = false

    const paddingX = props.padding?.[1] ?? 0
    const paddingY = props.padding?.[0] ?? 0

    this.plane.width = bitmapText.width + paddingX * 2
    this.plane.height = bitmapText.height + paddingY * 2

    hoverPlane.width = this.plane.width
    hoverPlane.height = this.plane.height

    hoverPlane.position.set(0, 0)

    bitmapText.position.set(this.plane.width / 2, this.plane.height / 2 - 1)

    this.plane.on('pointerover', () => {
      hoverPlane.visible = true
      this.props.onHover?.()
    })

    this.plane.on('pointerout', () => {
      hoverPlane.visible = false
    })

    this.plane.on('pointerout', () => {
      this.plane.texture = defaultButton
    })

    this.plane.on('pointerdown', () => {
      this.plane.texture = pressedButton

      hoverPlane.visible = false

      bitmapText.position.set(this.plane.width / 2, this.plane.height / 2 + 1)
    })

    this.plane.on('pointerup', () => {
      hoverPlane.visible = true
      this.plane.texture = defaultButton
      bitmapText.position.set(this.plane.width / 2, this.plane.height / 2 - 1)
    })
  }

  get view() {
    return this.plane
  }
}
