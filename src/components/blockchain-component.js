import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useSelector } from "react-redux";
import ForumLayout from "./forum-layout";
import BlocksLayout from "./blocks-layout";
import ProfileHeader from "./profile-hearder";
import { useParams } from "react-router-dom";

const BlockchainComponent = (props) => {
  const chain = useSelector((state) => state.chainReducer);
  let { userId } = useParams();

  return (
    <div>
      {userId && (
        <div>
          <ProfileHeader userId={userId}></ProfileHeader>
        </div>
      )}
      <Tabs defaultActiveKey="forum" transition={false} id="noanim-tab-example">
        <Tab
          eventKey="forum"
          title={`👻 Forum (${
            chain.contentTX.filter((tx) =>
              !props.userId ? true : tx.sender === props.userId
            ).length
          })`}
        >
          <ForumLayout
            contentTX={chain.contentTX.filter((tx) =>
              !props.userId ? true : tx.sender === props.userId
            )}
            userId={userId}
          />
        </Tab>
        <Tab
          eventKey="chain"
          title={`⛓️ Blocks (${
            chain.blocks.filter((block) =>
              !props.userId ? true : block.publisher === props.userId
            ).length
          })`}
        >
          <BlocksLayout
            chain={chain.blocks.filter((block) =>
              !props.userId ? true : block.publisher === props.userId
            )}
            userId={userId}
          />
        </Tab>
      </Tabs>
    </div>
  );
};
export default BlockchainComponent;
