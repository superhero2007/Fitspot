import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateCustomer, updateTrainer,deleteAttachment } from '@store/modules/auth/actions'
import FitnessGoals from '@Profile/components/FitnessGoals'


type Props = {
  user: Object,
  onUpdateClick: Function,
}

class FitnessGoalsContainer extends Component {

  props: Props
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <FitnessGoals {...this.props}/>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    allActivities: state.auth.appSettings.activities,
    editingStatus: state.auth.updatingStatus,
    deletingStatus: state.auth.deletingFileStatus
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateClick: (user) => {
      dispatch(updateCustomer(user))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(FitnessGoalsContainer)
