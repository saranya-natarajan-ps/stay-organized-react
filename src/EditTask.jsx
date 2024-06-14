import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function EditTask(props) {
  const [taskItems, setTaskItems] = useState({
    category: "",
    description: "",
    deadline: "",
    priority: "Low",
    completed: false,
  });
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setCategory] = useState("");

  useEffect(() => {
    const taskId = props.todolist[props.editindex]?.id;

    const fetchTaskData = async () => {
      try {
        const taskResponse = await fetch(
          `http://localhost:8083/api/todos/${taskId}`
        );
        const taskData = await taskResponse.json();
        setTaskItems(taskData);
        setCategory(taskData.category);

        const categoryResponse = await fetch(
          "http://localhost:8083/api/categories"
        );
        const categoryData = await categoryResponse.json();
        setCategoryList(categoryData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (taskId) {
      fetchTaskData();
    }
  }, [props.editindex, props.todolist]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskItems((prevItems) => ({
      ...prevItems,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setTaskItems((prevItems) => ({
      ...prevItems,
      category: e.target.value,
    }));
  };

  const handleStatusChange = (e) => {
    setTaskItems((prevItems) => ({
      ...prevItems,
      completed: e.target.value === "completed",
    }));
  };

  const editTask = () => {
    const taskId = props.todolist[props.editindex]?.id;
    fetch(`http://localhost:8083/api/todos/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskItems),
    })
      .then((response) => {
        if (response.ok) {
          props.onTaskUpdate(taskItems);
          props.onHide();
        } else {
          console.error("Error updating task:", response.statusText);
        }
      })
      .catch((error) => console.error("Error updating task:", error));
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-danger-subtle">
        <div className="container">
          <form>
            <div className="form-group row mt-2">
              <label htmlFor="category" className="col-md-2 col-form-label">
                Category
              </label>
              <div className="col-md-4">
                <select
                  className="form-select"
                  id="categoryList"
                  name="category"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  {categoryList.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group row mt-2">
              <label htmlFor="description" className="col-md-2 col-form-label">
                Description
              </label>
              <div className="col-md-6">
                <textarea
                  className="form-control"
                  id="description"
                  rows="3"
                  name="description"
                  value={taskItems.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>

            <div className="row mt-2">
              <label
                htmlFor="deadline"
                className="col-md-2 col-form-label form-group"
              >
                Deadline
              </label>
              <div className="col-md-4">
                <input
                  type="date"
                  className="form-control-file"
                  id="deadline"
                  name="deadline"
                  value={taskItems.deadline}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group row mt-2">
              <label htmlFor="priority" className="col-md-2 col-form-label">
                Priority
              </label>
              <div className="col-md-4">
                <select
                  className="form-select"
                  id="priority"
                  name="priority"
                  value={taskItems.priority}
                  onChange={handleInputChange}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            <div className="form-group row mt-2">
              <label htmlFor="Toggle" className="col-md-2 col-form-label">
                Status
              </label>
              <div className="col-md-4">
                <select
                  className="form-select"
                  id="Toggle"
                  name="completed"
                  value={taskItems.completed ? "completed" : "inProgress"}
                  onChange={handleStatusChange}
                >
                  <option value="completed">Completed</option>
                  <option value="inProgress">In Progress</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={editTask} variant="primary">
          Update
        </Button>
        <Button className="btn btn-secondary" onClick={props.onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditTask;
