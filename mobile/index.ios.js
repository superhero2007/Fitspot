/* @flow */

import { AppRegistry } from 'react-native'
import Kernel from '@core'

// Sentry
var Raven = require('raven-js');
require('raven-js/plugins/react-native')(Raven);

// TODO: Release IDs (Github hash or something)
Raven.config('https://93c4974746d945b680d3f8420a71b63c@sentry.io/152387', { release: 'RELEASE_ID' }).install();


AppRegistry.registerComponent('App', () => Kernel)
