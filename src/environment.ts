import { getApp } from 'src/utils/app'
import { getTextures } from 'src/utils/textures'
import { EventEmitter } from 'events'
import { GlobalEvents } from 'src/utils/events'
import { ButtonController } from 'src/controllers/button.controller'
import { getFonts } from 'src/utils/fonts'
import { getSounds } from 'src/utils/sounds'
import { BitmapText, Ticker } from 'pixi.js'
import { MainMenuScene } from 'src/scenes/main-menu.scene'
import { SandboxScene } from 'src/scenes/sandbox.scene'
import { OptionsMenuScene } from 'src/scenes/options-menu.scene'

export class Environment extends EventEmitter {
  app = getApp(this)
  fonts = getFonts(this)
  sounds = getSounds(this)
  textures = getTextures(this)

  ticker = Ticker.shared

  scenes = {
    optionsMenu: new OptionsMenuScene(this),
    mainMenu: new MainMenuScene(this),
    sandbox: new SandboxScene(this),
  }

  readonly LOAD_REQUIREMENTS = [
    GlobalEvents.LoadTextures,
    GlobalEvents.LoadFonts,
  ]

  loaded: typeof this.LOAD_REQUIREMENTS = []

  constructor(private gameWrapperElement: HTMLElement) {
    super()

    this.gameWrapperElement.appendChild(this.app.view as HTMLCanvasElement)

    this.ticker.autoStart = false
    this.ticker.stop()

    const onLoadRequirement =
      (event: (typeof this.LOAD_REQUIREMENTS)[number]) => () => {
        this.loaded.push(event)

        console.log('onLoadRequirement', event)

        if (this.loaded.length === this.LOAD_REQUIREMENTS.length) {
          this.onLoad()
        }
      }

    this.once(GlobalEvents.LoadFonts, onLoadRequirement(GlobalEvents.LoadFonts))
    this.once(
      GlobalEvents.LoadTextures,
      onLoadRequirement(GlobalEvents.LoadTextures),
    )

    this.on(GlobalEvents.Error, () => {})
  }

  onLoad() {
    this.setScene('sandbox')
    this.ticker.start()
  }

  setScene(sceneName: keyof typeof this.scenes) {
    const scene = this.scenes[sceneName]
    scene.onStart()
    this.app.stage.children.map((child) => this.app.stage.removeChild(child))
    this.app.stage.addChild(scene.stage)
  }
}
