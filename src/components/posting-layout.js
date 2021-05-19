import React, { useEffect, useState } from 'react';
import localforage from 'localforage';
import {Blockchain, Transaction} from '@asalvatore/microchain';

const PostingLayout = (props) => {

    const [postData, setPost] = useState({ title: '', text: '', image: '', author: ''});
    const [postMoney, setPostMoney] = useState(0);

    useEffect( () =>{
        localforage.getItem('postDraft', (err, value) =>{
            if(err || !value) return;
            setPost({...postData,... JSON.parse(value)});
        } );
    },[]);

    const onChange = (e) =>{
        setPost({...postData, [e.target.name]: e.target.value});
        updateValue({...postData, [e.target.name]: e.target.value});
        localforage.setItem('postDraft',JSON.stringify(postData) );
    }

    const updateValue = (data) =>{
        const tx = new Transaction({content: JSON.stringify(data)});
        const postValue = Blockchain.getInstance().getTransactionCost(tx);
        setPostMoney(postValue);
    }

    return <div>
        <h2>Posting</h2>
        <div>Cost {postMoney}$ ({ JSON.stringify(postData).length/1000 }Ko)</div>
        <div>
            <input value={postData.title} name="title" placeholder="title" onChange={onChange}></input> <br/>
            <input value={postData.author} name="author" placeholder="author" onChange={onChange}></input> <br/>
            <textarea  value={postData.text} name="text" rows="15" cols="100" onChange={onChange}>
            </textarea> <br/>
        </div>
    </div>;
}

export default PostingLayout;