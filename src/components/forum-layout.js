import React from "react";
import { connect } from "react-redux";

const ForumLayout = (props) => {
  return (
    <div>
      <h2>👻 Forum ({props.chain.contentTX.length})</h2>
      {props.chain.contentTX.map((tx, index) => {
        return (
          <div key={index}>
            <div>
              <div>
                <b>@{tx.sender}</b>
              </div>
              <div>{tx.ts}</div>
              <div>signature: {tx.signature.slice(0, 30)}...</div>
              {tx.content && (
                <div>
                  {" "}
                  <div>
                    <img src={JSON.parse(tx.content).image} height="245" />
                  </div>
                  <pre> {JSON.parse(tx.content).text}</pre>
                </div>
              )}
              {!tx.content && (
                <div>
                  <i>Expired content</i>
                </div>
              )}
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
