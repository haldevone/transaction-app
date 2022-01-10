// import { async } from "@firebase/util";
import { useEffect, useState } from "react";
import {authSignup, auth, updateProfile} from '../firebase/config'
import { useAuthContext } from "./useAuthContext";


export const useSignup = () =>{
    const[isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (email:string, password:string, displayName:string) => {
        setError(null);
        setIsPending(true);

        try {
            //sign up user
            const res : any = await authSignup(email, password);

            if (!res) {
                throw new Error("Could not complete signup");
            }
            //add displayname to user
            await updateProfile(res.user, {displayName});

            //dispatch login action
            dispatch({ type: 'LOGIN', payload: res.user });

            //Update state
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

    //Useeffect return is only called on Unmount
    //Cancell out the seterror and ispending rerendering when leave page
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return{
        error, isPending, signup
    }

}
