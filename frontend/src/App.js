import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./components/pages/Home/Home.component";
import Blog from "./components/pages/Blog/Blog.component";
import Blogs from "./components/pages/Blogs/Blogs.component";
import NewBlog from "./components/pages/NewBlog/NewBlog.component";
import Login from "./components/pages/Auth/Login.component";
import Register from "./components/pages/Auth/Register.component";
import NotFound from "./components/pages/404/NotFound.component";
import Header from "./components/common/Header/Header.component";
import AdminPage from "./components/pages/AdminPage/AdminPage.component";
import EditPage from "./components/pages/EditPage/EditPage.component";
import axios from "axios";
import userContext from "./context/userContext";

const App = () => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
    isAdmin: false,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("x-auth-token");
      if (token === null) {
        localStorage.setItem("x-auth-token", "");
        token = "";
      }
      try {
        const tokenRes = await axios.post(
          process.env.REACT_APP_BACKEND + "/user/tokenIsValid",
          null,
          {
            headers: { "x-auth-token": token },
          }
        );
        if (tokenRes.data) {
          const userRes = await axios.get(
            process.env.REACT_APP_BACKEND + "/user",
            {
              headers: { "x-auth-token": token },
            }
          );
          setUserData({
            token,
            user: userRes.data,
          });
        }
      } catch (error) {
        console.log("Not logged in");
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <>
      <userContext.Provider value={{ userData, setUserData }}>
        {/* Routing of the app */}
        <Router>
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/blogs" exact component={Blogs} />
            <Route
              exact
              path="/blogs/:username/:blogID"
              render={(props) => <Blog {...props} />}
            ></Route>
            <Route path="/blogs/new" exact component={NewBlog} />
            <Route path="/blogs/edit" exact component={EditPage}></Route>
            <Route path="/user/login" exact component={Login} />
            <Route path="/user/register" exact component={Register} />
            {userData.isAdmin ? (
              <Route path="/user/adminPage" exact component={AdminPage} />
            ) : (
              <Redirect to="/user/login" />
            )}
            <Route component={NotFound} />
          </Switch>
        </Router>
      </userContext.Provider>
    </>
  );
};

export default App;
