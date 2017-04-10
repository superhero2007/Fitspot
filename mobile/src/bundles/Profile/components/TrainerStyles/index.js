import { RadioButtons, SegmentedControls } from 'react-native-radio-buttons'
import React from 'react'
import {Actions,TouchableWithoutFeedback} from 'react-native-router-flux'
import { View, ListView, StyleSheet, Text, ScrollView, Image, TextInput } from 'react-native';
import styles from './styles'

import {FONT_DAYTONA_LIGHT, FONT_DAYTONA_REG, FONT_DAYTONA_BOLD} from '@theme/fonts'
import {DEFAULT_GREEN_COLOR} from '@theme/colors'

import ButtonSettings from '@components/ButtonSettings'
import HorizontalLine from '@components/HorizontalLine'
import ProgressLines from '@components/ProgressLines'
import Button from '@components/Button'
import RadioButtonRow from '@components/RadioButtonRow'


type Props = {
  user: Object,
  onUpdateClick: Function,
}
const options = [
"Option 1",
"Option 2"
];
const STEP_NUMBER = 4;

class TrainerStyles extends React.Component{

  constructor(props) {
      super(props);
      this.state = {
        selectedOption: 0,
        selectedMap : {}
      };
    }

    setSelectedOption(selectedOption){
      var selectedMap = this.state.selectedMap;
      var isSelected = (selectedOption in selectedMap) ? this.state.selectedMap[selectedOption] : false;
      selectedMap[selectedOption] = !isSelected;
      this.setState({
        selectedOption,
        selectedMap,
      });
    }

    renderOption(option, selected, onSelect, index){
      selected = this.state.selectedMap[option] === undefined ? false : this.state.selectedMap[option];
      return <RadioButtonRow selected={selected} key={index} option={option} selected={selected} onSelect={onSelect} index={index} />;
    }

    renderContainer(optionNodes){
      return <View style={{marginBottom: 25}}>{optionNodes}</View>;
    }
    updateCustomer(){
      var user = this.props.user;
      this.props.onUpdateClick(user)
    }

    render() {
      const trainerOptions = [
        "Motivational",
        "Educational",
        "Drill Sergeant",
      ];

      return (
        <View style={{marginTop: 75}}>
          <ProgressLines step={STEP_NUMBER} />
          <Text style={{alignSelf: 'center',fontFamily:FONT_DAYTONA_BOLD,fontSize:13,marginBottom:35}}>Which trainer styles do you prefer?</Text>
          <HorizontalLine lineStyle={{backgroundColor:'#F8F8F8'}} />
          <View style={{marginLeft:35}} >
          <RadioButtons
            options={ trainerOptions }
            onSelection={ this.setSelectedOption.bind(this)}
            selectedOption={this.state.selectedOption }
            renderOption={ this.renderOption.bind(this) }
            renderContainer={ this.renderContainer.bind(this) }
          />
        </View>

        <Button buttonStyle={[styles.buttonStyle,{marginTop:45}]} buttonTextStyle={styles.buttonTextStyle} onPress={() => {this.updateCustomer(); Actions.favHighIntensity();}}>
          Save Trainer Preference
        </Button>

        </View>
      );
    }
}

export default TrainerStyles
