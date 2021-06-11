import React, { useEffect, useState } from "react";
import store from "../store/store";
import { connect } from "react-redux";
import {
  WALLET_EDIT,
  WALLET_CREATE,
  saveKeyPairs,
  getKeyPairs,
} from "../store/actions/wallet-actions";

const WalletLayout = (props) => {
  const [isEditing, setEditing] = useState(false);

  useEffect(() => {
    store.dispatch(getKeyPairs());
  }, []);

  const createWallet = () => {
    setEditing(true);
    props.walletGenerate();
  };

  const onChange = (e) => {
    setEditing(true);
    const newKeys = { ...props.keys, [e.target.id]: e.target.value };
    props.walletEdit(newKeys.publicKey, newKeys.privateKey);
  };

  const onSave = () => {
    if (props.keys.isOk) {
      setEditing(false);
      store.dispatch(saveKeyPairs(props.keys));
    }
  };

  const onCancel = () => {
    store.dispatch(getKeyPairs());
  };

  return (
    <div>
      <h2>💳 Wallet</h2>
      👀 Public Key:{" "}
      <input
        id="publicKey"
        type="text"
        value={props.keys.publicKey}
        onChange={onChange}
      ></input>{" "}
      <br />
      🔒 Private Key:{" "}
      <input
        id="privateKey"
        type="text"
        value={props.keys.privateKey}
        onChange={onChange}
      ></input>{" "}
      <br />
      {props.keys.isOk ? (
        <span>Keys pair valid ✔️</span>
      ) : (
        <span>Keys pair unvalid 👎</span>
      )}
      <br />
      <button onClick={createWallet}>Generate wallet address</button>
      {isEditing && (
        <div>
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onSave} disabled={!props.keys.isOk}>
            Save
          </button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  keys: state.walletReducer,
  chain: state.chainReducer,
});

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    walletEdit: (publicKey, privateKey) =>
      dispatch({ type: WALLET_EDIT, payload: { publicKey, privateKey } }),
    walletGenerate: () => dispatch({ type: WALLET_CREATE }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletLayout);
