/* @flow */

import type { State } from '../types'

import React, { Component } from 'react'
import { Container } from 'flux/utils'

import store from '../store'
import * as actions from '../actions'

import Drawer from './Drawer'
import ControllWindow from './ControllWindow'
import BodyInformationWindow from './BodyInformationWindow'
import ObjectTable from './ObjectTable'

class App extends Component {
  state: State

  static getStores() {
    return [store]
  }

  static calculateState() {
    return store.getState()
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleResize.bind(this))
  }

  componentDidMount() {
    window.requestAnimationFrame(this.handleFrame.bind(this))
  }

  handleResize() {
    actions.windowResized(window.innerWidth, window.innerHeight)
  }

  handleFrame() {
    actions.update()
    window.requestAnimationFrame(this.handleFrame.bind(this))
  }

  render() {
    return (
      <div>
        <ObjectTable obj={ this.state } exclude={{ bodies: null }} show={ process.env.NODE_ENV !== 'production' } />
        <Drawer />
        <BodyInformationWindow />
        <ControllWindow />
      </div>
    )
  }
}

export default Container.create(App)

// vim: set ts=2 sw=2 et:
