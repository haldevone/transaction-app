import { useEffect, useState} from "react";
import { authSignIn } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import React from 'react'


function useLogin() {
    const[isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email : any, password : any) => {
        setError(null);
        setIsPending(true);

        //Signout user
        try {
            const res = await authSignIn(email, password)

            //dispatch logut action
            dispatch({type: 'LOGIN', payload: res.user});

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

    return {login, error, isPending}
}

export default useLogin
