import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import ForumLayout from "./forum-layout";
import BlocksLayout from "./blocks-layout";

const BlockchainComponent = (props) => {
  return (
    <div>
      <Tabs defaultActiveKey="forum" transition={false} id="noanim-tab-example">
        <Tab eventKey="forum" title="Forum">
          <ForumLayout />
        </Tab>
        <Tab eventKey="chain" title="Chain">
          <BlocksLayout />
        </Tab>
      </Tabs>
    </div>
  );
};
export default BlockchainComponent;
