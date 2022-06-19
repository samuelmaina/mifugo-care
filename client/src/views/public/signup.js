import React, { useState } from "react";
import * as utils from "../../utils";
import { UploadData, useAuthDispatch, useAuthState } from "../../context";
import * as Styled from "../../components";
import "../styling/css/interface.css";

import Modal from "./Modal";

export const Aside = () => {
  return (
    <Styled.Divaside className="div-aside">
      <p>Experience longlife Service</p>
      <div className="common">
        <Styled.Asidecontent>
          <span>&#10004;</span> world class vetCare
        </Styled.Asidecontent>
        <Styled.Asidecontent>
          <span>&#10004;</span> immediate Feedback
        </Styled.Asidecontent>
        <Styled.Asidecontent>
          <span>&#10004;</span> 24/7 consultation
        </Styled.Asidecontent>
        <Styled.Asidecontent>
          <span>&#10004;</span> standards procedures
        </Styled.Asidecontent>
      </div>
    </Styled.Divaside>
  );
};

export const SignUp = (props) => {
  const dispatch = useAuthDispatch();

  const { loading } = useAuthState();

  function clearData() {
    utils.clearContextErrors(dispatch);
    utils.clearLocalStorage("group");
  }
  const PostSignup = async (e) => {
    e.preventDefault();
    const grp = document.querySelector("select").value;
    const payload = {
      name: fullName,
      email: email,
      password: password,
    };

    let validation_info = utils.AssertAndValidateSignup(payload);

    if (password !== confirmPassword) {
      dispatch({ type: "APIACCESS_ERROR", error: "Password Match Error" });
      return;
    }

    const path = `/auth/sign-up/${grp}`;
    if (validation_info === "valid") {
      <Modal />;
      let response = await UploadData(dispatch, payload, path);
      const { vetLogin, rootLogin } = utils.paths;

      if (response && (groupLevel || grp) === "vet") {
        clearData();
        props.history.push(vetLogin);
      } else if (response && (grp || groupLevel) === "client") {
        clearData();
        props.history.push(rootLogin);
      }
    } else {
      dispatch({ type: "APIACCESS_ERROR", error: validation_info });
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [groupLevel, setGroup] = useState("");

  return (
    <React.Fragment>
      <Styled.AuthH1>Join World's best Vet Network</Styled.AuthH1>
      <Styled.AppSignup className="app">
        <Styled.Formdiv className="form-div">
          <form>
            <div>
              <div style={{ margin: "2rem" }}>
                <p>Want to join as:</p>
                <Styled.SelectField setGroup={setGroup} selected={groupLevel} />
              </div>

              <Styled.InputField
                width={"90%"}
                type={"name"}
                name={"fullName"}
                placeholder={"fullname"}
                setField={setFullName}
              />
              <Styled.InputField
                width={"90%"}
                type={"email"}
                name={"email"}
                placeholder={"Email"}
                setField={setEmail}
              />
              <Styled.InputField
                width={"90%"}
                type={"password"}
                name={"password"}
                placeholder={"password"}
                setField={setPassword}
              />
              <Styled.InputField
                width={"90%"}
                type={"password"}
                name={"confirmPassword"}
                placeholder={"confirm password"}
                setField={setConfirmPassword}
              />
            </div>
            <button data-testid="submit-button" onClick={(e) => PostSignup(e)}>
              Apply to Join {loading ? "..." : null}
            </button>
          </form>
          <utils.ViewErrorMessage />
        </Styled.Formdiv>
        <Aside />
      </Styled.AppSignup>
    </React.Fragment>
  );
};
