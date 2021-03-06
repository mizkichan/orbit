/* @flow */
import type { Body } from '../types'

const worker = new Worker('./bodyUpdater.worker.bundle.js')

export const init = (bodies: Body[]) => {
  worker.postMessage({ type: 'init', value: bodies })
}

export const run = () => {
  worker.postMessage({ type: 'run' })
}

export const pause = () => {
  worker.postMessage({ type: 'pause' })
}

export const addBody = (body: Body) => {
  worker.postMessage({ type: 'add_body', value: body })
}

export const setSpeed = (speed: number) => {
  worker.postMessage({ type: 'set_speed', value: speed })
}

export const getBodies = () => (
  new Promise(resolve => {
    worker.onmessage = resolve
    worker.postMessage({ type: 'get_bodies' })
  }).then(ev => ev.data)
)

// vim: set ts=2 sw=2 et:
