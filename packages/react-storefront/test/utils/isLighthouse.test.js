/**
 * @license
 * Copyright © 2017-2019 Moov Corporation.  All rights reserved.
 */
import isLighthouse from '../../src/utils/isLighthouse'

describe('isLighthouse', () => {
  beforeEach(() => {
    window.__nativePromise = false
  })

  it('should not find lighthouse when not there', () => {
    expect(isLighthouse()).toEqual(false)
  })

  it('should find lighthouse immediately when defined', () => {
    window.__nativePromise = true
    expect(isLighthouse()).toEqual(true)
  })

  it('should find lighthouse when defined after a few ticks', done => {
    expect(isLighthouse()).toEqual(false)
    setTimeout(() => {
        window.__nativePromise = true
    }, 5)
    setTimeout(() => {
        expect(isLighthouse()).toEqual(true)
        done();
    }, 10);
  })
})