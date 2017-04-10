import React, { Component } from 'react'
import EditBookingContainer from '@Booking/containers/EditBookingContainer'


type Props = {
  workoutItem: Object
}


class EditBookingScene extends Component {

  props: Props


  render() {
    return (
      <EditBookingContainer workoutItem={this.props.workoutItem}  />
    )
  }

}


export default EditBookingScene
