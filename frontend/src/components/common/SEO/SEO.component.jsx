import React from "react";
import { Helmet } from "react-helmet";

const SEO = (props) => {
  return (
    <Helmet>
      <title>{props.title}</title>
      <meta name="description" content={props.content} />
    </Helmet>
  );
};

export default SEO;
