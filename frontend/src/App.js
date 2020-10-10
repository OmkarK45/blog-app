import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "./components/pages/Home/Home.component";
import Blog from "./components/pages/Blog/Blog.component";
import Blogs from "./components/pages/Blogs/Blogs.component";
import NewBlog from "./components/pages/NewBlog/NewBlog.component";
import Login from "./components/pages/Auth/Login.component";
import Register from "./components/pages/Auth/Register.component";
import NotFound from "./components/pages/404/NotFound.component";
import Header from "./components/common/Header/Header.component";
import axios from "axios";
import userContext from "./context/userContext";

const App = () => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post("/user/tokenIsValid", null, {
        headers: { "x-auth-token": token },
      });
      if (tokenRes.data) {
        const userRes = await axios.get("/user", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <>
      {/* Routing of the app */}
      <Router>
        <userContext.Provider value={{ userData, setUserData }}>
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/blogs" exact component={Blogs} />
            <Route path="/blogs/:username/:blogID" component={Blog}></Route>
            <Route path="/blogs/new" exact component={NewBlog} />
            <Route path="/user/login" exact component={Login} />
            <Route path="/user/register" exact component={Register} />
            <Route component={NotFound} />
          </Switch>
        </userContext.Provider>
      </Router>
    </>
  );
};

export default App;
