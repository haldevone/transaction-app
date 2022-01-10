import { useReducer, useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { collection , addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';


let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state : any, action: any) => {
    switch (action.type) {
        case 'IS_PENDING':
            return{ isPending: true, document: null, success: false, error: null}
        case 'ADDED_DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null}
        case 'DELETED_DOCUMENT':
            return { isPending: false, document: null, success: true, error: null}
        case 'ERROR':
            return { isPending: false, document: null, success: true, error: action.payload}
        default:
            return state;
    }
}

    const useFirestore = (collectionName : string) => {

    const [response, dispatch] = useReducer(firestoreReducer, initialState);
    const [isCancelled, setIsCancelled] = useState(false);

    const { user } = useAuthContext();

    const collectionRef : any = collection(db, collectionName);

    //only dispatch if not cancelled
    const dispatchIfNotCancelled = (action : object) =>{
        if (!isCancelled) {
            dispatch(action);
        }
    }
    
    // add document
    const addDocument = async (doc : any) => {
        dispatch({type: 'IS_PENDING'});

        try {
            const docRef : any = addDoc(collectionRef, doc);
            const addedDocument = await docRef.add({ ...doc});
            dispatchIfNotCancelled({type: 'ADDED_DOCUMENT', payload: addedDocument});
        } catch (err : any) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: err.message});
        }
    }

    //delete document
    const deleteDocument = async (id : any) => {
        dispatch({type: 'IS_PENDING'});

        try {
            await deleteDoc(doc(db, collectionName, (id)));
            dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT'});
        } catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: 'Could not delete!'});
        }
    }

    useEffect(() => {
        return () => {
            setIsCancelled(true);
        }
    }, []);

    return {addDocument, deleteDocument, response}
}

export default useFirestore