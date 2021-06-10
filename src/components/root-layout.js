import React, { useEffect } from "react";
import WalletLayout from "./wallet-layout";
import ForumLayout from "./forum-layout";
import ChainLayout from "./chain-layout";
import MiningLayout from "./mining-layout";
import MoneyLayout from "./money-layout";
import PostingLayout from "./posting-layout";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import store from "../store/store";
import { initChain } from "../store/actions/chain-actions";
import { getKeyPairs } from "../store/actions/wallet-actions";

const RootLayout = (props) => {
  const keys = useSelector((state) => state.walletReducer);

  useEffect(() => {
    store.dispatch(initChain());
    store.dispatch(getKeyPairs());
  }, []);

  return (
    <Router>
      <h1>Microchain 💴</h1>
      <div>
        based on{" "}
        <a
          href="https://www.npmjs.com/package/@asalvatore/microchain"
          target="_blank"
        >
          @asalvatore's <i>Microchain</i>
        </a>
      </div>
      <MoneyLayout></MoneyLayout>
      <nav>
        <ul>
          <li>
            <Link to="/">Forum</Link>
          </li>
          {keys.publicKey && (
            <li>
              <Link to="/wallet">Wallet</Link>
            </li>
          )}
          {keys.publicKey && (
            <li>
              <Link to="/posting">Posting</Link>
            </li>
          )}
          {keys.publicKey && (
            <li>
              <Link to="/mining">Mining</Link>
            </li>
          )}
          <li>
            <Link to="/chain">Chain</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/wallet">
          <WalletLayout />
        </Route>
        <Route path="/posting">
          <PostingLayout />
        </Route>
        <Route path="/mining">
          <MiningLayout />
        </Route>
        <Route path="/chain">
          <ChainLayout />
        </Route>

        <Route path="/">
          <ForumLayout />
        </Route>
      </Switch>
    </Router>
  );
};

export default RootLayout;
