import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const PublicKeyLayout = (props) => {
  const copy = () => {
    navigator.clipboard.writeText(props.publicKey);
    alert("Public key copied!");
  };
  return (
    <span>
      <Link to={"/" + props.publicKey}>@{props.publicKey.slice(0, 30)}...</Link>{" "}
      <Button onClick={copy} variant="secondary" size="sm">
        Copy
      </Button>
    </span>
  );
};

export default PublicKeyLayout;
