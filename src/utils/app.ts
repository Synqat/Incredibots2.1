import { Application } from 'pixi.js'
import { Environment } from 'src/environment'
import { DEFAULT_GAME_BACKGROUND_COLOR } from 'src/constants'

export const getApp = (env: Environment) => {
  const app = new Application({
    width: window.innerWidth,
    height: window.innerHeight,
    antialias: true,
    resolution: 1,
    backgroundColor: DEFAULT_GAME_BACKGROUND_COLOR,
  })

  app.resizeTo = window

  return app
}
