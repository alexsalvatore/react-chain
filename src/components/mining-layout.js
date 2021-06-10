import React, { useState, useRef } from "react";
import store from "../store/store";
import { useSelector } from "react-redux";
import { Block, Blockchain, Wallet } from "@asalvatore/microchain";
import { addBlock } from "../store/actions/chain-actions";

const MiningLayout = (props) => {
  const keys = useSelector((state) => state.walletReducer);
  const chain = useSelector((state) => state.chainReducer);
  const [isMining, setMining] = useState(false);
  const [isAutoMine, setAutoMine] = useState(false);
  const [nonce, setNonce] = useState(0);

  const chainRef = useRef(chain);
  chainRef.current = chain;

  const isAutoRef = useRef(isAutoMine);
  isAutoRef.current = isAutoMine;

  const relaunchMining = (block) => {
    const result = block.mine(10);
    setNonce(block.nonce);
    result ? endMining(block) : loopMining(block);
  };

  const loopMining = (block) => {
    setTimeout(() => relaunchMining(block), 12);
  };

  const endMining = (block) => {
    setMining(false);
    store.dispatch(addBlock(block));
    // Continue mining
    if (isAutoRef.current) {
      console.warn("⛏️⛏️⛏️ mining continue!");
      mining();
    }
  };

  const mining = () => {
    const lastBlock = Blockchain.getInstance().lastBlock;
    const block = new Block({
      height: lastBlock.height + 1,
      prevHash: lastBlock.hash,
      publisher: keys.publicKey,
      transactions: JSON.stringify(chainRef.current.pendingTX),
    });

    console.log(
      "block send to mining!",
      JSON.stringify(chain.pendingTX),
      isAutoMine
    );

    const userWallet = new Wallet(keys.publicKey, keys.privateKey);
    block.sign(userWallet);
    setMining(true);
    setNonce(0);
    loopMining(block);
  };

  const toggleCheckbox = (e) => {
    console.log(e.target.checked);
    setAutoMine(e.target.checked);
  };

  return (
    <div>
      <h2>⚒️ Mining layout</h2>
      <div>There is {chain.pendingTX.length} transaction(s) pending.</div>
      {chain.pendingTX &&
        chain.pendingTX.map((tx) => (
          <div key={tx.signature}>
            {" "}
            💳 signature: {tx.signature.slice(0, 30)}...
          </div>
        ))}
      {!isMining && (
        <div>
          <button onClick={mining}>launch mining</button>
        </div>
      )}

      {isMining && (
        <div>
          ⛏️ Mining in progress... be patient it could take a while. Current
          nonce is {nonce}.
        </div>
      )}
      <div>
        Activate auto-mining
        <input
          type="checkbox"
          name="autoMine"
          checked={isAutoMine}
          onChange={toggleCheckbox}
        />
      </div>
    </div>
  );
};

export default MiningLayout;
