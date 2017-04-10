/* @flow */

import React from 'react'
import { View } from 'react-native'
import styles from './styles'
import HorizontalLine from '@components/HorizontalLine'
import {DEFAULT_GREEN_COLOR} from '@theme/colors'

type Props = {
  step : Number
}

const ProgressLines = (props: Props) => {
  const { step } = props;
  return (
    <View style={styles.container}>
    {[1,2,3,4,5,6].map((n) => {
     return <HorizontalLine key={n} fullWidth={false} lineStyle={[styles.progressLine,(n < step ? styles.currentLine : styles.otherLine)]} />
    })}
    </View>
  )
}

export default ProgressLines
