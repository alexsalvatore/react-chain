import React, { useEffect } from 'react';
import store from '../store/store';
import { connect } from 'react-redux';
import {initChain} from '../store/actions/chain-actions';

const ChainLayout = (props) => {
    useEffect( ()=>{
        store.dispatch(initChain());
    },[]);
    console.log(    props.chain);
    return <div>
        <h2>⛓️ Chain</h2>
       {props.chain.blocks.map(block => <div key= {block.hash}>#{block.hash}</div>) }
    </div>;
}

const mapStateToProps = (state) =>({
    chain: state.chainReducer,
});

export default  connect(mapStateToProps,)(ChainLayout);