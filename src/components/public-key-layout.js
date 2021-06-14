import React from "react";
import { Link } from "react-router-dom";

const PublicKeyLayout = (props) => {
  return (
    <span>
      <Link to={"/" + props.publicKey}>@{props.publicKey.slice(0, 30)}...</Link>
    </span>
  );
};

export default PublicKeyLayout;
