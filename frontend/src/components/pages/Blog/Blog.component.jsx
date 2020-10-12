import React from "react";

const Blog = ({
  location: {
    state: {
      props: { data },
    },
  },
}) => {
    console.log(data);
  return <h1>Blog</h1>;
};

export default Blog;
