/* @flow */

import type { State } from '../types.js'

import React, { Component } from 'react'
import { Container } from 'flux/utils'

import store from '../store.js'
import * as actions from '../actions.js'

import Navbar from 'react-bootstrap/lib/Navbar'
import Button from 'react-bootstrap/lib/Button'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'

class ControllWindow extends Component {
  state: State

  static getStores() {
    return [store]
  }

  static calculateState() {
    return store.getState()
  }

  handleFullscreenToggleButtonClick() {
    actions.toggleFullscreen()
  }

  handleRunPauseButtonClick() {
    actions.toggleRunPause()
  }

  handleShowStateToggleButtonClick() {
    actions.toggleShowState()
  }

  render() {
    const { isRunning, isFullscreen, showState } = this.state

    return (
      <Navbar fixedBottom>
        <Navbar.Header>
          <Navbar.Brand>Orbit</Navbar.Brand>
        </Navbar.Header>
        <Navbar.Form pullLeft>
          <ButtonGroup>
            <Button active={ isRunning } onClick={ this.handleRunPauseButtonClick.bind(this) }>
              <Glyphicon glyph={ isRunning ? 'pause' : 'play' } />
            </Button>
            <Button active={ isFullscreen } onClick={ this.handleFullscreenToggleButtonClick.bind(this) }>
              <Glyphicon glyph="fullscreen" />
            </Button>
            <Button active={ showState } onClick={ this.handleShowStateToggleButtonClick.bind(this) }>
              <Glyphicon glyph="console" />
            </Button>
          </ButtonGroup>
        </Navbar.Form>
      </Navbar>
    )
  }
}

export default Container.create(ControllWindow)

// vim: set ts=2 sw=2 et:
