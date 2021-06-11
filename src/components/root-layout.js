import React, { useEffect } from "react";

import MiningLayout from "./mining-layout";
import WalletLayout from "./wallet-layout";
import MoneyLayout from "./money-layout";
import NavLayout from "./nav-layout";
import PostingLayout from "./posting-layout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import store from "../store/store";
import { initChain } from "../store/actions/chain-actions";
import { getKeyPairs } from "../store/actions/wallet-actions";
import BlockchainComponent from "./blockchain-component";

const RootLayout = (props) => {
  useEffect(() => {
    store.dispatch(initChain());
    store.dispatch(getKeyPairs());
  }, []);

  return (
    <Router>
      <div>
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
        <NavLayout></NavLayout>

        {/*<nav>
          <ul>
            <li>
              <Link to="/">Chain</Link>
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
          </ul>
            </nav>*/}
        <Switch>
          <Route path="/chain">
            <BlockchainComponent />
          </Route>
          <Route path="/wallet">
            <WalletLayout />
          </Route>
          <Route path="/posting">
            <PostingLayout />
          </Route>
          <Route path="/mining">
            <MiningLayout />
          </Route>

          <Route path="/">
            <BlockchainComponent />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default RootLayout;

/*
      <Router>
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
          </Router>*/
