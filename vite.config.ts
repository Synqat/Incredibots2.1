import { UserConfig } from 'vite'

import tsconfigPaths from 'vite-tsconfig-paths'

export default {
  plugins: [tsconfigPaths()],
  assetsInclude: ['**/*.dat', '**/*.png', '**/*.mp3', '**/*.ttf'],
} satisfies UserConfig
