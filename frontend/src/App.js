import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "./components/pages/Home/Home.component";
import Blog from "./components/pages/Blog/Blog.component";
import Blogs from "./components/pages/Blogs/Blogs.component";
import NewBlog from "./components/pages/NewBlog/NewBlog.component";
import Login from "./components/pages/Auth/Login.component";
import Register from "./components/pages/Auth/Register.component";

const App = () => {
  return (
    <>
      {/* Routing of the app */}
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/blogs" exact component={Blogs} />
          <Route path="/blogs/:username/:blogID" component={Blog}></Route>
          <Route path="/blogs/new" exact component={NewBlog} />
          <Route path="/user/login" exact component={Login} />
          <Route path="/user/register" exact component={Register} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
