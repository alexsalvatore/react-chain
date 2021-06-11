import React from "react";
import { connect } from "react-redux";
import { Media, Image } from "react-bootstrap";

const ForumLayout = (props) => {
  return (
    <div>
      {props.chain.contentTX.map((tx, index) => {
        return (
          <div key={index}>
            <Media>
              {JSON.parse(tx.content).image && (
                <Image
                  width={245}
                  className="align-self-start mr-3"
                  src={JSON.parse(tx.content).image}
                  thumbnail
                />
              )}
              <Media.Body>
                <figcaption className="blockquote-footer">
                  @{tx.sender.slice(0, 30)}...
                  <br />
                  {new Date(tx.ts).toISOString()}
                  <br />
                  Content hash: {tx.contentHash}
                  <br />
                </figcaption>
                <p>{JSON.parse(tx.content).text}</p>
              </Media.Body>
            </Media>
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
