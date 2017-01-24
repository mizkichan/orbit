/* @flow */

export type Body = {|
  id: number,
  locus: [number, number][],
  mass: number,
  radius: number,
  style: Object,
  vx: number,
  vy: number,
  x: number,
  y: number,
|}

export type Touch = {|
  id: number,
  x: number,
  y: number,
|}

export type State = {|
  bodies: Body[],
  touches: Touch[],
  windowHeight: number,
  windowWidth: number,
  centerX: number,
  centerY: number,
  mouseX: ?number,
  mouseY: ?number,
  mousePressed: bool,
  scale: number,
  followingBodyId: ?number,
  selectedBodyId: ?number,
  loop: number,
|}

// vim: set ts=2 sw=2 et:
