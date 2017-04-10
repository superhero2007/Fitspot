import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Input from '@shared/components/Form/Input';
import InlineButtonList from '@shared/components/Form/InlineButtonList';
import CONSTS from '@utils/Consts';


const validate = (values) => {
  const errors = {};
  if (values.oldPassword && !values.newPassword) {
    errors.newPassword = 'Enter your new password';
  }
  if (values.oldPassword === values.newPassword) {
    errors.newPassword = 'New password cannot be same as old one';
  }
  if (values.newPassword && values.newPassword !== values.newConfirmPassword) {
    errors.newConfirmPassword = 'Confirm Password does not match';
  }

  return errors;
};
export const ACCOUNT_SETTINGS_FORM = 'AccountSettingsForm';

const AccountSettingsForm = (props) => {
  const { handleSubmit, isFetching, error } = props;
  console.log(props);
  return (
    <form onSubmit={handleSubmit}>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input type="email" className="form-control" id="emailInput" disabled="true" placeholder="" value={props.user.email}/>
      </div>
      <Field name="oldPassword" label="Old Password" type="password" component={Input} className="form-group" />
      <Field name="newPassword" label="New Password" type="password" component={Input} className="form-group" />
      <Field name="newConfirmPassword" label="Confirm New Password" type="password" component={Input} className="form-group" />
      <button type="submit" className="btn btn-info btn-lg btn-block" disabled={isFetching}>Save Changes</button>
    </form>
  );
};

const form = reduxForm({
  form: ACCOUNT_SETTINGS_FORM,
  validate,
})(AccountSettingsForm);

const mapStateToProps = (state) => {
  return {
    initialValues: state.auth.user,
  };
}

export default connect(mapStateToProps)(form);
