import React, { useState, useEffect } from "react";
import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";

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

  return (
    <div className="container">
      <title>View Todo Task</title>
      <div className="row d-flex justify-content-center">
        <h6 className="col-md-2 py-3 text-lg-end m-3"> Select User</h6>
        <select
          value={selectedUser}
          onChange={handleUserChange}
          className="col-md-6 py-0 m-3"
        >
          <option value="">select user</option>
          {userList.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <div className="row d-flex justify-content-between ">
        <input
          className="col-md-4"
          placeholder="Search by description"
          id="searchBar"
          onChange={(e) => requestSearch(e.target.value)}
        ></input>
        <div className="col-md-4">
          <select
            value={selectedCategory}
            className="col-md-5 py-0 m-3"
            onChange={handleCatChange}
          >
            <option key="0" value="">
              select Category
            </option>

            {categoryList.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4 d-flex justify-content-around  ">
          <h6>Sort by Priority</h6>
          <input
            type="radio"
            name="priority"
            value="low"
            id="low"
            checked={priority === "low"}
            onChange={handlePriorityChange}
          />
          <label htmlFor="low">Low</label>
          <input
            type="radio"
            name="priority"
            value="medium"
            id="medium"
            checked={priority === "medium"}
            onChange={handlePriorityChange}
          />

          <label htmlFor="medium">Medium</label>
          <input
            type="radio"
            name="priority"
            value="high"
            id="high"
            checked={priority === "high"}
            onChange={handlePriorityChange}
          />
          <label htmlFor="high">High</label>
          <input
            type="radio"
            name="priority"
            value="all"
            id="all"
            checked={priority === "all"}
            onChange={handlePriorityChange}
          />

          <label htmlFor="all">All</label>
        </div>
        {/*<svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-search col-md-1 d-flex align-content-lg-start"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>*/}
      </div>

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
          {filterList.map((todo) => (
            <tr key={todo.id} value={todo.id}>
              <td>{todo.description}</td>
              <td>{todo.deadline}</td>
              <td>{todo.completed ? "Yes" : "No"}</td>
              <td>{todo.category}</td>
              <td>{todo.priority}</td>
              <td>
                <button
                  className="btn btn-warning "
                  onClick={() => setEditShow(true)}
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
                <EditTask
                  show={editShow}
                  onHide={() => setEditShow(false)}
                  taskId={todo.id}
                />
              </td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => setDeleteShow(true)}
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
                    onHide={() => setDeleteShow(false)}
                    taskid={todo.id}
                    setUser={() => setSelectedUser("")}
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
