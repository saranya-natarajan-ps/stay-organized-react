import Organize1 from "./assets/organize1.png";
import Organize2 from "./assets/organize2.jpeg";
import Organize3 from "./assets/organize3.jpeg";
import Organize4 from "./assets/organize4.jpeg";

function HomePage() {
  return (
    <div className="container min-height">
      {/*<!--Slider Starts-->*/}
      <div className="row">
        <div className="col-md-6 mt-2 ">
          Being successful depends on an individual’s ability to be efficient,
          which is impossible without proper self-organization. Well-organized
          people are capable of managing their time and know how to achieve
          their goals. Clearly, being well-organized is not a gift given by a
          divine force by chosen people. It is easy to learn how to be
          well-organized and efficient. To become an organized person one needs
          to follow a number of easy steps including making plans and schedules,
          being determined but flexible.
          <br></br>
          <br></br>
          Here in this Website, we have the following to keep the Task's
          organized.
          <br></br>
          <br></br>
          <ul>
            <li> Register New User</li>
            <span>
              This page helps to register a new user with unique username and
              password.
            </span>
            <br />
            <br />
            <li> Add Task</li>
            <span>
              This Page helps adding new todo task for an existing user.
            </span>
            <br />
            <br />
            <li> View Task</li>
            <span>
              This page helps helps viewing the task list for an user with
              filters.
            </span>
            <br />
            <br />

            <li> Edit Task / Delete Task</li>
            <span>
              This is additional functionality in the view task page, where an
              user can edit, delete or toggle status for a task.
            </span>
          </ul>
        </div>
        <div className="col-md-6 mt-2">
          <div
            id="carouselExampleControls"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src={Organize1}
                  className="d-block w-100"
                  alt="Stay Organized"
                />
              </div>
              <div className="carousel-item">
                <img
                  src={Organize2}
                  className="d-block w-100"
                  alt="Stay Organized"
                />
              </div>
              <div className="carousel-item">
                <img
                  src={Organize3}
                  className="d-block w-100"
                  alt="Stay Organized"
                />
              </div>
              <div className="carousel-item">
                <img
                  src={Organize4}
                  className="d-block w-100"
                  alt="Stay Organized"
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="prev"
            />
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>

            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
            </button>
          </div>
        </div>
      </div>
      {/*<!--Slider ends-->*/}
      <br></br>
    </div>
  );
}

export default HomePage;
