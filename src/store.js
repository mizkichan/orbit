/* @flow */

import { ReduceStore } from 'flux/utils'
import dispatcher from './dispatcher'

import initialBodies from './initialBodies'

class Store extends ReduceStore {
  getInitialState() {
    return {
      bodies: initialBodies,
      mouseX: null,
      mouseY: null,
      touches: [],
      centerX: 0,
      centerY: 0,
      mousePressed: false,
      selectedBody: null,
      scale: 1,
      followingBody: null,
    }
  }

  reduce(state, action) {
    switch (action.type) {
      case 'update': {
        const nextState = {
          ...state,
          bodies: action.bodies
        }

        if (state.followingBody !== null) {
          Object.assign(nextState, {
            centerX: state.bodies[state.followingBody].x,
            centerY: state.bodies[state.followingBody].y,
          })
        }

        return nextState
      }

      case 'mouse_moved': {
        const nextState = {
          ...state,
          mouseX: action.x,
          mouseY: action.y,
        }

        if (state.mousePressed && state.followingBody === null) {
          Object.assign(nextState, {
            centerX: state.centerX + (state.mouseX - nextState.mouseX) / state.scale,
            centerY: state.centerY + (state.mouseY - nextState.mouseY) / state.scale,
          })
        }

        return nextState
      }

      case 'mouse_button_pushed':
        return {
          ...state,
          mousePressed: true,
        }

      case 'mouse_button_released':
        return {
          ...state,
          mousePressed: false,
        }

      case 'mouse_left':
        return {
          ...state,
          mousePressed: false,
          mouseX: null,
          mouseY: null,
        }

      case 'touch_started':
      case 'touch_ended':
        return {
          ...state,
          touches: action.touches,
        }

      case 'touch_moved': {
        const nextState = {
          ...state,
          touches: action.touches,
        }

        if (state.touches.length === 1 && nextState.touches.length === 1) {
          Object.assign(nextState, {
            centerX: state.centerX + (state.touches[0].x - nextState.touches[0].x) / state.scale,
            centerY: state.centerY + (state.touches[0].y - nextState.touches[0].y) / state.scale,
          })
        } else if (state.touches.length === 2 && nextState.touches.length === 2) {
          Object.assign(nextState, {
            scale: state.scale * (
              ((nextState.touches[0].x - nextState.touches[1].x) ** 2 +
               (nextState.touches[0].y - nextState.touches[1].y) ** 2)
              /
              ((state.touches[0].x - state.touches[1].x) ** 2 +
               (state.touches[0].y - state.touches[1].y) ** 2)
            ) ** 0.5
          })
        }

        return nextState
      }

      case 'change_zoom_level':
        return {
          ...state,
          scale: state.scale * action.coefficient
        }

      case 'select_body':
        return {
          ...state,
          selectedBody: action.id,
        }

      case 'window_resized':
        return {
          ...state,
          windowWidth: action.width,
          windowHeight: action.height,
        }

      case 'delete_body':
        return {
          ...state,
          selectedBody: null,
          bodies: state.bodies.filter(body => body.id !== action.id),
        }

      case 'close_information_window':
        return {
          ...state,
          selectedBody: null,
        }

      case 'change_follow_target':
        return {
          ...state,
          followingBody: action.id,
        }

      case 'stop_following':
        return {
          ...state,
          followingBody: null,
        }
    }
  }
}

export default new Store(dispatcher)

// vim: set ts=2 sw=2 et:
