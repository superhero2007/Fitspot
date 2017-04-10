import React from 'react';
import * as Actions from '@shared/actions';
import moment from 'moment';

class Profile extends React.Component {

    constructor(props){
        console.log(props);
        super(props);
    }

    render() {
        const age = parseInt(moment("1978-01-01", "YYYY-MM-DD").month(0).from(moment().month(0))); //calculate age
        const {user} = this.props;
        const {customer} = user;

        return(
            <div className="container">

                <div className="row marginBottom50">

                    <div className="col-xs-12 kill-left-padding kill-right-padding">

                        <img src={require("@assets/img/profile.jpg")} className="img-responsive profile-picture" alt="consumer-name-here" />

                    </div>

                    <div className="col-xs-12 profile-row text-center">

                        <h1><span>000</span>{customer.numWorkouts}<small>WORKOUTS</small></h1>

                    </div>

                    <div className="col-xs-12 profile-row text-center">

                        <h1 className="item-1">{age}<span>y</span><small>AGE</small></h1>
                        <h1 className="item-2">{customer.height / 100}<span>m</span><small>TALL</small></h1>
                        <h1 className="item-3">{customer.weight}<span>lb</span><small>THIN</small></h1>

                    </div>

                    <div className="col-xs-12 col-sm-6 profile-row">

                        <h2><small>FITNESS GOAL</small>Get Stroger / Get Lean & Toned</h2>

                    </div>

                    <div className="col-xs-12 col-sm-6 profile-row">

                        <h2><small>FITNESS LEVEL</small>I work out a few times / week</h2>

                    </div>

                    <div className="col-xs-12 col-sm-6 profile-row">

                        <h2><small>BODY FOCUS</small>Back, Abdominals & Legs</h2>

                    </div>

                    <div className="col-xs-12 col-sm-6 profile-row">

                        <h2><small>PREFERRED TRAINER</small>Educator / Teacher, Any Gender</h2>

                    </div>

                    <div className="col-xs-12 col-sm-6 profile-row">

                        <h2><small>MEDICAL ISSUES</small>Lower Back Pain</h2>

                    </div>

                    <div className="col-xs-12 col-sm-6 profile-row">

                        <h2><small>FITSPOT AVERAGE</small>~3 Workouts / Week</h2>

                    </div>

                </div>

                <div className="row text-center">
                    <div className="col-xs-12 col-sm-4  col-sm-offset-4">

                        <a href="#" onClick={Actions.editProfile} className="btn btn-info btn-lg btn-block">Edit Profile</a>

                    </div>
                </div>

            </div>
        )
    }

}

export default Profile;
