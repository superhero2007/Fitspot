/* @flow */

import React from 'react'
import { Image, TouchableHighlight } from 'react-native'
import {Actions} from 'react-native-router-flux'
import styles from './styles'

type Props = {
  styles : Object,
  onPress: Function,
}

const ButtonEdit = (props: Props) => {
  const { onPress } = props
  const style = props.style || styles.editButton
  return (
    <TouchableHighlight onPress={() => onPress()} style={style}>
      <Image
        style={styles.editButton}
        source={require('../../images/edit-session-white.png')}
      />
    </TouchableHighlight>
  )
}

export default ButtonEdit
