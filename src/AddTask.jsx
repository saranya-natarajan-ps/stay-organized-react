import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function AddTask() {
  const [userList, setUserList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [taskComplete, setTaskComplete] = useState(false);
  const [initialflag, setInitialFlag] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8083/api/users")
      .then((response) => response.json())
      .then((data) => setUserList(data))
      .catch((error) => console.error("Error fetching user list:", error));

    fetch("http://localhost:8083/api/categories")
      .then((response) => response.json())
      .then((data) => setCategoryList(data))
      .catch((error) => console.error("Error fetching category list:", error));
  }, []);

  function addTask() {
    setInitialFlag(false);
    fetch("http://localhost:8083/api/todos", {
      method: "POST",
      body: JSON.stringify({
        id: "",
        userid: document.getElementById("userList").value,
        category: document.getElementById("categoryList").value,
        description: document.getElementById("description").value,
        deadline: document.getElementById("deadline").value,
        priority: document.getElementById("priority").value,
        completed: "",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTaskComplete(true);
      })
      .catch((err) => {
        console.log(err.message);
        setTaskComplete(false);
      });
    cleanUp();
  }

  function cleanUp() {
    document.getElementById("userList").value = "1";
    document.getElementById("categoryList").value = "1";
    document.getElementById("description").value = "";
    document.getElementById("deadline").value = "";
    document.getElementById("priority").value = "Low";
  }

  return (
    <div className="container col-md-6 mt-5">
      <form>
        <div className="form-group row">
          <label htmlFor="users" className="col-sm-2 col-form-label fw-bold">
            User
          </label>
          <div className="col-sm-10">
            <select className="form-select" id="userList" name="Users">
              {userList.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group row mt-2">
          <label htmlFor="category" className="col-sm-2 col-form-label fw-bold">
            Category
          </label>
          <div className="col-sm-10">
            <select className="form-select" id="categoryList" name="category">
              {categoryList.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group row mt-2">
          <label
            htmlFor="description"
            className="col-sm-2 col-form-label fw-bold"
          >
            Description
          </label>
          <div className="col-sm-10">
            <textarea
              className="form-control"
              id="description"
              rows="3"
            ></textarea>
          </div>
        </div>

        <div className="form-group row mt-2">
          <label htmlFor="deadline" className="col-sm-2 col-form-label fw-bold">
            Deadline
          </label>
          <div className="col-sm-10">
            <input type="date" className="form-control-file" id="deadline" />
          </div>
        </div>

        <div className="form-group row mt-2">
          <label htmlFor="priority" className="col-sm-2 col-form-label fw-bold">
            Priority
          </label>
          <div className="col-sm-10">
            <select className="form-select" id="priority" name="priority">
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <div className="form-group row mt-3">
          <div className="col-sm-2"></div>
          <div className="col-sm-10">
            <button
              type="button"
              id="addTodoBtn"
              className="btn btn-primary"
              onClick={addTask}
            >
              Add Task
            </button>
          </div>
          <div className="font-text mt-2" id="addedConfirmation">
            {initialflag ? (
              <p></p>
            ) : taskComplete ? (
              <p>Task Added Successfully</p>
            ) : (
              <p>Issue adding task</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddTask;
