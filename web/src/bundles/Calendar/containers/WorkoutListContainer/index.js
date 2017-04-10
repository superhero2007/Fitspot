import React, {Component} from 'react'
import {connect} from 'react-redux'
import WorkoutList from '@Calendar/components/WorkoutList'
import * as Actions from '@shared/actions';
import ApiUtils from '@utils/ApiUtils';
import { fetchWorkouts } from '@store/modules/workouts/actions';

type Props = {
  calendarState: Object,
}

class WorkoutListContainer extends Component {
  props: Props
  constructor(props) {
    super(props);
    this.props.fetchWorkouts();
  }
  render() {
    return (<WorkoutList
              {...this.props}/>)
  }

}

const mapStateToProps = (state) => {
  return {
    calendarState: state.calendar,
    workoutItems: state.workouts.workoutItems,

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchWorkouts: () => dispatch(fetchWorkouts())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WorkoutListContainer)
