import React from 'react'
import {View,Image,Text,StatusBar,TouchableHighlight,ListView} from 'react-native'
import {Actions} from 'react-native-router-flux'
import styles from './styles'
import moment from 'moment'
import { selectTrainer,selectActivity,selectDateTime,selectLocation } from '@store/modules/booking/actions'
import CONSTS from '@utils/Consts'


type Props = {
  eventInfo : Object,
  showCommunicationOptions : bool,
  activities: Array,
  editEvent: Function,
  chatSessions: Array,
}

class ScheduledEventInfo extends React.Component {

constructor(props){
  super(props)
}

edit(){
  Actions.confirmTrainerWorkout({workoutItem: this.props.eventInfo})
}

chat(){
  var eventInfo = this.props.eventInfo;
  var chatSession = this.props.chatSessions.filter( chatSession => {
    if(chatSession.customer.id === eventInfo.userId &&
      chatSession.trainer.id === eventInfo.trainerId)
      return chatSession;
  })
  if(chatSession.length > 0){
    Actions.chatScene({sessionId: chatSession[0].sessionId, name: eventInfo.trainer.firstName + ' ' + eventInfo.trainer.lastName})
  }else{
    Actions.mainAppModal(
    {
      uniqId: new Date().getTime(),
      visible: true,
      headerText: 'No Chat Available',
      detailsText: "We're sorry, but you must have a trainer accept a workout before chatting.",
      showSubDetails: false,
      onOkay: null,
      okayButtonText: 'OK',
      showCancelButton: false,
    }
    )
  }
}

render(){
  const { eventInfo, showCommunicationOptions } = this.props

  var selectedActivity = this.props.activities.filter(function(activity){
      if(activity.id === eventInfo.activityId){
        return true
      }else{
        return false
      }
    }
  )[0]

  var gymName = eventInfo.gymId === null ? eventInfo.address + ' ' + eventInfo.city : eventInfo.gym.name

  var  nameToDisplay = eventInfo.trainer === null ? 'Fitspot Choose' : eventInfo.trainer.firstName + ' ' + eventInfo.trainer.lastName

  var dtStart = (typeof eventInfo.dtStart) === 'undefined' ? eventInfo.date : eventInfo.dtStart


  return (
    <View style ={styles.row}>
      <View style={styles.rowBottom}>
        <View style={[styles.rowBottomColumn, {flex:1,marginLeft: 6}]}>
          <View style={{alignSelf:'flex-start'}}>
            <Text style={styles.rowBottomHeader}>DATE & TIME</Text>
            <Text style={styles.rowBottomText}><Text style={styles.bold}>{moment(dtStart).local().format('MMM DD h:mmA')}</Text></Text>
          </View>
        </View>
        <View style={[styles.rowBottomColumn, {flex:1,marginRight: 0}]}>
          <View style={{alignSelf:'flex-start'}}>
            <Text style={styles.rowBottomHeader}>TRAINER</Text>
            <Text style={styles.rowBottomText}><Text style={styles.bold}>{nameToDisplay}</Text></Text>
            </View>
        </View>
        { showCommunicationOptions ?
        <TouchableHighlight onPress={() => this.edit()}  underlayColor='rgba(0,0,0,0)' style={[styles.rowBottomColumn, {flex:.5,borderBottomWidth: 1,borderBottomColor: '#c0c0c0',borderLeftWidth: 1, borderLeftColor: '#c0c0c0',marginRight: 0}]}>
          <View style={{alignSelf:'center'}} >
            <Image source={require('../../images/trainer-message.png')} />
          </View>
        </TouchableHighlight>
        :
        <View></View>
        }
      </View>
      <View style={styles.rowBottom}>
        <View style={[styles.rowBottomColumn, {flex:1,marginLeft: 6}]}>
          <View style={{alignSelf:'flex-start'}}>
            <Text style={styles.rowBottomHeader}>ACTIVITY</Text>
            <Text style={styles.rowBottomText}><Text style={styles.bold}>{selectedActivity.name}</Text></Text>
          </View>
        </View>
        <View style={[styles.rowBottomColumn, {flex:1,marginRight: 0}]}>
          <View style={{alignSelf:'flex-start'}}>
            <Text style={styles.rowBottomHeader}>LOCATION</Text>
            <Text style={styles.rowBottomText}><Text style={styles.bold}>{gymName}</Text></Text>
          </View>
        </View>
        { showCommunicationOptions ?
        <TouchableHighlight onPress={() => this.chat()} underlayColor='rgba(0,0,0,0)' style={[styles.rowBottomColumn, {flex:.5,borderLeftWidth: 1, borderLeftColor: '#c0c0c0', marginRight: 0}]}>
          <View style={{alignSelf:'center'}} >
            <Image source={require('../../images/trainer-chat.png')} />
          </View>
        </TouchableHighlight>
        :
        <View/>
        }
      </View>
    </View>
  )
}
}

export default ScheduledEventInfo
