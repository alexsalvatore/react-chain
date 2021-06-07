import React, { useEffect } from "react";
import store from "../store/store";
import { connect } from "react-redux";
import { initChain } from "../store/actions/chain-actions";

const ChainLayout = (props) => {
  useEffect(() => {
    store.dispatch(initChain());
  }, []);
  return (
    <div>
      <h2>⛓️ Chain ({props.chain.blocks.length})</h2>
      {props.chain.blocks.reverse().map((block) => (
        <div key={block.hash}>
          <div>
            <b>#{block.hash}</b>{" "}
          </div>
          <div>
            <b>height: {block.height}</b> / difficulty: {block.difficulty}
          </div>
          <div>Nonce: {block.nonce} </div>
          <div>Publisher: {block.publisher} </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  chain: state.chainReducer,
});

export default connect(mapStateToProps)(ChainLayout);
