import React, {Component, PropTypes} from 'react';
import Trainer from './Trainer';
import CONSTS from '@utils/Consts'
import { find, filter } from 'lodash'
import InlineButtonList from '@shared/components/Form/InlineButtonList';

type Props = {
    trainers: Object,
    activities: Array,
    bookingState: Object,
    selectTrainer: Function,
}
const GENDER_LIST = [
  {
    label: 'Any',
    value: CONSTS.GENDER.UNSPECIFIED,
  },
  {
    label: 'Male',
    value: CONSTS.GENDER.MALE,
  },
  {
    label: 'Female',
    value: CONSTS.GENDER.FEMALE,
  },
];
class ChooseTrainer extends React.Component {
    constructor(props) {
        super(props);
        var currentStep = this.props.bookingState.currentStep
        var totalSteps = this.props.bookingState.totalSteps

        this.state = {
            currentStep: currentStep,
            totalSteps: totalSteps,
            activities: this.props.activities,
            selectedTrainer: {},
            trainers: this.props.trainers,
            selectedGender: 2,
        }
    }

    renderTrainers() {
      var isFetching = this.props.bookingState.isFetching;
      if(isFetching) {
        return (
          <div className="row">
            <div className="loader col-xs-offset-5 col-md-offset-6" style={{display: isFetching ? 'inline-block' : 'none'}} />
          </div>
        )
      }
      var trainers = this.props.trainers

      if(this.props.bookingState.bookingType == CONSTS.BOOKING_TYPE.BY_ACTIVITY){
        var fcTrainer = {
          firstName: 'Fitspot',
          lastName: 'Choose',
          id: -1,
          bio: "Fitspot will send an express message to all of our trainers to find you one at your selected time",

        };
        var foundTrainer = find(trainers, (trainer) => {
          return trainer.id === -1;
        });
        if(!foundTrainer) {
          trainers.unshift(fcTrainer);
        }
      }
      //console.log(trainers);
      if(this.state.selectedGender !== CONSTS.GENDER.UNSPECIFIED){
        trainers = filter(trainers, (trainer) => {
          return trainer.gender === this.state.selectedGender
        });
      }
      if(trainers.length === 0) {
        return   (
          <div className="col-xs-12 col-sm-6 col-sm-offset-3 text-center settings">
                <h3>No trainers available matching your criteria</h3>
          </div>
        );
      } else {
        return trainers.map(trainer => <Trainer key={trainer.id} trainer={trainer} {...this.props}/>);
      }

    }
    onGenderSelect(gender) {
      this.setState({selectedGender: gender})
    }
    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="text-center">
                            <h2 className="fw500 marginBottom20">Choose Trainer</h2>
                        </div>
                    </div>

                    <div className="col-xs-12 col-sm-6 col-sm-offset-3 text-center settings">

                      <InlineButtonList input={{"name":"trainer.gender","value":this.state.selectedGender,
                        onChange: this.onGenderSelect.bind(this)}}
                        values={GENDER_LIST}></InlineButtonList>

                    </div>
                </div>
                <div className="row">
                    {this.renderTrainers()}
                </div>
                {/*<div className="row text-center marginBottom50">
                    <div className="col-xs-12 col-sm-4  col-sm-offset-4">
                        <a href="#" className="btn btn-info btn-lg btn-block disabled">Load More Trainers</a>
                    </div>
                </div>
                */}
            </div>
        );
    }
}

export default ChooseTrainer;
