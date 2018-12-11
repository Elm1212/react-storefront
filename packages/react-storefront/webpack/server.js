const path = require('path')
const { createServerConfig, createLoaders } = require('./common')
const merge = require('lodash/merge')

module.exports = {

  /**
   * Generates a webpack config for the server development build
   * @param {String} root The path to the root of the project
   * @return {Object} A webpack config
   * @param {Object} options
   * @param {Object} options.eslintConfig A config object for eslint
   */
  dev(root, { eslintConfig = require('./eslint-server'), envVariables = {} } = {}) {
    const webpack = require(path.join(root, 'node_modules', 'webpack'))

    const alias = {
      'react-storefront-stats': path.join(root, 'node_modules', 'react-storefront', 'stats', 'getStatsInDev')
    }

    return ({ entry, plugins, output, target, resolve }) => merge(createServerConfig(root, alias), {
      mode: 'development',
      entry,
      output: merge(output,
        {
          devtoolModuleFilenameTemplate: '[absolute-resource-path]'
        }
      ),
      target,
      resolve,
      module: {
        rules: createLoaders(root, { modules: 'commonjs', plugins: [ 'react-storefront' ], assetsPath: '../build/assets/pwa', eslintConfig })
      },
      devtool: 'cheap-module-source-map',
      plugins: [
        ...plugins,
        new webpack.ExtendedAPIPlugin(),
        new webpack.DefinePlugin({
          'process.env.MOOV_RUNTIME': JSON.stringify('server'),
          'process.env.MOOV_ENV': JSON.stringify('development'),
          ...envVariables
        })
      ]
    })
  },

  /**
   * Generates a webpack config for the server production build
   * @param {String} root The path to the root of the project
   * @param {Object} options
   * @return {Object} A webpack config
   */
  prod(root, { envVariables = {} }) {
    const webpack = require(path.join(root, 'node_modules', 'webpack'))

    const alias = {
      'react-storefront-stats': path.join(root, 'node_modules', 'react-storefront', 'stats', 'getStats')
    }

    return ({ entry, plugins, output, target, resolve }) => merge(createServerConfig(root, alias), {
      mode: 'production',
      optimization: {
        minimize: false
      },
      entry, 
      output,
      target,
      resolve,
      module: {
        rules: createLoaders(root, { modules: 'commonjs', plugins: [ 'react-storefront' ], eslintConfig: './eslint-server' })
      },
      plugins: [
        ...plugins,
        new webpack.ExtendedAPIPlugin(),
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1
        }),
        new webpack.DefinePlugin({
          'process.env.MOOV_RUNTIME': JSON.stringify('server'),
          'process.env.MOOV_ENV': JSON.stringify('production'),
          ...envVariables
        })
      ]
    })
  }

}
