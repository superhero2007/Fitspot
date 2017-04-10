import React, { Component, PropTypes } from 'react';
import { join, map } from 'lodash';
import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR,DEFAULT_GREY_COLOR} from '@theme/colors'

const Trainer = (props) => {
  const { trainer, onChooseTrainer } = props;
  //console.log(props);
  var trainerActivities = trainer.trainer && trainer.trainer.activities ? join(map(trainer.trainer.activities, 'name'), ", ") : 'Any Activity';
  var firstName = props.trainer.firstName;
  var lastName =  trainer.id === -1 ? props.trainer.lastName : props.trainer.lastName[0];
  var trainerName =  firstName + " " + lastName

  return (
    <div
        className="col-xs-12 col-sm-6 col-md-3"
        onClick={() => onChooseTrainer(trainer)}>
        <a href="#">
          <div className="book-trainer-profile text-center">
            <p className="trainer-note-container">

                <span className="trainer-note">Available at 2:00 pm (2h later)</span>
                {
                  trainer.id === -1 ?
                  <img
                      className="trainer-profile-avator"
                      src={require('@assets/img/fitspot-white.svg')} height='180px'
                      style={{backgroundColor: DEFAULT_GREEN_COLOR, padding: '50px'}}/>
                        :
                  <img
                      className="trainer-profile-avator"
                      src={ trainer.avatar ? trainer.avatar.url:
                        require('../../assets/trainer-placeholder-1.jpg')}
                        height='180px'/>
                }

            </p>
            <h3>{trainerName}</h3>
            <div className="rating-stars">

                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star-empty" aria-hidden="true"></i>
            </div>

            <p className="trainer-details">{props.trainer.trainer ? props.trainer.trainer.bio : props.trainer.bio}</p>
            <p>
                <strong>{trainerActivities}</strong>
            </p>
            <hr/>
            <p className="certifications">TRAINER ID</p>
            <p className="certification-items">{props.trainer.id === -1 ? 'Not Available' : props.trainer.publicId}</p>
        </div>
        </a>
    </div>
  );
}

export default Trainer;
