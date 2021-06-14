import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Media, Image } from "react-bootstrap";
import PublicKeyLayout from "./public-key-layout";

const ForumLayout = (props) => {
  return (
    <div>
      {props.contentTX.map((tx, index) => {
        return (
          <div key={index} className={"item-container"}>
            <Media>
              {JSON.parse(tx.content).image && (
                <Image
                  width={200}
                  className="align-self-start mr-3"
                  src={JSON.parse(tx.content).image}
                  thumbnail
                />
              )}
              <Media.Body>
                <figcaption className="blockquote-footer">
                  {tx.content && JSON.parse(tx.content).name && (
                    <span>{JSON.parse(tx.content).name}</span>
                  )}
                  <PublicKeyLayout publicKey={tx.sender}></PublicKeyLayout>{" "}
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

export default ForumLayout;
