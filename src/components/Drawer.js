/* @flow */
import type { State } from '../types.js'
import styles from './Drawer.module.css'

import React, { Component } from 'react'
import { Container } from 'flux/utils'

import store from '../store.js'
import * as actions from '../actions.js'

import Body from './Body.js'

class Drawer extends Component {
  state: State

  static getStores() {
    return [store]
  }

  static calculateState() {
    return store.getState()
  }

  handleMouseMove(ev) {
    actions.mouseMoved(ev.clientX, ev.clientY)
  }

  handleMouseDown(ev) {
    actions.mouseMoved(ev.clientX, ev.clientY)
    if (ev.buttons & 1) {
      actions.leftButtonPushed()
    } else if (ev.buttons & 2) {
      actions.rightButtonPushed()
    }
  }

  handleMouseUp(ev) {
    const { leftButtonPressed, rightButtonPressed } = this.state
    actions.mouseMoved(ev.clientX, ev.clientY)
    if (leftButtonPressed && !(ev.buttons & 1)) {
      actions.leftButtonReleased()
    }
    if (rightButtonPressed && !(ev.buttons & 2)) {
      actions.rightButtonReleased()
    }
  }

  handleMouseLeave() {
    actions.mouseLeft()
  }

  handleTouchStart(ev) {
    if (ev.touches.length === 1) {
      actions.mouseMoved(ev.touches[0].clientX, ev.touches[0].clientY)
      actions.leftButtonPushed()
    } else if (ev.touches.length === 2) {
      actions.pinchStart(ev.touches)
    }
  }

  handleTouchMove(ev) {
    ev.preventDefault()
    if (ev.touches.length === 1) {
      actions.mouseMoved(ev.touches[0].clientX, ev.touches[0].clientY)
    } else if (ev.touches.length === 2) {
      actions.pinchMove(ev.touches)
    }
  }

  handleTouchEnd() {
    actions.leftButtonReleased()
    actions.mouseLeft()
  }

  handleWheel(ev) {
    actions.wheelMoved(ev.deltaY)
  }

  render() {
    const { windowWidth, windowHeight, scale, centerX, centerY, bodies, newBody, mouseSvgX, mouseSvgY } = this.state

    if (windowWidth == null || windowHeight == null) return null

    return (
      <svg className={ styles.drawer }
        width={ windowWidth } height={ windowHeight } viewBox={ `${-windowWidth/2} ${-windowHeight/2} ${windowWidth} ${windowHeight}` }
        onMouseMove={ ev => this.handleMouseMove(ev) }
        onMouseDown={ ev => this.handleMouseDown(ev) }
        onMouseUp={ ev => this.handleMouseUp(ev) }
        onMouseLeave={ () => this.handleMouseLeave() }
        onTouchStart={ ev => this.handleTouchStart(ev) }
        onTouchMove={ ev => this.handleTouchMove(ev) }
        onTouchEnd={ () => this.handleTouchEnd() }
        onWheel={ ev => this.handleWheel(ev) }
        onContextMenu={ ev => ev.preventDefault() }
      >
        <g transform={`scale(${scale}) translate(${-centerX} ${-centerY})`}>
          { bodies.map(b => <Body key={ b.id } {...b} />) }
          {
            newBody == null ? null :
            <g>
              <line x1={ newBody.x } y1={ newBody.y } x2={ mouseSvgX } y2={ mouseSvgY } style={{ stroke: 'black', strokeWidth: 1 / scale }} />
              <circle r={ newBody.radius } cx={ newBody.x } cy={ newBody.y } style={{ fill: newBody.color }} />
            </g>
          }
        </g>
      </svg>
    )
  }
}

export default Container.create(Drawer)

// vim: set ts=2 sw=2 et:
