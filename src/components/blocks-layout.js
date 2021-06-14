import React, { useEffect } from "react";
import { connect } from "react-redux";
import PublicKeyLayout from "./public-key-layout";

const BlocksLayout = (props) => {
  /*useEffect(() => {
    store.dispatch(initChain());
  }, []);*/
  return (
    <div>
      {props.chain
        .filter((block) =>
          !props.userId ? true : block.publisher === props.userId
        )
        .map((block) => (
          <div key={block.hash} className={"item-container"}>
            <div>
              <b>#{block.hash}</b>{" "}
            </div>
            <div>Config: {block.configHash}</div>
            <div>
              <b>height: {block.height}</b> / difficulty: {block.difficulty}
            </div>
            <div>ts: {new Date(block.ts).toISOString()}</div>
            <div>Nonce: {block.nonce} </div>
            <div>
              Publisher:{" "}
              <PublicKeyLayout publicKey={block.publisher}></PublicKeyLayout>{" "}
            </div>
          </div>
        ))}
    </div>
  );
};

export default BlocksLayout;
