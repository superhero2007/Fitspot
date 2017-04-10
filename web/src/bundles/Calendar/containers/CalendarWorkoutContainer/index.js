import React, {Component} from 'react'
import {connect} from 'react-redux'
import WorkoutListContainer from '@Calendar/containers/WorkoutListContainer'
import CalendarContainer from '@Calendar/containers/CalendarContainer'
import * as Actions from '@shared/actions';
import ApiUtils from '@utils/ApiUtils';
import { fetchWorkouts } from '@store/modules/workouts/actions';

type Props = {
  calendarState: Object,
}

class CalendarWorkoutContainer extends Component {
  props: Props
  constructor(props) {
    super(props);
    this.props.fetchWorkouts();
    this.state = {
      selectedWorkoutValue: '',
      flag: false,
    }
    this.onWorkoutSelect = this.onWorkoutSelect.bind(this);
  }

  onWorkoutSelect(value, flag) {
    if (value) {
      this.setState({
        selectedWorkoutValue: value,
        flag: flag,
      });
    }
  }

  render() {
    return (
        <div>
          <CalendarContainer 
            selectedWorkoutValue={this.state.selectedWorkoutValue} 
            flag={this.state.flag}
            onWorkoutSelect={this.onWorkoutSelect}
            {...this.props} 
          />
          <WorkoutListContainer 
            selectedWorkoutValue={this.state.selectedWorkoutValue} 
            flag={this.state.flag}
            onWorkoutSelect={this.onWorkoutSelect}
            {...this.props} 
          />
        </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    calendarState: state.calendar,
    workoutItems: state.workouts.workoutItems,
    activities: state.auth.appSettings.activities,

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchWorkouts: () => dispatch(fetchWorkouts())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CalendarWorkoutContainer)

