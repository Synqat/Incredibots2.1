import { Container } from 'pixi.js'
import { Environment } from 'src/environment'

export class GameObject extends Container {
  constructor(private env: Environment, private stage: Container) {
    super()
    this.stage.addChild(this)
  }
}
