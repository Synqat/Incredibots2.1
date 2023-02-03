import { Assets } from '@pixi/assets'
import { Environment } from 'src/environment'
import { GlobalEvents } from 'src/utils/events'
import { MIPMAP_MODES, SCALE_MODES, Texture } from 'pixi.js'

export const getTextures = (env: Environment) => {
  Assets.add('bg_gradient_0', 'assets/gui/bg_gradient_0.png')

  Assets.add('cloud_0', 'assets/gui/cloud_0.png')

  Assets.add('gui_button_0', 'assets/gui/gui_button_0.png')
  Assets.add('gui_button_0_hover', 'assets/gui/gui_button_0_hover.png')
  Assets.add('gui_button_0_pressed', 'assets/gui/gui_button_0_pressed.png')

  Promise.all([
    Assets.load('bg_gradient_0'),

    Assets.load('cloud_0'),

    Assets.load('gui_button_0'),
    Assets.load('gui_button_0_hover'),
    Assets.load('gui_button_0_pressed'),
  ])
    .then(() => env.emit(GlobalEvents.LoadTextures))
    .catch((err) => env.emit(GlobalEvents.Error, err))

  return {
    getTexture(name: string) {
      const texture = Assets.cache.get<Texture>(name)

      texture.baseTexture.anisotropicLevel = 0
      texture.baseTexture.mipmap = MIPMAP_MODES.OFF
      texture.baseTexture.scaleMode = SCALE_MODES.NEAREST

      return texture
    },
  }
}
