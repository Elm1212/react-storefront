/**
 * @license
 * Copyright © 2017-2019 Moov Corporation.  All rights reserved.
 */
import React from 'react'
import { mount } from 'enzyme'
import AnalyticsProvider from '../src/AnalyticsProvider'
import analytics from '../src/analytics'
import { inject } from 'mobx-react'

@inject('analytics')
class TestConsumer extends React.Component {
  render() {
    return (
      <button onClick={this.fireAnalyticsEvent}>Click Me</button>
    )
  }
  fireAnalyticsEvent = () => {
    this.props.listen(this.props.analytics.toString())
  }
}
 
describe('AnalyticsConsumer', () => {
  it('should pass analytics to children for triggering events', () => {
    const listener = jest.fn()
    const wrapper = mount(
      <AnalyticsProvider>
        <TestConsumer listen={listener} />
      </AnalyticsProvider>
    )
    wrapper.find('button').simulate('click')
    expect(listener).toBeCalledWith(analytics.toString())
  })  
})