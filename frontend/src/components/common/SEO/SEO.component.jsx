import React from "react";
import { Helmet } from "react-helmet";

const SEO = (props) => {
  return (
    <Helmet>
      <title>{props.title}</title>
      <meta name="title" content={props.title} />
      <meta
        name="description"
        content="Blog hosted on SemiColon. Semicolon is for people who love to express their thoughts. Sign-up and write something today! It's FREE."
      />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://semicolon-blog.netlify.app/" />
      <meta property="og:title" content={props.title} />
      <meta
        property="og:description"
        content="Blog hosted on SemiColon. Semicolon is for people who love to express their thoughts. Sign-up and write something today! It's FREE."
      />
      <meta property="og:image" content='https://i.imgur.com/KifYUil.jpg'></meta>
    </Helmet>
  );
};

export default SEO;
