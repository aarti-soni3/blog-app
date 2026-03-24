import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter } from "react-router";
import { Routes, Route } from "react-router";
import Profile from "./components/Profile";
import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
// import { useGetAllPostsQuery } from "./store/services/postApi";

function App() {
  // const { isLoading, data } = useGetAllPostsQuery();

  return (
    <>
      <BrowserRouter>
        <NavBar />

        {/* {isLoading && <h5>loading....</h5>} */}
        {/* {data && <p>{JSON.stringify(data)}</p>} */}

        <div className="d-flex justify-content-center mt-5">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
