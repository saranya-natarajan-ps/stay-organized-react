import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import AddTask from "./AddTask";
import ViewToDo from "./ViewToDo";
import Header from "./inc/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Footer from "./inc/Footer";
import RegisterUser from "./RegisterUser";
//import TestRegister from "./TestRegister";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/addtask" element={<AddTask />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/viewtodo" element={<ViewToDo />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
