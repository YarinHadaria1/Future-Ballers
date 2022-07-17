import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import ProfileForm from "./components/profile-form/ProfileForm";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import NotFound from "./components/layout/NotFound";
import AddExperience from "./components/profile-form/AddExperience";
import AddStatistics from "./components/profile-form/AddStatistics";
import Profiles from "./components/profiles/Profiles";
import PrivateRoute from "./components/routing/PrivateRoute";
import "./App.css";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

// Redux
import { Provider } from "react-redux";
import store from "./reduxStore";
import Footer from "./components/layout/Footer";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar></Navbar>
        <Alert></Alert>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profiles" element={<Profiles />}></Route>
          <Route path="/profile/:id" element={<Profile />}></Route>

          <Route
            path="/dashboard"
            element={<PrivateRoute component={Dashboard} />}
          ></Route>
          <Route
            path="/create-profile"
            element={<PrivateRoute component={ProfileForm} />}
          />
          <Route
            path="/edit-profile"
            element={<PrivateRoute component={ProfileForm} />}
          ></Route>
          <Route
            path="/add-experience"
            element={<PrivateRoute component={AddExperience} />}
          ></Route>
          <Route
            path="/add-stats"
            element={<PrivateRoute component={AddStatistics} />}
          ></Route>
          <Route
            path="/posts"
            element={<PrivateRoute component={Posts} />}
          ></Route>
          <Route
            path="/posts/:id"
            element={<PrivateRoute component={Post} />}
          ></Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
      <Footer></Footer>
    </Provider>
  );
}

export default App;
