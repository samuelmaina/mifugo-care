import React, { useState } from 'react';
import { AssertAndValidateSignup } from '../../utils/validate';
import { Signup, useAuthDispatch, useAuthState } from '../../context';
import { InputField, SelectField } from '../../components';
import '../styling/css/interface.css';

export const Aside = () => {
  return (
    <div className="div-aside">
      <p>Experience longlife Service</p>
      <div className="common">
        <div>
          <span>&#10004;</span> world class vetCare
        </div>
        <div>
          <span>&#10004;</span> immediate Feedback
        </div>
        <div>
          <span>&#10004;</span> 24/7 consultation
        </div>
        <div>
          <span>&#10004;</span> standards procedures
        </div>
      </div>
    </div>
  );
};

export const SignUp = (props) => {
  const dispatch = useAuthDispatch();

  const { loading, errorMessage } = useAuthState();

  const PostSignup = async (e) => {
    e.preventDefault();
    const grp = document.querySelector('select').value;

    const payload = {
      groupLevel: grp,
      fullName: fullName,
      email: email,
      password: password,
    };

    if (password !== confirmPassword) {
      dispatch({ type: 'APIACCESS_ERROR', error: 'Password Match Error' });
      return;
    }

    let validation_info = AssertAndValidateSignup(payload);

    if (validation_info === 'valid') {
      let response = await Signup(dispatch, payload);

      if (response) props.history.push('/login');
    } else {
      dispatch({ type: 'APIACCESS_ERROR', error: validation_info });
    }
    
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [groupLevel, setGroup] = useState('');

  return (
    <React.Fragment>
      <h1>Join World's best Vet Network</h1>
      <div className="app">
        <div className="form-div">
          <form>
            <div>
              <SelectField setGroup={setGroup} selected={groupLevel} />
              <InputField
                type={'name'}
                name={'fullName'}
                placeholder={'fullname'}
                setField={setFullName}
              />
              <InputField
                type={'email'}
                name={'email'}
                placeholder={'Email'}
                setField={setEmail}
              />
              <InputField
                type={'password'}
                name={'password'}
                placeholder={'password'}
                setField={setPassword}
              />
              <InputField
                type={'password'}
                name={'confirmPassword'}
                placeholder={'confirm password'}
                setField={setConfirmPassword}
              />
            </div>
            <button
              data-testid="submit-button"
              style={{ color: 'black' }}
              onClick={(e) => PostSignup(e)}
            >
              Apply to Join {loading ? '...' : null}
            </button>
          </form>
          {errorMessage ? (
            <p className="errorField" role="alert">
              {errorMessage}
            </p>
          ) : null}
        </div>
        <Aside />
      </div>
    </React.Fragment>
  );
};
