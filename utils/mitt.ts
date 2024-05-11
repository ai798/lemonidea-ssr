import type { Emitter } from 'mitt'
import mitt from 'mitt'

interface Events {
  showLoginDialog?: object
  showUnLoginDialog?: object
}

const emitter: Emitter<Events> = mitt<Events>()

export default emitter
