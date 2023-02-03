import { Sound } from '@pixi/sound'
import { Environment } from 'src/environment'

export const getSounds = (env: Environment) => {
  const sounds = {
    gui: {
      clicks: [Sound.from('assets/gui/sounds/click_02.mp3')],
      hovers: [Sound.from('assets/gui/sounds/roll_01.mp3')],
      createShapes: [
        Sound.from('assets/gui/sounds/create_shape_1.mp3'),
        Sound.from('assets/gui/sounds/create_shape_2.mp3'),
        Sound.from('assets/gui/sounds/create_shape_3.mp3'),
        Sound.from('assets/gui/sounds/create_shape_4.mp3'),
        Sound.from('assets/gui/sounds/create_shape_5.mp3'),
      ],
    },
  }

  const getRandomFromGroup = (sounds: Sound[]) => {
    return sounds[Math.floor(Math.random() * sounds.length)]
  }

  return {
    ...sounds,
    getRandomFromGroup,
  } as const
}
