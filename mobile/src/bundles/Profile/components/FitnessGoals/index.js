import { RadioButtons, SegmentedControls } from 'react-native-radio-buttons'
import React from 'react'
import {Actions,TouchableWithoutFeedback} from 'react-native-router-flux'
import { View, ListView, StyleSheet, Text, ScrollView, Image, TextInput } from 'react-native';
import styles from './styles'

import {FONT_DAYTONA_LIGHT, FONT_DAYTONA_REG, FONT_DAYTONA_BOLD} from '@theme/fonts'
import {DEFAULT_GREEN_COLOR} from '@theme/colors'

import ButtonSettings from '@components/ButtonSettings'
import HorizontalLine from '@components/HorizontalLine'
import Button from '@components/Button'
import RadioButtonRow from '@components/RadioButtonRow'
import ProgressLines from '@components/ProgressLines'


type Props = {
  user: Object,
  onUpdateClick: Function,
}
const options = [
"Option 1",
"Option 2"
];
const goalOptions = [
  "Get stronger / Build muscle mass",
  "Get toned",
  "Lose weight",
  "Relieve stress",
  "Increase flexibility",
  "Increase productivity"
];
const MAX_NUM_SELECTED = 3;
const STEP_NUMBER = 1;

class FitnessGoals extends React.Component{

  constructor(props) {
      super(props);
      this.state = {
        selectedOption: 0,
        selectedMap : {},
        numSelected : 0
      };
    }

    updateCustomer(){
      var user = this.props.user;
      /*
      user.preferences.fitness_goals = [];
      for (var i=0; i < goalOptions.length; ++i) {
        if (goalOptions[i] in this.state.selectedMap && this.state.selectedMap[goalOptions[i]]) {
          user.preferences.fitness_goals.push(goalOptions[i]);
        }
      }
      */
      this.props.onUpdateClick(user);
    }

    setSelectedOption(selectedOption){
      var selectedMap = this.state.selectedMap;
      var isSelected = (selectedOption in selectedMap) ? this.state.selectedMap[selectedOption] : false;
      var numSelected = this.state.numSelected + (isSelected ? -1 : 1);
      if (numSelected > MAX_NUM_SELECTED) {
        numSelected = 3;
        isSelected = true;
      }
      selectedMap[selectedOption] = !isSelected;
      this.setState({
        selectedOption,
        selectedMap,
        numSelected
      });
    }

    renderOption(option, selected, onSelect, index){
      selected = this.state.selectedMap[option] === undefined ? false : this.state.selectedMap[option];
      return <RadioButtonRow selected={selected} key={index} option={option} selected={selected} onSelect={onSelect} index={index} />;
    }

    renderContainer(optionNodes){
      return <View style={{marginBottom: 25}}>{optionNodes}</View>;
    }

    render() {

      return (
        <View style={{marginTop: 75}}>
          <ProgressLines step={STEP_NUMBER} />
          <Text style={{alignSelf: 'center',fontFamily:FONT_DAYTONA_BOLD,fontSize:13}}>What Do You Want To Achieve?</Text>
          <Text style={{alignSelf: 'center',fontFamily:FONT_DAYTONA_BOLD,fontSize:13,marginBottom:35}}>(Please choose three)</Text>

          <HorizontalLine lineStyle={{backgroundColor:'#F8F8F8'}} />
          <View style={{marginLeft:35}} >
          <RadioButtons
            options={ goalOptions }
            onSelection={ this.setSelectedOption.bind(this)}
            selectedOption={this.state.selectedMap }
            renderOption={ this.renderOption.bind(this) }
            renderContainer={ this.renderContainer.bind(this) }
          />
          </View>
        <Button buttonStyle={[styles.buttonStyle,{marginTop:45}]} buttonTextStyle={styles.buttonTextStyle} onPress={() => {this.updateCustomer(); Actions.bodyFocus()}}>
          Save Fitness Goals
        </Button>
        </View>
      );
    }
}

export default FitnessGoals
