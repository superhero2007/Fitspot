/* @flow */

import { StyleSheet } from 'react-native'
import { DEFAULT_GREY_COLOR, DEFAULT_GREEN_COLOR } from '@theme/colors'

const styles = StyleSheet.create({
  container : {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressLine : {
    height: 2,
    width: 40,
    marginLeft: 2,
    marginRight: 2,
  },
  otherLine : {
    backgroundColor : DEFAULT_GREY_COLOR
  },
  currentLine : {
    backgroundColor : DEFAULT_GREEN_COLOR
  }
})

export default styles
