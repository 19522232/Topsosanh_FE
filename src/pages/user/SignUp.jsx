import React from "react";
import "./signup.scss";

import SignUpForm from "../../components/signupform/SignUpForm";

function SignUp() {
  return (
    <div className="SignUp">
      <div className="SignUp__container">
        <h2 className="font-face-qsb">Create an account</h2>

        <SignUpForm />
      </div>
    </div>
  );
}

export default SignUp;
