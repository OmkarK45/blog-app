import React, { useContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "./AdminPage.styles.scss";
import shortid from "shortid";
import userContext from "../../../context/userContext";
import { useToast } from "@chakra-ui/core";

const AdminPage = () => {
  const [blogs, setBlogs] = useState();
  const { userData } = useContext(userContext);
  const toast = useToast();
  useEffect(() => {
    axios
      .get("/blogs/unapproved")
      .then((res) => {
        console.log(res.data);
        setBlogs(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleApproval = (isApproved, blogObj) => {
    console.log(isApproved, blogObj);
    console.log(userData.token);
    const reqURL = `/blogs/${blogObj.author}/${blogObj._id}`;

    const options = {
      headers: {
        "x-auth-token": userData.token,
      },
    };
    axios
      .patch(reqURL, { isApproved }, options)
      .then((res) =>
        toast({
          title: "Post Approved!",
        })
      )
      .catch((err) =>
        toast({
          title: "Some error occured while approving.",
        })
      );
  };
  return (
    <React.Fragment>
      {/* {JSON.stringify(blogs)} */}
      <h1>Admin Page</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>BlogID</th>
              <th>Title</th>
              <th>Content</th>
              <th>Author</th>
              <th>Avatar</th>
              <th>Banner URL</th>
              <th>Approved ?</th>
            </tr>
          </thead>
          <tbody>
            {blogs &&
              blogs.map((b, i) => (
                <tr key={shortid.generate()}>
                  <td>{b._id}</td>
                  <td>{b.title}</td>
                  <td>{b.content}</td>
                  <td>{b.author}</td>
                  <td>{b.avatar}</td>
                  <td>{b.bannerURL}</td>
                  <td>{JSON.stringify(b.isApproved)}</td>
                  <td>
                    <button onClick={() => handleApproval(true, b)}>
                      Approve
                    </button>
                    <button onClick={() => handleApproval(false, b)}>
                      Disapprove
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default AdminPage;
