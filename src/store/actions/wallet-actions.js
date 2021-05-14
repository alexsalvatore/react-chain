import localforage from 'localforage';

export const WALLET_EDIT = "WALLET_EDIT";
export const WALLET_CLEAR = "WALLET_CLEAR";
export const WALLET_CREATE = "WALLET_CREATE";

export const getKeyPairs = () => {
    return dispatch => {
        localforage.getItem('keys', function (err, value) {
            const payload = value? JSON.parse(value): {};
            dispatch({ type: WALLET_EDIT, payload });
        });
    }
}

export const saveKeyPairs = (keys) => {
    return dispatch => {
        localforage.setItem('keys', JSON.stringify(keys));
        dispatch({ type: WALLET_EDIT, payload:{publicKey: keys.publicKey , privateKey: keys.privateKey} });
        console.log('Key saved!');
    }
}