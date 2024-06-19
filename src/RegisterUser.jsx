import React, { useState } from "react";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";

function RegisterUser() {
  const [passwordMatch, setMatch] = useState(false);
  const [isPasswordEmpty, setEmpty] = useState(true);
  const [uName, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [isNameEmpty, setNameEmpty] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const [cType, setCtype] = useState("password");
  const [cIcon, setCicon] = useState(eyeOff);
  const [isComplete, setIsComplete] = useState(false);
  const [isUsernameavailable, setIsUsernameavailable] = useState(false);
  const [initialFlag, setInitialFlag] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleTogglePwd = () => {
    setType((prevType) => (prevType === "password" ? "text" : "password"));
    passwordValidation();
  };

  const handleToggleCnfPwd = () => {
    setCtype((prevCType) => (prevCType === "password" ? "text" : "password"));
    passwordValidation();
  };

  const fetchUsernames = async (username) => {
    try {
      const response = await fetch(
        `http://localhost:8083/api/username_available/${username}`
      );
      const data = await response.json();
      setIsUsernameavailable(data.available);
      setInitialFlag(false);
    } catch (error) {
      console.error("Error fetching usernames:", error);
    }
  };

  function passwordValidation() {
    const password = document.getElementById("password").value;
    const confPassword = document.getElementById("confirmPassword").value;

    if (password !== "" || confPassword !== "") {
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

  const validateName = (name) => {
    if (name !== "") {
      setNameEmpty(false);
      setName(name);
    } else {
      setNameEmpty(true);
    }
  };

  const addUser = () => {
    setShowConfirmation(true);
  };

  const confirmAddUser = () => {
    fetch("http://localhost:8083/api/users", {
      method: "POST",
      body: JSON.stringify({
        id: "",
        name: uName,
        username: userName,
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setIsComplete(true);
        cleanUp();
      })
      .catch((err) => {
        console.error("Error registering user:", err.message);
        setIsComplete(false);
      })
      .finally(() => {
        setShowConfirmation(false);
      });
  };

  function cleanUp() {
    document.getElementById("name").value = "";
    document.getElementById("userName").value = "";
    setName("");
    setUserName("");
    setPassword("");
    setConfPassword("");
    setIcon(eyeOff);
    setCicon(eyeOff);
    setType("password");
    setCtype("password");
    setEmpty(true);
    setMatch(false);
    setNameEmpty(true);
    setIsComplete(false);
    setIsUsernameavailable(false);
    setInitialFlag(true);
  }

  function getIsFormValid() {
    return passwordMatch && isUsernameavailable && !isNameEmpty;
  }

  return (
    <div className="container min-height">
      <form className="row g-3 needs-validation min-height" noValidate>
        <h5 className="mt-4">User Registration Form</h5>
        <div className="col-md-4">
          <label className="form-label fw-bold">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter Name"
            required
            onChange={(e) => validateName(e.target.value)}
          />
          {isNameEmpty && <p>Name is Required</p>}
        </div>
        <div></div>
        <div className="col-md-4">
          <label className="form-label fw-bold">User Name</label>
          <input
            type="text"
            className="form-control"
            id="userName"
            placeholder="Enter Unique User Name"
            onChange={(e) => {
              const value = e.target.value;
              fetchUsernames(value);
              setUserName(value);
            }}
            required
          />
          {!initialFlag && (
            <p>
              {isUsernameavailable
                ? "User Name Available"
                : "User Name is already in Use, please try with different one"}
            </p>
          )}
        </div>
        <div></div>
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
              className="flex justify-around items-center"
              onClick={handleTogglePwd}
            >
              <Icon icon={icon} size={15} />
            </span>
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
              className="flex justify-around items-center"
              onClick={handleToggleCnfPwd}
            >
              <Icon icon={cIcon} size={15} />
            </span>
          </div>
          <div id="divpwdtxt" className="text">
            {isPasswordEmpty ? (
              <p>Password and Confirm Password are required</p>
            ) : passwordMatch ? (
              <p>Password Matches</p>
            ) : (
              <p>Password and Confirm Password does not match</p>
            )}
          </div>
        </div>
        <div className="col-12">
          <Button
            className="btn btn-primary"
            type="button"
            id="addUserBtn"
            disabled={!getIsFormValid()}
            onClick={addUser}
          >
            Register
          </Button>
        </div>
      </form>

      {/* Confirmation Modal */}
      <Modal
        show={showConfirmation}
        onHide={() => setShowConfirmation(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Confirm User Registration
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg bg-danger-subtle">
          Are you sure you want to register this user?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={confirmAddUser}>
            Register User
          </Button>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmation(false)}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default RegisterUser;
