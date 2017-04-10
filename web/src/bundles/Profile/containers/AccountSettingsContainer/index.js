import React, {Component} from 'react'
import {connect} from 'react-redux'
import AccountSettings from '@Profile/components/AccountSettings'
import {ACCOUNT_SETTINGS_FORM} from '@Profile/components/AccountSettings/AccountSettingsForm';
import * as Actions from '@shared/actions';
import ApiUtils from '@utils/ApiUtils';
import update from 'immutability-helper';
import CONSTS from '@utils/Consts';
import { resetPassword } from '@store/modules/auth/actions'
import {reset} from 'redux-form';


type Props = {
  resetPassword: Function,
  resetForm: Function,
}

class AccountSettingsContainer extends Component {
  props: Props
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      alert("Save failed: " + nextProps.error);
    } else if (!nextProps.isFetching && !nextProps.error) {
      alert("Password Changed!")
      this.props.resetForm();
    }
  }

  handleSubmit(form) {
    this.props.resetPassword(form.oldPassword, form.newPassword);
  }
  render() {
    return (<AccountSettings
              handleSubmit = {this.handleSubmit}
              {...this.props}/>)
  }

}

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    appSettings: state.auth.appSettings,
    isFetching: state.auth.isFetching,
    user: state.auth.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetPassword: (oldPassword, newPassword) => {
      dispatch(resetPassword(oldPassword, newPassword))
    },
    resetForm: () => {
      dispatch(reset(ACCOUNT_SETTINGS_FORM));
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AccountSettingsContainer)
