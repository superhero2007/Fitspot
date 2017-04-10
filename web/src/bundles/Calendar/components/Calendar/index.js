import React from 'react';
import moment from 'moment';
import Calendar from '@RC-calendar/Calendar';
import '../../assets/index.css';

class CalendarComponent extends React.Component {

  render() {
    return (
      <Calendar { ...this.props} />
    )
  }
}

export default CalendarComponent;
