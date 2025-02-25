import { Application } from 'pixi.js'

import { Main, Resource } from './imports'

async function main() {
  await Resource.load()

  const renderer = new Application({
    antialias: true,
    width: window.innerWidth,
    height: window.innerHeight,
  })
  const main = new Main(renderer)

  const gameWrapper = document.getElementById('game_wrapper')
  if (gameWrapper) {
    gameWrapper.innerHTML = ''
    gameWrapper.appendChild(renderer.view)
  }
}

main()
