/**
 * @license
 * Copyright © 2017-2019 Moov Corporation.  All rights reserved.
 */
import React from 'react'
import { mount } from 'enzyme'
import * as analytics from '../src/analytics'
import AnalyticsProvider from '../src/AnalyticsProvider'

describe('AnalyticsProvider', () => {

  beforeEach(() => {
    window.__nativePromise = false
  })

  it('should call configure with targets', () => {
    const spy = jest.spyOn(analytics, 'configureAnalytics')
    mount(
      <AnalyticsProvider targets={() => [1, 2, 3]}>
        <div>Hello</div>
      </AnalyticsProvider>
    )
    expect(spy).toHaveBeenCalledWith(1, 2, 3)
    spy.mockRestore()
  })

  it('should render given children', () => {
    const wrapper = mount(
      <AnalyticsProvider>
        <div className="hello">Hello</div>
      </AnalyticsProvider>
    )
    expect(wrapper.find('.hello').text()).toEqual('Hello')
  })

  it('should pass lighthouse indicator to children function when false', () => {
    const getTargets = jest.fn(() => [])
    mount(
      <AnalyticsProvider targets={getTargets}>
        <div>Hello</div>
      </AnalyticsProvider>
    )
    expect(getTargets).toHaveBeenCalledWith(false)
  })

  it('should pass lighthouse indicator to children function when true', () => {
    window.__nativePromise = true;
    const getTargets = jest.fn(() => [])
    mount(
      <AnalyticsProvider targets={getTargets}>
        <div>Hello</div>
      </AnalyticsProvider>
    )
    expect(getTargets).toHaveBeenCalledWith(true)
  })
  
})