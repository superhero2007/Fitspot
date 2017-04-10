import ReactDOM from 'react-dom';
import React from 'react';
import moment from 'moment'

class WorkoutList extends React.Component {

  componentDidUpdate() {
    if (this.props.selectedWorkoutValue && !this.props.flag) {
      const key = this.props.selectedWorkoutValue;
      const node = this[key]
      const domNode = ReactDOM.findDOMNode(node);
      if(domNode) {
        domNode.scrollIntoView();
      }
    }
  }

  render() {
    const workoutItems = this.props.workoutItems;
    const activities = this.props.activities;
    const workoutObj = {};
    const activityObj = {};
    var workoutList = [];
    for(let i=0;i<workoutItems.length;i++) {
      let date = workoutItems[i].date.slice(0,10)
      if(workoutObj[date])
        workoutObj[date].push(workoutItems[i]);
      else {
        workoutList.push(date);
        workoutObj[date] = [];
        workoutObj[date].push(workoutItems[i]);
      }
    }
    workoutList = _.sortBy(workoutList).reverse();
    for(let i=0;i<activities.length;i++) {
      activityObj[activities[i].id] = activities[i].name;
    }
    return (
      <div className="container">
        {
          workoutList.map((item, index) => (
            <div className="container paddingTop50 cursor-pointer" key={ index } ref={(input) => { this[item] = input; }} onClick={() => this.props.onWorkoutSelect(item, true)}>
              <div className="row">
                <div className="col-xs-12">
                  <div className="text-center">             
                    <h2 className="marginBottom20">{moment(item).format("DD MMMM YYYY") }</h2>              
                  </div>                
                </div>           
              </div>
              {
                workoutObj[item].map((item, index) => (
                  <div className="row text-center workout-details" key={ index }>
                    <div className="col-1">
                      <p className="info-boxes"><small>DATE & TIME</small><strong>{moment(item.date).format("ddd DD h:mmA") }</strong></p>
                    </div>         
                    <div className="col-2">
                      <p className="info-boxes"><small>TRAINER</small><strong>{item.trainer.firstName} {item.trainer.lastName}</strong></p> 
                    </div>  
                    <div className="col-3">
                      <p className="info-boxes"><small>ACTIVITY</small><strong>{activityObj[item.activityId]}</strong></p>
                    </div>  
                    <div className="col-4">
                      <p className="info-boxes"><small>LOCATION</small><strong>{item.city}</strong></p>
                    </div> 
                    <div className="col-5">
                      <p className="info-link-1"><a href="#">Rebook Chad</a></p>
                      <p className="info-link-2"><a href="#">Workout Info</a></p>
                    </div>                
                  </div>
                )
              )}
            </div>
          )
        )}
      </div>
    );
  }
}

export default WorkoutList;
