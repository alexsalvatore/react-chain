import React from "react";
import store from "../store/store";
import { connect } from "react-redux";

const ForumLayout = (props) => {
  return (
    <div>
      <h2>👻 Forum</h2>
      {props.chain.contentTX.reverse().map((tx, index) => {
        console.log(JSON.parse(tx.content));
        return (
          <div key={index}>
            <div>
              <div>
                <b>@{tx.sender}</b>
              </div>
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
