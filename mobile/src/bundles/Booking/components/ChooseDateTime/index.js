import React from 'react'
import {Animated,View, Image,Easing, Text, StatusBar, TouchableHighlight,ListView, Dimensions,Picker} from 'react-native'
import {Actions} from 'react-native-router-flux'
import NavigationSteps from '@components/NavigationSteps'
import Button from '@components/Button'
import styles from './styles'
import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR,DEFAULT_GREY_COLOR} from '@theme/colors'
import DatePicker from 'react-native-datepicker'
import CONSTS from '@utils/Consts'
import moment from 'moment'

const Item = Picker.Item;

type Props = {
  bookingState: Object,
  selectDateTime: Function
}

class ChooseDateTime extends React.Component{

  constructor(props) {
    super(props);
    const {bookingState} = this.props
    var dates = []
    if (this.props.bookingState.trainerAvailability.length > 0) {

      // object for index reference
      var ref = {};

      // iterate and generate the array
      dates = this.props.bookingState.trainerAvailability.reduce(function(arr, o) {
        // check index already defined
        var day = moment(o.dtStart).local().format('MM-DD-YYYY')

        if (!(day in ref)) {
          ref[day] = arr.length;
          var firstHour = moment(o.dtStart).local().hour()
          var lastHour = moment(o.dtEnd).local().hour()
          var hours = []
          for (var i = firstHour; i <= lastHour; i++) {
            hours.push(i)
          }


          var newObj = {
            day: day,
            hours: [hours]
          }
          arr.push(Object.assign({}, newObj));
        } else {

          var obj = arr[ref[day]].hours
          var firstHour = moment(o.dtStart).local().hour()
          var lastHour = moment(o.dtEnd).local().hour()
          var hours = []
          for (var i = firstHour; i <= lastHour; i++) {
            hours.push(i)
          }
          var newHours = obj.push(hours)
          var newObj = {
            day: day,
            hours: newHours
          }

        }
        return arr;
      }, []);

    }
    var date = this.props.bookingState.chosenDate.length > 0 ? moment(bookingState.chosenDate).format("MM-DD-YYYY") : moment().format("MM-DD-YYYY")
    var time = this.props.bookingState.chosenDate.length > 0 ? moment(bookingState.chosenDate).format("h:00 a") : moment().add(100,'minutes').format("h:mm a")
    if(this.props.bookingState.bookingType == CONSTS.BOOKING_TYPE.BY_TRAINER && dates.length > 0){
      for (var i = 0; i < dates.length; i++) {
        var dateObj = dates[i];
        if(moment(dateObj.day,'MM-DD-YYYY').diff(moment()) < 0){
          continue;
        }else{
          date = dateObj.day
          break;
        }
      }
    }
    this.state = {
      currentStep: this.props.bookingState.bookingType == CONSTS.BOOKING_TYPE.BY_ACTIVITY ? 2 : 3,
      totalSteps: 4,
        date: date,
       time: time,
       trainerAvailabilityArray: dates,
       pickerBottomValue: new Animated.Value(-350),
       currentPickerOption: 'day',
       trainerDates: dates,
     }
  }

  showPicker(option){
    this.setState({currentPickerOption : option})
    Animated.timing(
    this.state.pickerBottomValue,
      {
        toValue: 0,
        duration: 250,
        easing: Easing.quad
      }
    ).start();
  }
  done(){
    this.hidePicker()
  }

  changePickerValue(dateTime){
    if(this.state.currentPickerOption === 'day'){
      this.setState({date: dateTime})
    }else{
      this.setState({time: dateTime})
    }
  }

