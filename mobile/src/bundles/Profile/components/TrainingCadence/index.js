import { RadioButtons } from 'react-native-radio-buttons'
import React from 'react'
import {Actions,TouchableWithoutFeedback} from 'react-native-router-flux'
import { View, ListView, StyleSheet, Text, ScrollView, Image, TextInput } from 'react-native';
import styles from './styles'

import {FONT_DAYTONA_LIGHT, FONT_DAYTONA_REG, FONT_DAYTONA_BOLD} from '@theme/fonts'

import ButtonSettings from '@components/ButtonSettings'
import HorizontalLine from '@components/HorizontalLine'
import Button from '@components/Button'
import RadioButtonRow from '@components/RadioButtonRow'
import ProgressLines from '@components/ProgressLines'

type Props = {
}
const options = [
"Option 1",
"Option 2"
];
const STEP_NUMBER = 3;

class TrainingCadence extends React.Component{

  constructor(props) {
      super(props);
      this.state = {
        selectedOption: 0
      };
    }

    setSelectedOption(selectedOption){
      this.setState({
        selectedOption
      });
    }

    renderOption(option, selected, onSelect, index){
      return <RadioButtonRow selected={selected} key={index} option={option} selected={selected} onSelect={onSelect} index={index} />;
    }

    renderContainer(optionNodes){
      return <View>{optionNodes}</View>;
    }

    render() {
      const options = [
        "Greater than three times a week",
        "Three times a week",
        "Once a week",
        "Twice a month",
        "Once a month",
        "Less than once a month"
      ];

      return (
        <View style={{marginTop: 75}}>
          <ProgressLines step={STEP_NUMBER} />
          <Text style={{alignSelf: 'center',fontFamily:FONT_DAYTONA_BOLD,fontSize:13,marginBottom:25}}>How Often Do You Work Out?</Text>
          <HorizontalLine lineStyle={{backgroundColor:'#F8F8F8'}} />
          <View style={{marginLeft:35}} >
          <RadioButtons
            options={ options }
            onSelection={ this.setSelectedOption.bind(this)}
            selectedOption={this.state.selectedOption }
            renderOption={ this.renderOption.bind(this) }
            renderContainer={ this.renderContainer.bind(this) }
          />
        </View>
        <Button buttonStyle={[styles.buttonStyle,{marginTop:25}]} buttonTextStyle={styles.buttonTextStyle} onPress={() => { Actions.trainerStyles()}}>
          Save Fitness Level
        </Button>

        </View>
      );
    }
}

export default TrainingCadence
