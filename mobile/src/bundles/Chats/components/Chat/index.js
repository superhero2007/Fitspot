import React, {Component} from 'react'
import {GiftedChat} from 'react-native-gifted-chat';
import {View, Image, Text, StatusBar, TouchableHighlight,ListView,ActivityIndicator} from 'react-native'


type Props = {
  sessionId: String,
  messages: Array,
  userId: Integer,
  isFetching: Boolean,
}

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: props.messages
    };
    this.onSend = this.onSend.bind(this);
  }

  componentDidMount(){
  }

  componentWillUnmount(){
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.messages.length > this.state.messages){
      this.setState({messages: nextProps.messages})
    }
  }

  onSend(messages = []) {
    this.props.sendMessage({sessionId:this.props.sessionId, message: messages[0].text})
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages)
      };
    });
  }
  render() {
    return (
      <View style={{flex:1,marginBottom: 50,marginTop:65}}>
        { (!this.props.isFetching) ?
          <GiftedChat messages={this.state.messages} onSend={this.onSend.bind(this)} user={{_id: this.props.userId}} />
          :
          <ActivityIndicator color="#4C4C4C" size='large' style={{position:'absolute',top:0,bottom:0,left:0,right:0}} />
        }

      </View>
    );
  }
}

export default Chat
