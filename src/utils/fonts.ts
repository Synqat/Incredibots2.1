import { Assets } from '@pixi/assets'
import { Environment } from 'src/environment'
import { GlobalEvents } from 'src/utils/events'
import { BitmapFont } from 'pixi.js'

export const getFonts = (env: Environment) => {
  Assets.add('pixellari', 'assets/gui/fonts/pixellari.fnt')
  Assets.add('gameboy', 'assets/gui/fonts/gameboy.fnt')

  Promise.all([Assets.load('pixellari'), Assets.load('gameboy')])
    .then(() => env.emit(GlobalEvents.LoadFonts))
    .catch((err) => env.emit(GlobalEvents.Error, err))

  return {
    getFont(name: string) {
      Assets.cache.get<BitmapFont>(name)
    },
  }
}
