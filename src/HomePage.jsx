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
          The first step to self-organization is obtaining a habit of making
          plans. It can be beneficial to take your time and start your diary. It
          is a good idea to make a plan of your one-year and five-year goals at
          the beginning. It may seem superfluous but it is an effective way to
          remember about the most important life goals and remain determined.
          <br></br>
          <br></br>
          The second step is to follow the plan created. It is inappropriate to
          put off important tasks for later. This ‘later’ can never come. Hence,
          if there are important things to do, it is essential to do everything
          according to the schedule in the diary. It is important to remember
          that if you put off something, one day you will have a dozen of
          unaccomplished projects which will lead to failure.
          <br></br>
          <br></br>
          The third step on the way to efficiency is making schedule. Every
          person has a variety of arrangements each week. The diary has to
          include this information as well. Write down precise time of the
          meeting, place where it will take place and the name of the person you
          are meeting. It can be a very good idea to predict time the meeting
          will last. This will help you stay on track and be able to plan other
          things to do. Again, it is inappropriate to spend more time at a
          meeting if you have other important tasks. Finally, it is important to
          look into the diary every morning to make sure you remember about all
          arrangements and things to do.
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
