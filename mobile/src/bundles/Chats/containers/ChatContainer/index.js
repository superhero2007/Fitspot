import React, { Component } from 'react'
import { connect } from 'react-redux'
import Chat from '@Chat/components/Chat'
import {Actions} from 'react-native-router-flux'
import { sendMessage, sendReadMessages, fetchChatMessages } from '@store/modules/chat/actions'

type Props = {
  sessionId: String,
  name:String,
  sendMessage: Function,
  getOlderMessages: Function,
  userId: Integer,
  sendReadMessages:Function,
  isFetching:Boolean,
}


class ChatContainer extends Component {

  props: Props

  constructor(props){
    super(props)
    this.state = {
      messages: [],
    }
    this.props.fetchChatMessages();
  }

  componentDidMount(){
    Actions.refresh({title: this.props.name})
    this.props.sendReadMessages();
  }

  componentWillReceiveProps(nextProps){
    if((typeof nextProps.messages !== 'undefined' ) && nextProps.messages.length > this.state.messages){
      this.setState({messages: nextProps.messages})
    }
  }

  render() {
    return (
      <Chat {...this.props} {...this.state}/>
    )
  }

}

const mapStateToProps = (state,ownProps) => {
  return {
    userId: state.auth.user.id,
    messages: state.chat.sessions[ownProps.sessionId],
    isFetching: state.chat.isFetching,
  }
}

const mapDispatchToProps = (dispatch,ownProps) => {
  return {
    sendMessage: (message) => {
      dispatch(sendMessage(message))
    },
    sendReadMessages: () => {
      dispatch(sendReadMessages(ownProps.sessionId))
    },
    fetchChatMessages: () => {
      dispatch(fetchChatMessages(ownProps.sessionId))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ChatContainer)
