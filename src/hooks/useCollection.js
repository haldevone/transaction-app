import { useEffect, useState, useRef } from "react";
import { db } from '../firebase/config';
import { collection, onSnapshot, query, where, orderBy, limit } from "firebase/firestore";
import { useAuthContext } from "./useAuthContext";

export const useCollection = (collectionName, createdAt, category, _q) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);
    const { user } = useAuthContext();

    const q = useRef(_q).current;

    useEffect(() => {
        let refColl = collection(db, collectionName);

        if (q) {
            refColl = query(refColl, where(...q),
             orderBy(createdAt, "desc"), limit(25));
        }

        // const userQuery = query(collection(db, collectionName), 
        // where("uid", "==", user.uid) && where("category", "==", category) , 
        // orderBy(createdAt, "desc"), limit(25));
        console.log(category)

        const unsubscribe = onSnapshot(refColl, (snapshot) => {
         let results = []; 
         snapshot.docs.forEach((doc) => { 
             results.push({ ...doc.data(), id: doc.id})})
        
        //Update state
        setDocuments(results);
        setError(null);
        }, (error) => {
            console.log(error);
            setError('Could not Fetch the data');
        });
        //Unsubscribe on Unmount
        return () => {unsubscribe();
            console.log("unsubscribing")
        }
        
    }, [q])

    return { documents, error }
}
