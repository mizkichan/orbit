/* @flow */

import type { State } from '../types.js'

import React, { Component } from 'react'
import { Container } from 'flux/utils'

import store from '../store.js'
import * as actions from '../actions.js'

import Drawer from './Drawer.js'
import BodyInformationWindow from './BodyInformationWindow.js'
import ControllWindow from './ControllWindow.js'
import ObjectTable from './ObjectTable.js'

class App extends Component {
  state: State

  static getStores() {
    return [store]
  }

  static calculateState() {
    return store.getState()
  }

  componentDidMount() {
    actions.applicationStarted()
  }

  render() {
    return (
      <div>
        <ObjectTable obj={ this.state } exclude={{ bodies: null }} show={ this.state.showState } />
        <Drawer />
        <BodyInformationWindow />
        <ControllWindow />
      </div>
    )
  }
}

export default Container.create(App)

// vim: set ts=2 sw=2 et:
