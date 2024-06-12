import React, { useState } from "react";
//import { useRoutes } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

function RegisterUser() {
  const [passwordMatch, setMatch] = useState(false);
  const [isPasswordEmpty, setEmpty] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const [cType, setCtype] = useState("password");
  const [cIcon, setCicon] = useState(eyeOff);

  const handleTogglePwd = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
    passwordValidation();
  };

  const handleToggleCnfPwd = () => {
    if (cType === "password") {
      setCicon(eye);
      setCtype("text");
    } else {
      setCicon(eyeOff);
      setCtype("password");
    }
    passwordValidation();
  };

  async function usernameValidation() {
    const userName = document.getElementById("userName").value;
    console.log(userName);
  }

  function passwordValidation() {
    const password = document.getElementById("password").value;
    const confPassword = document.getElementById("confirmPassword").value;
    console.log(password, confPassword);

    if (password != "" || confPassword != "") {
      setEmpty(false);
    } else {
      setEmpty(true);
      setMatch(false);
    }

    if (password === confPassword) {
      setMatch(true);
    } else {
      setMatch(false);
    }
  }
  return (
    <div className="container">
      <form className="row g-3 needs-validation min-height" noValidate>
        <h4 className="mt-4">User Registration Form</h4>
        <div className="col-md-4">
          <label className="form-label fw-bold">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter Name"
            required
          />
          <div className="invalid-feedback">Enter Name</div>
        </div>
        <div></div>
        {/*<!--div id="isValidName"></div-->*/}
        <div className="col-md-4">
          <label className="form-label fw-bold">User Name</label>
          <input
            type="text"
            className="form-control"
            id="userName"
            placeholder="Enter Unique User Name"
            onChange={usernameValidation}
            required
          />
          <div className="invalid-feedback">Enter Unique username</div>
        </div>
        <div id="availabilityDiv"></div>
        <div className="col-md-4">
          <label className="form-label fw-bold">Password</label>
          <div className="input-group has-validation">
            <input
              type={type}
              name="password"
              className="form-control"
              id="password"
              value={password}
              placeholder="Enter Password"
              onChange={(e) => {
                setPassword(e.target.value);
                passwordValidation();
              }}
              autoComplete="current-password"
              required
            />
            <span
              class="flex justify-around items-center"
              onClick={handleTogglePwd}
            >
              <Icon class="absolute mr-10 p-lg-2" icon={icon} size={15} />
            </span>
            <div className="invalid-feedback">Enter Password</div>
          </div>
        </div>
        <div></div>
        <div className="col-md-4">
          <label className="form-label fw-bold">Confirm Password</label>
          <div className="input-group has-validation">
            <input
              type={cType}
              name="confirmPassword"
              className="form-control"
              id="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm password"
              onChange={(e) => {
                setConfPassword(e.target.value);
                passwordValidation();
              }}
              autoComplete="current-password"
              required
            />
            <span
              class="flex justify-around items-center"
              onClick={handleToggleCnfPwd}
            >
              <Icon class="absolute mr-10 p-lg-2" icon={cIcon} size={15} />
            </span>
          </div>
          <div className="invalid-feedback">Enter Confirm Password</div>
        </div>
        <div id="passwordmatchDiv"></div>
        <div id="divpwdtxt" className="text">
          {isPasswordEmpty ? (
            <p>Password and Confirm Password are required</p>
          ) : passwordMatch ? (
            <p>Password Matches</p>
          ) : (
            <p>Password and Confirm Password does not match</p>
          )}
        </div>
        <div className="col-12">
          {/*<!--input type="button" id="addUserBtn" value="Register" class="btn btn-primary"-->*/}
          <button className="btn btn-primary" type="submit" id="addUserBtn">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
export default RegisterUser;
