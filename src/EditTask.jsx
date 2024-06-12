import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";

function EditTask(props) {
  const [taskItems, setTaskItems] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setCategory] = useState("");
  const [priority, setPriority] = useState("Low");

  useEffect(() => {
    const taskid = props.taskId;
    function fetchData() {
      fetch(`http://localhost:8083/api/todos/${taskid}`)
        .then((response) => response.json())
        .then((data) => setTaskItems(data))
        .catch((error) => console.error("Error fetching task data:", error));

      fetch("http://localhost:8083/api/categories")
        .then((response) => response.json())
        .then((data) => setCategoryList(data))
        .catch((error) =>
          console.error("Error fetching category list:", error)
        );
    }
    fetchData();

    setCategory(taskItems.category);
    setPriority(taskItems.priority);
    console.log(priority);
  }, []);

  const changeCat = (event) => {
    console.log(event.target.value);
  };

  const changePriority = (event) => {
    console.log(event.target.value);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {console.log(taskItems)}
        <div className="row">
          <div className="col">
            <label htmlFor="description">Description</label>
            <input
              type="textarea"
              id="description"
              placeholder={taskItems.description}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="categorylist">Category</label>

            <select
              value={selectedCategory}
              className="col"
              id="categorylist"
              onChange={changeCat}
            >
              {categoryList.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="deadline">Deadline</label>
            <input type="date" id="deadline" placeholder={taskItems.deadline} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label>Priority</label>
            <label htmlFor="low">Low</label>
            <input
              type="radio"
              name="priority"
              id="Low"
              checked={priority === "Low"}
              onChange={changePriority}
            />
            <label htmlFor="low">Medium</label>
            <input
              type="radio"
              name="priority"
              id="Medium"
              checked={priority === "Medium"}
              onChange={changePriority}
            />
            <label htmlFor="low">High</label>
            <input
              type="radio"
              name="priority"
              id="High"
              checked={priority === "High"}
              onChange={changePriority}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditTask;
