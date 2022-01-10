import { createContext, useReducer } from "react";
import { auth, onAuthStateChanged } from "../firebase/config";
import { useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) =>{
    switch (action.type) {
        case 'LOGIN':
            return{ ...state, user: action.payload }
        case 'LOGOUT':
            return{ ...state, user: null }
        case 'AUTH_IS_READY':
            return { ...state, user: action.payload, authIsReady: true}
        default:
            return state;
    }
}

export const AuthContextProvider = ({children}) => {
    
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false
    });

    useEffect(() => {
        //This is called on refresh & on user update from firebase
        const unsub = onAuthStateChanged(auth, (user) => {
            dispatch({type: 'AUTH_IS_READY', payload: user});
            unsub(); //unsubscribe so that it wont fire the function again
        })
    }, [])
    console.log('AuthContext state:', state);

    return(
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}