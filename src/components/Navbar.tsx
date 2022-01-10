import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import useLogout from '../hooks/useLogut'
import { useAuthContext } from '../hooks/useAuthContext'
import { useState } from 'react'

function Navbar() {

    const { logout } = useLogout();
    const { user } = useAuthContext();
    const [buttonOne, setButtonOne] = useState("btn btn-selected")
    const [buttonTwo, setButtonTwo] = useState("btn")

    function SetButtonOne (){
        setButtonOne("btn btn-selected");
        setButtonTwo("btn");
        console.log("Btn 1");
    }
    function SetButtonTwo (){
        setButtonOne("btn");
        setButtonTwo("btn btn-selected");
        console.log("Btn 2");
    }

    return (
        <div className={"navbar"}>
            <ul>
                <li className={"title"}>MyWallet</li>

                {!user && (
                    <>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">Signup</Link></li>
                    </>
                )}

                {user && (
                    <>
                        <li>
                            <Link to="/">
                                    <button className={buttonOne} onClick={() => 
                                        SetButtonOne()}>Transactions</button>
                                </Link>
                            </li>
                            <li>
                                <Link to="/chart">
                                    <button className={buttonTwo} onClick={() => 
                                    SetButtonTwo()} >Chart</button>
                                </Link>
                        </li>
                    
                        <li className='navPush'>hello, {user.displayName}</li>
                        <li>
                            <button className={"btn"} onClick={logout}>Logout</button>
                        </li>
                    </>
                )}
            </ul>
        </div>
    )
}

export default Navbar