  customTrainerValues(){

    if(this.state.currentPickerOption === 'day' &&
        this.props.bookingState.bookingType ==  CONSTS.BOOKING_TYPE.BY_TRAINER){
          var items = []
          for (var i = 0; i < this.state.trainerDates.length; i++) {
            var dateObj = this.state.trainerDates[i];
            if(moment(dateObj.day,'MM-DD-YYYY').diff(moment()) < 0){
              continue;
            }
            items.push((<Item key={dateObj.day} label={moment(dateObj.day,'MM-DD-YYYY').format('ddd MMM DD, YYYY')} value={dateObj.day} />))
          }
          return items
      }else if(this.state.currentPickerOption === 'time' &&
          this.props.bookingState.bookingType ==  CONSTS.BOOKING_TYPE.BY_TRAINER){
            var dateObj = this.state.trainerDates.filter((dateObj) => {
              if(dateObj.day === this.state.date){
                return true;
              }else{
                return false;
              }
            })[0]

            var hours = []
            for (var i = 0; i < dateObj.hours.length; i++) {
              var hoursArray = dateObj.hours[i]
              for (var j = 0; j < hoursArray.length; j++) {
                var hour = hoursArray[j];
                hours.push(hour)
              }
            }
            hours = hours.sort((a, b) => a - b)
            console.log(hours);
            var finalHours = []
            for (var i = 0; i < hours.length; i++) {
              var hour = hours[i]
              var fixedHour = hour > 12 ? hour - 12 : hour

              finalHours.push((<Item key={fixedHour + ':00 ' + (hour >= 12 ? 'PM' :  'AM' )} label={fixedHour + ':00 ' + (hour >= 12 ? 'PM' :  'AM' )} value={fixedHour + ':00 ' + (hour >= 12 ? 'PM' :  'AM' )} />))
              finalHours.push((<Item key={fixedHour + ':15 ' + (hour >= 12 ? 'PM' :  'AM' )} label={fixedHour + ':15 ' + (hour >= 12 ? 'PM' :  'AM' )} value={fixedHour + ':15 ' + (hour >= 12 ? 'PM' :  'AM' )} />))
              finalHours.push((<Item key={fixedHour + ':30 ' + (hour >= 12 ? 'PM' :  'AM' )} label={fixedHour + ':30 ' + (hour >= 12 ? 'PM' :  'AM' )} value={fixedHour + ':30 ' + (hour >= 12 ? 'PM' :  'AM' )} />))
              finalHours.push((<Item key={fixedHour + ':45 ' + (hour >= 12 ? 'PM' :  'AM' )} label={fixedHour + ':45 ' + (hour >= 12 ? 'PM' :  'AM' )} value={fixedHour + ':45 ' + (hour >= 12 ? 'PM' :  'AM' )} />))
            }
            return finalHours
      }

  }
  hidePicker(){
    Animated.timing(
      this.state.pickerBottomValue,
      {
        toValue: -350,
        duration: 250,
        easing: Easing.quad
      }
    ).start();
  }
  selectDateTime(){

    let newTime = moment(this.state.date +' '+this.state.time,'MM-DD-YYYY h:mm a')

    var diff = newTime.diff(moment(),'seconds')

    if(diff < 5400){
      Actions.mainAppModal(
      {
        uniqId: new Date().getTime(),
        visible: true,
        headerText: 'Booking Error',
        detailsText: 'Sessions can only be booked 90 minutes ahead of time.',
        onOkay:null,
        okayButtonText: 'OK',
        showCancelButton: false,
      }
      )
      return;
    }

    this.props.selectDateTime(newTime)

    if(this.props.bookingState.isEditing){
      Actions.pop()
    }else{
      Actions.chooseLocation()
    }


  }
  render(){
    return (
      <View style={styles.container}>
        <View>
          <NavigationSteps currentNumber={this.state.currentStep} style={{opacity: this.props.bookingState.isEditing ? 0 : 1}} numberOfSteps={this.state.totalSteps}  />
          <View style={styles.entryContainer}>
            <Text style={styles.title}>Day</Text>
            {this.props.bookingState.bookingType ==  CONSTS.BOOKING_TYPE.BY_TRAINER ?
              <TouchableHighlight style={{marginRight:16}} onPress={() => this.showPicker('day')} underlayColor={'rgba(0,0,0,0)'}><Text style={styles.title}>{this.state.date}</Text></TouchableHighlight>
            :
            <DatePicker
            date={this.state.date}
            mode="date"
            placeholder="select date"
            format="MM-DD-YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                height: 0
              },
              dateInput: {
                borderWidth: 0,
                alignItems: 'flex-end'
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {this.setState({date: date})}}
          />
            }

          </View>
          <View style={[styles.entryContainer,{borderBottomWidth:1,borderBottomColor: '#c0c0c0'}]}>
            <Text style={styles.title}>Time</Text>
              {this.props.bookingState.bookingType ==  CONSTS.BOOKING_TYPE.BY_TRAINER ?
                <TouchableHighlight style={{marginRight:16}} onPress={() => this.showPicker('time')} underlayColor={'rgba(0,0,0,0)'}><Text style={styles.title}>{this.state.time}</Text></TouchableHighlight>
              :
              <DatePicker
              date={this.state.time}
              mode="time"
              placeholder="select time"
              format="h:mm a"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  height: 0
                },
                dateInput: {
                  borderWidth: 0,
                  alignItems: 'flex-end'
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => {this.setState({time: date})}}
            />
        }
          </View>
          { this.props.bookingState.bookingType ==  CONSTS.BOOKING_TYPE.BY_TRAINER ?
          <Text style={{marginLeft: 32, marginRight: 32, textAlign:'center', fontFamily:'System',fontSize:12,marginTop:12,marginBottom:12, letterSpacing:1,color:'#4C4C4C',backgroundColor:'#00000000'}}>
            Dates and times shown are specific to the trainer for the given day. If there is no time for your liking, try changing the date, or choosing a different trainer. </Text>
          :
          null}
        </View>

        <View>
          <Button buttonStyle={styles.buttonStyle} buttonTextStyle={styles.buttonTextStyle} onPress={() => this.selectDateTime()}>
            Choose This Date & Time
          </Button>

        </View>
        <Animated.View style={{width:Dimensions.get('window').width,backgroundColor:'white',position:'absolute',bottom:this.state.pickerBottomValue,borderTopColor:'#4c4c4c',borderTopWidth:1}}>
          <View style={{flexDirection:'row',justifyContent:'space-between',borderBottomColor:'#F2F2F2',borderBottomWidth:1,}}>
            <TouchableHighlight style={{marginRight:12}} onPress={() => this.hidePicker()} underlayColor={'rgba(0,0,0,0)'}>
              <Text style={{marginLeft: 12, fontFamily:'System',fontSize:12,marginTop:12,marginBottom:12, letterSpacing:1,color:'#4C4C4C',backgroundColor:'#00000000'}}>Cancel</Text>
            </TouchableHighlight>

            <TouchableHighlight style={{marginRight:12,marginTop:12,}} onPress={() => this.done()} underlayColor={'rgba(0,0,0,0)'}>
              <Text style={{marginRight: 12, fontFamily:'System',fontSize:12, letterSpacing:1,color:'#4C4C4C',backgroundColor:'#00000000'}}>Done</Text>
              </TouchableHighlight>
          </View>
          <Picker
             enabled={false} selectedValue={this.state.currentPickerOption === 'time' ? this.state.time : this.state.date}
             onValueChange={(dateTime) => this.changePickerValue(dateTime)}
             >
             { this.customTrainerValues() }
          </Picker>
        </Animated.View>
      </View>
    )
  }
}

export default ChooseDateTime
