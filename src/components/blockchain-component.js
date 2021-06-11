import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useSelector } from "react-redux";
import ForumLayout from "./forum-layout";
import BlocksLayout from "./blocks-layout";

const BlockchainComponent = (props) => {
  const chain = useSelector((state) => state.chainReducer);

  return (
    <div>
      <Tabs defaultActiveKey="forum" transition={false} id="noanim-tab-example">
        <Tab eventKey="forum" title={`👻 Forum (${chain.contentTX.length})`}>
          <ForumLayout />
        </Tab>
        <Tab eventKey="chain" title={`⛓️ Blocks (${chain.blocks.length})`}>
          <BlocksLayout />
        </Tab>
      </Tabs>
    </div>
  );
};
export default BlockchainComponent;
