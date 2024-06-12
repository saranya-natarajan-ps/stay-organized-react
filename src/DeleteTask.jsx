import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function DeleteTask(props) {
  const remove = () => {
    fetch(`http://localhost:8083/api/todos/${props.taskid}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.info("Task Deleted Successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete Task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg bg-danger">
        Are you sure that you want to delete this task?
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="btn btn-secondary"
          onClick={() => {
            remove();
            {
              props.onHide();
            }
            {
              props.setUser();
            }
          }}
        >
          Confirm
        </Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteTask;
