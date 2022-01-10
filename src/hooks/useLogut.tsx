import { useEffect, useState} from "react";
import { auth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import React from 'react'


function useLogout() {
    const[isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const logout = async () => {
        setError(null);
        setIsPending(true);

        //Signout user
        try {
            await auth.signOut();

            //dispatch logut action
            dispatch({type: 'LOGOUT'});

            if (!isCancelled) {
                setError(null);
                setIsPending(false);
            }
            
        } catch (err : any) {
            if (!isCancelled) {
                console.log(err.message);
                setError(err.message);
                setIsPending(false);
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return {logout, error, isPending}
}

export default useLogout
