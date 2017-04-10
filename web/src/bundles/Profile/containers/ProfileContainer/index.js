import React, {Component} from 'react'
import {connect} from 'react-redux'
import Profile from '@Profile/components/Profile'
import * as Actions from '@shared/actions';

type Props = {
    user: Object,
    isFetching: bool
};
class ProfileContainer extends Component {
    props: Props;
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            alert(nextProps.error);
        } else if (!nextProps.isFetching && !nextProps.error) {
            Actions.home();
        }
    }

    render() {
        return (<Profile {...this.props}/>)
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        error: state.auth.error,
        isFetching: state.auth.isFetching,
    }
};

export default connect(mapStateToProps, null)(ProfileContainer)
