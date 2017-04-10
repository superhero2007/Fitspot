import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Input from '@shared/components/Form/Input';
import InlineButtonList from '@shared/components/Form/InlineButtonList';
import CONSTS from '@utils/Consts';

const validate = (values) => {
  const errors = {};
  if (!values.promocode) {
    errors.promocode = 'Required';
  }

  return errors;
};

const ApplyPromoForm = (props) => {
  const { handleSubmit, isFetching, error } = props;
  return (
    <div className="form-group">
      <form onSubmit={handleSubmit}>
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <Field name="promocode" label="PROMO CODE - Optional" type="text" component={Input} />
        <button type="submit" className="btn btn-info btn-lg btn-block" disabled={isFetching}>Apply Promo Code</button>
      </form>
    </div>
  );
};

const form = reduxForm({
  form: 'ApplyPromoForm',
  validate,
})(ApplyPromoForm);

const mapStateToProps = (state) => {
  return {
  };
}

export default connect(mapStateToProps)(form);
