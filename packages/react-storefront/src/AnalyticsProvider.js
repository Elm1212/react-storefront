/**
 * @license
 * Copyright © 2017-2019 Moov Corporation.  All rights reserved.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import analytics, { configureAnalytics } from './analytics'
import isLighthouse from './utils/isLighthouse'
import { Provider } from 'mobx-react'

/**
 * Use this component to register your analytics targets.
 * 
 * import AnalyticsProvider from 'react-storefront/AnalyticsProvider'
 * import GoogleAnalyticsTarget from 'react-storefront-extensions/GoogleAnalyticsTarget'
 * 
 * Example:
 * 
 * ```
 *  <AnalyticsProvider
 *    targets={isLighthouse => (isLighthouse ? [] : [
 *      new GoogleAnalyticsTarget({
 *        trackingID: 'ABC123'
 *      })
 *    ])}
 *  >
 *    <App/>
 *  </AnalyticsProvider>
 * ```
 * 
 * Components that are decendents of AnalyticsProvider can use `@inject('analytics')` to get access to
 * an object which can be used to broadcase analytics events to targets:
 * 
 * ```
 *  import React, { Component } from 'react'
 *  import Button from '@material-ui/core/Button'
 *  import { inject } from 'mobx-react'
 * 
 *  @inject('analytics')
 *  class MyComponent extends Component {
 * 
 *    render() {
 *      return (
 *        <Button onClick={this.fireAnalyticsEvent}>Click Me</Button>
 *      )
 *    }
 * 
 *    // This will call the someEvent() method on all configured analytics targets.
 *    fireAnalyticsEvent = () => {
 *      const eventData = { foo: 'bar' }
 *      this.props.analytics.fire('someEvent', eventData) // analytics prop is provided by the @inject('analytics') decorator.
 *    }
 * 
 *  }
 * ```
 */
 export default class AnalyticsProvider extends Component {
  static propTypes = {
    /**
     * Function which should return desired analytics targets to configure
     * An argument is passed to the function which indicates if in Lighthouse
     */
    targets: PropTypes.func.isRequired
  }
  componentDidMount() {
    if (this.props.targets) {
      configureAnalytics(...this.props.targets(isLighthouse()))
    }
  }
  render() {
    return (
      <Provider analytics={analytics}>
        {this.props.children}
      </Provider>
    );
  }
}