import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const DeleteTask = (props) => {
  console.log(props);

  const remove = () => {
    fetch(`http://localhost:8083/api/todos/${props.taskId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          props.onDelete(props.taskId);
          props.onHide();
        } else {
          console.error("Error deleting task:", response.statusText);
        }
      })
      .catch((error) => console.error("Error deleting task:", error));
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
        <Modal.Title id="contained-modal-title-vcenter">
          Delete Task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg bg-danger-subtle">
        Are you sure that you want to delete this task?
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={remove}>Confirm</Button>
        <Button onClick={props.onHide} className="btn btn-secondary">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteTask;
