/* @flow */
import type { State } from '../types.js'
import './App.css'
import styles from './App.module.css'

import React, { Component } from 'react'
import { Container } from 'flux/utils'

import store from '../store.js'
import * as actions from '../actions.js'

import { Layout, Menu, Icon, Row, Col, Switch, Card } from 'antd'

import LogarithmicSlider from './LogarithmicSlider.js'
import Drawer from './Drawer.js'

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

  handleMenuClink({ key }) {
    switch (key) {
      case 'runpause':
        actions.toggleRunPause()
        break
    }
  }

  handleFullscreenChange(value) {
    actions.changeFullscreen(value)
  }

  handleScaleChange(value) {
    actions.changeScale(value)
  }

  handleSpeedChange(value) {
    actions.changeSpeed(value)
  }

  handleNewBodyRadiusChange(value) {
    actions.changeNewBodyRadius(value)
  }

  handleNewBodyMassChange(value) {
    actions.changeNewBodyMass(value)
  }

  render() {
    const { isRunning, isFullscreen, scale, speed, newBodyRadius, newBodyMass } = this.state

    return (
      <Layout>
        <Layout.Sider collapsible defaultCollapsed width={ 300 } breakpoint="xs">
          <Menu theme="dark" onClick={ params => this.handleMenuClink(params) }>
            <Menu.Item key="runpause">
              <Icon type={ isRunning ? 'pause' : 'caret-right' }/>
              <span className="menu-label">{ isRunning ? 'Pause' : 'Run' }</span>
            </Menu.Item>
          </Menu>

          <Card>
            <Row>
              <Col span={ 6 }>Fullscreen</Col>
              <Col className={ styles.optionsValue } span={ 18 }>
                <Switch checked={ isFullscreen } onChange={ value => this.handleFullscreenChange(value) } />
              </Col>
            </Row>

            <Row>
              <Col span={ 6 }>Scale</Col>

              <Col className={ styles.optionsValue } span={ 18 }>
                <LogarithmicSlider min={ 2**-16 } max={ 2**16 }
                                    value={ scale }
                                    onChange={ value => this.handleScaleChange(value) }
                                    tipFormatter={ value => 'x' + value.toPrecision(2) }/>
              </Col>
            </Row>

            <Row>
              <Col span={ 6 }>Speed</Col>
              <Col className={ styles.optionsValue } span={ 18 }>
                <LogarithmicSlider min={ 2**-16 } max={ 2**16 }
                                    value={ speed }
                                    onChange={ value => this.handleSpeedChange(value) }
                                    tipFormatter={ value => 'x' + value.toPrecision(2) }/>
              </Col>
            </Row>

            <Row>
              <Col span={ 6 }>Radius</Col>
              <Col className={ styles.optionsValue } span={ 18 }>
                <LogarithmicSlider min={ 2**-16 } max={ 2**16 }
                                    value={ newBodyRadius }
                                    onChange={ value => this.handleNewBodyRadiusChange(value) }
                                    tipFormatter={ value => value.toPrecision(2) }/>
              </Col>
            </Row>

            <Row>
              <Col span={ 6 }>Mass</Col>
              <Col className={ styles.optionsValue } span={ 18 }>
                <LogarithmicSlider min={ 2**-16 } max={ 2**16 }
                                    value={ newBodyMass }
                                    onChange={ value => this.handleNewBodyMassChange(value) }
                                    tipFormatter={ value => value.toPrecision(2) }/>
              </Col>
            </Row>
          </Card>
        </Layout.Sider>

        <Layout.Content>
          <Drawer />
        </Layout.Content>
      </Layout>
    )
  }
}

export default Container.create(App)

// vim: set ts=2 sw=2 et:
