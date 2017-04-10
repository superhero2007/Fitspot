import React, { PropTypes } from 'react';
import CalendarHeader from '../calendar/CalendarHeader';
import DateTable from '../date/DateTable';
import { getTimeConfig } from '../util/index';
import ReactDOM from 'react-dom';

const CalendarPart = React.createClass({
  propTypes: {
    value: PropTypes.any,
    direction: PropTypes.any,
    prefixCls: PropTypes.any,
    locale: PropTypes.any,
    selectedValue: PropTypes.any,
    hoverValue: PropTypes.any,
    showTimePicker: PropTypes.bool,
    format: PropTypes.any,
    placeholder: PropTypes.any,
    disabledDate: PropTypes.any,
    timePicker: PropTypes.any,
    disabledTime: PropTypes.any,
    onInputSelect: PropTypes.func,
    timePickerDisabledTime: PropTypes.object,
    workoutItems: PropTypes.any,
  },

  componentDidUpdate() {
    if (this.props.selectedWorkoutValue && this.props.flag) {
      const node = this['calendar']
      const domNode = ReactDOM.findDOMNode(node);
      domNode.scrollIntoView();
    }
  },

  render() {
    const props = this.props;
    const {
      value, direction, prefixCls,
      locale, selectedValue, format, placeholder,
      disabledDate, timePicker, disabledTime,
      timePickerDisabledTime, showTimePicker,
      hoverValue, onInputSelect, workoutItems
    } = props;
    
    const disabledTimeConfig = showTimePicker && disabledTime && timePicker ?
      getTimeConfig(selectedValue, disabledTime) : null;
    const rangeClassName = `${prefixCls}-range`;
    const newProps = {
      locale,
      value,
      prefixCls,
      showTimePicker,
    };
    const index = (direction === 'left') ? 0 : 1;

    const timePickerEle = showTimePicker && timePicker &&
      React.cloneElement(timePicker, {
        showHour: true,
        showMinute: true,
        showSecond: true,
        ...timePicker.props,
        ...disabledTimeConfig,
        ...timePickerDisabledTime,
        onChange: onInputSelect,
        defaultOpenValue: value,
        value: selectedValue[index],
      });

    return (
      <div className={`${rangeClassName}-part ${rangeClassName}-${direction}`} >
        <div style={{ outline: 'none' }} ref={(input) => { this['calendar'] = input; }}>
          <CalendarHeader
            {...newProps}
            enableNext={direction === 'right'}
            disableMiddle={direction === 'middle'}
            enablePrev={direction === 'left'}
            direction={direction}
            onValueChange={props.onValueChange}
          />
          <div className={`${prefixCls}-body`}>
            <DateTable
              {...newProps}
              hoverValue={hoverValue}
              selectedValue={selectedValue}
              dateRender={props.dateRender}
              onSelect={props.onSelect}
              onDayHover={props.onDayHover}
              disabledDate={disabledDate}
              showWeekNumber={props.showWeekNumber}
              workoutItems={workoutItems}
              selectedWorkoutValue={this.props.selectedWorkoutValue}
              flag={props.flag}
            />
          </div>
        </div>
      </div>);
  },
});

export default CalendarPart;
