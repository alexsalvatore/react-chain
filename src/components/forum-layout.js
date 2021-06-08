import React from "react";
import { connect } from "react-redux";

const ForumLayout = (props) => {
  return (
    <div>
      <h2>👻 Forum ({props.chain.contentTX.length})</h2>
      {props.chain.contentTX.reverse().map((tx, index) => {
        return (
          <div key={index}>
            <div>
              <div>
                <b>@{tx.sender}</b>
              </div>
              <div>{tx.ts}</div>
              <div>
                <img src={JSON.parse(tx.content).image} height="245" />{" "}
              </div>
              <pre>{JSON.parse(tx.content).text}</pre>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => ({
  chain: state.chainReducer,
});

export default connect(mapStateToProps)(ForumLayout);
