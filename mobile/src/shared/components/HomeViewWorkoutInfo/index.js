import React from 'react'
import {View,Image,Text,StatusBar,TouchableHighlight,ListView} from 'react-native'
import {Actions} from 'react-native-router-flux'
import styles from './styles'
import moment from 'moment'
import CONSTS from '@utils/Consts'
import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR} from '@theme/colors'



type Props = {
  eventInfo : Object,
  showCommunicationOptions : bool,
  activities: Array,
  chatSessions: Array
}
class HomeViewWorkoutInfo extends React.Component{
  constructor(props){
    super(props)
  }


 chat(){
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
    if(eventInfo.trainerId === null){
      eventInfo['trainer'] = { firstName: 'Fitspot', lastName: 'Choose'}
    }


    var selectedActivity = this.props.activities.filter(function(activity){
      if(activity.id === eventInfo.activityId){
        return true
      }else{
        false
      }
    })[0]

    var gymName = eventInfo.gymId === null ? eventInfo.address + ' ' + eventInfo.city : eventInfo.gym.name

    var dtStart = (typeof eventInfo.dtStart) === 'undefined' ? eventInfo.date : eventInfo.dtStart


    return (
      <View style ={styles.row}>
        <View style={{backgroundColor:'#D9D9D9',borderTopLeftRadius: 6,borderTopRightRadius: 6}}>
          <Text style={{fontWeight:'700', fontSize:8,fontFamily:'System',letterSpacing:1,textAlign:'center',backgroundColor:'#D9D9D9',marginTop:10,marginBottom:10}}>YOUR NEXT WORKOUT</Text>
        </View>
        <View style={styles.rowBottom}>
          <View style={[styles.rowBottomColumn, {flex:1,marginLeft: 2}]}>
            <View style={{alignSelf:'flex-start'}}>
              <Text style={styles.rowBottomHeader}>DATE & TIME</Text>
              <Text style={styles.rowBottomText}><Text style={styles.bold}>{moment(dtStart).local().format('MMM DD h:mmA')}</Text></Text>
            </View>
          </View>
          <View style={[styles.rowBottomColumn, {flex:1,marginRight: 0}]}>
            <View style={{alignSelf:'flex-start'}}>
              <Text style={styles.rowBottomHeader}>TRAINER</Text>
              <Text style={styles.rowBottomText}><Text style={styles.bold}>{eventInfo.trainer.firstName + ' ' + eventInfo.trainer.lastName}</Text></Text>
              </View>
          </View>
        </View>
        <View style={styles.rowBottom}>
          <View style={[styles.rowBottomColumn, {flex:1,marginLeft: 2}]}>
            <View style={{alignSelf:'flex-start'}}>
              <Text style={styles.rowBottomHeader}>ACTIVITY</Text>
              <Text style={styles.rowBottomText}><Text style={styles.bold}>{selectedActivity.name}</Text></Text>
            </View>
          </View>
          <View style={[styles.rowBottomColumn, {flex:1,marginRight: 0}]}>
            <View style={{alignSelf:'flex-start'}}>
              <Text style={styles.rowBottomHeader}>LOCATION</Text>
              <Text style={[styles.rowBottomText,{marginRight:6}]}><Text style={styles.bold}>{gymName}</Text></Text>
            </View>
          </View>
        </View>
        {
          eventInfo.status === CONSTS.WORKOUT_STATUS.PENDING ?
          <View style={{backgroundColor:'#D9D9D9'}}>
            <Text style={{marginTop:6,marginBottom:6,fontFamily:'System',fontWeight:'400',fontSize:12,textAlign:'center'}}>Pending Trainer Response...</Text>
          </View>
          :
          <View></View>
        }

        <View style={styles.rowBottom}>
          <TouchableHighlight onPress={()=> Actions.editBookingHome({workoutItem: eventInfo})} underlayColor='rgba(0,0,0,0)' style={[styles.rowBottomColumn, {flex:1,marginRight: 0,backgroundColor:DEFAULT_GREEN_COLOR}]}>
            <View style={{alignSelf:'center',flexDirection:'row',}}>
              <Image source={require('@images/edit-session-white.png')} />
              <Text style={{fontWeight:'700', fontSize:12,fontFamily:'System',color:'white'}}> Edit</Text>
              </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={()=> this.chat()} underlayColor='rgba(0,0,0,0)' style={[styles.rowBottomColumn, {flex:1,borderLeftWidth: 1, borderLeftColor: '#c0c0c0', marginRight: 0,backgroundColor:DEFAULT_GREEN_COLOR}]}>
            <View style={{alignSelf:'center',flexDirection:'row',}}>
              <Image source={require('@images/chat-session-white.png')} />
              <Text style={{fontWeight:'700', fontSize:12,fontFamily:'System',color:'white'}}> Chat</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

export default HomeViewWorkoutInfo
