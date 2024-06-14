import React, { useState, useEffect } from "react";
import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";
import "./ToggleButton.css";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";

function ViewToDo() {
  const [userList, setUserlist] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setCategory] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [filterList, setFilter] = useState([]);
  const [priority, setPriority] = useState("all");
  const [editShow, setEditShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [editId, setEditId] = useState("");
  const [editIndex, setEditIndex] = useState(0);
  const [selectedTask, setSelectedTask] = useState(null);
  //const [taskItems, setTaskItems] = useState([]);
  //const [elem, setElem] = useState(<></>);

  useEffect(() => {
    fetch("http://localhost:8083/api/users")
      .then((response) => response.json())
      .then((data) => setUserlist(data))
      .catch((error) => console.error("Error fetching user list:", error));

    fetch("http://localhost:8083/api/categories")
      .then((response) => response.json())
      .then((data) => setCategoryList(data))
      .catch((error) => console.error("Error fetching category list:", error));
  }, []);

  const handleUserChange = async (event) => {
    const userId = event.target.value;
    //console.log(userId);
    if (userId === "") {
      setTodoList([]);
      setFilter([]);
      setSelectedUser(userId);
    } else {
      setSelectedUser(userId);
      //console.log(`http://localhost:8083/api/todos/byuser/${userId}`);

      const response = await fetch(
        `http://localhost:8083/api/todos/byuser/${userId}`
      );
      const data = await response.json();
      //console.log(data);
      setTodoList(data);
      setFilter(data);
    }
  };

  const handleCatChange = async (event) => {
    const catVal = event.target.value;
    //console.log(catVal);
    setFilter(todoList);
    //console.log(filterList);
    setCategory(catVal);
    document.getElementById("searchBar").value = "";
    setPriority("all");
    if (catVal != "") {
      let filteredList = todoList.filter((task) => {
        return (
          task.category.toString().toLowerCase() ==
          catVal.toString().toLowerCase()
        );
      });
      setFilter(filteredList);
    }
  };

  const handlePriorityChange = async (event) => {
    const priorityVal = event.target.value;
    console.log(priorityVal);
    setFilter(todoList);
    setPriority(priorityVal);
    document.getElementById("searchBar").value = "";
    setCategory("");
    if (priorityVal != "all") {
      console.log("I am in");
      let filteredList = todoList.filter((task) => {
        console.log(task.priority);
        return (
          task.priority.toString().toLowerCase() ==
          priorityVal.toString().toLowerCase()
        );
      });
      setFilter(filteredList);
    }
  };

  const requestSearch = (searchVal) => {
    //const searchVal = document.getElementById("searchBar").value;
    const filertedList = todoList.filter((task) => {
      return task.description
        .toString()
        .toLowerCase()
        .includes(searchVal.toString().toLowerCase());
    });
    if (searchVal.length < 1) {
      setFilter(todoList);
    } else {
      setFilter(filertedList);
    }
  };

  const handleToggleChange = () => {
    setIsComplete(!isComplete);
  };

  const handleEdit = (index) => {
    setEditShow(true);
    setEditIndex(index);
  };

  const handleDelete = (taskId) => {
    setSelectedTask(taskId);
    setDeleteShow(true);
  };

  const hideDelete = () => {
    setDeleteShow(false);
    setSelectedTask(null);
  };
  const deleteTask = (taskId) => {
    setFilter(filterList.filter((todo) => taskId != todo.id));
  };

  const hideEdit = () => {
    setEditShow(false);
    setEditIndex(null);
  };

  const updateEditedTask = (updatedTask) => {
    const updatedTasks = filterList.map((task, index) =>
      index === editIndex ? updatedTask : task
    );
    setFilter(updatedTasks);
  };

  const toggleCompletion = (taskId) => {
    const updatedTasks = filterList.map((task) => {
      if (task.id === taskId) {
        const updatedTask = { ...task, completed: !task.completed };

        // Update the backend
        fetch(`http://localhost:8083/api/todos/${taskId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        }).catch((error) =>
          console.error("Error updating task completion status:", error)
        );

        return updatedTask;
      }
      return task;
    });

    setFilter(updatedTasks);
  };

  return (
    <div className="container min-height">
      <h5 className="m-2">View Todo Task</h5>
      <div className="col-md-4 mt-4">
        <input
          className="p-2 m-2 form-control"
          placeholder="Search By Description"
          id="searchBar"
          onChange={(e) => requestSearch(e.target.value)}
        ></input>
      </div>
      <form className="row g-3 needs-validation" noValidate>
        <div className="col-md-6">
          <select
            value={selectedUser}
            onChange={handleUserChange}
            className="p-2 m-2 mt-3 col-md-6"
          >
            <option value="">Select User</option>
            {userList.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          <div className="col-md-12">
            <select
              value={selectedCategory}
              className="p-2 m-2 mt-4 col-md-6"
              onChange={handleCatChange}
            >
              <option key="0" value="">
                Filter By Category
              </option>

              {categoryList.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-8">
            <h6 className="p-2 m-2 mt-4 m-lg-0 form-control border-0">
              Sort by Priority
            </h6>
            <div className="form-check form-check-inline m-2">
              <input
                type="radio"
                className="form-check-input"
                name="priority"
                value="low"
                id="low"
                checked={priority === "low"}
                onChange={handlePriorityChange}
              />
              <label className="form-check-label" htmlFor="low">
                Low
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                name="priority"
                value="medium"
                id="medium"
                checked={priority === "medium"}
                onChange={handlePriorityChange}
              />

              <label className="form-check-label" htmlFor="medium">
                Medium
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                name="priority"
                value="high"
                id="high"
                checked={priority === "high"}
                onChange={handlePriorityChange}
              />
              <label className="form-check-label" htmlFor="high">
                High
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                name="priority"
                value="all"
                id="all"
                checked={priority === "all"}
                onChange={handlePriorityChange}
              />

              <label className="form-check-label" htmlFor="all">
                All
              </label>
            </div>
          </div>
        </div>
      </form>
      <table display="none" className="table mt-5 " id="toDoTable">
        <thead>
          <tr>
            <th>Description</th>
            <th>Deadline</th>
            <th>Status</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filterList.map((todo, index) => (
            <tr key={todo.id} value={todo.id}>
              <td>{todo.description}</td>
              <td>{todo.deadline}</td>
              <td>
                <Button
                  variant={todo.completed ? "success" : "danger"}
                  onClick={() => toggleCompletion(todo.id)}
                >
                  {todo.completed ? "Completed" : "In Progress"}
                </Button>
              </td>
              {/*<td>{todo.completed ? "Yes" : "No"}</td>*/}
              <td>{todo.category}</td>
              <td>{todo.priority}</td>
              <td>
                <button
                  className="headerbg-color border-0 p-2"
                  onClick={() => {
                    //editTask(todo.id);
                    //}}
                    handleEdit(index);
                  }}
                  id={todo.id}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-pen-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001" />
                  </svg>
                </button>

                {console.log(editIndex)}

                {
                  <EditTask
                    show={editShow}
                    onHide={hideEdit}
                    editindex={editIndex}
                    todolist={filterList}
                    onTaskUpdate={updateEditedTask}
                  />
                }
              </td>
              <td>
                <button
                  className="headerbg-color border-0 p-2"
                  onClick={() => handleDelete(todo.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-trash-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                  </svg>
                </button>
                {
                  <DeleteTask
                    show={deleteShow}
                    onHide={hideDelete}
                    taskId={selectedTask}
                    onDelete={deleteTask}
                  />
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewToDo;
