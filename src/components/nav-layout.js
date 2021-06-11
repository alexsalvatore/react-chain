import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const NavLayout = (props) => {
  const history = useHistory();
  const keys = useSelector((state) => state.walletReducer);

  const handleClick = (path) => {
    history.push(path);
  };

  return (
    <div>
      <ButtonGroup size="lg" className="mb-2">
        <Button onClick={() => handleClick("chain")}>Chain</Button>
        <Button onClick={() => handleClick("wallet")}>Wallet</Button>
        <Button onClick={() => handleClick("posting")}>Posting</Button>
        <Button onClick={() => handleClick("mining")}>Mining</Button>
      </ButtonGroup>
    </div>
  );
};

export default NavLayout;
