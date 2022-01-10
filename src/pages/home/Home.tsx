import React from 'react'
import './Home.css'
import TransactionForm from './TransactionForm'
import { useAuthContext } from '../../hooks/useAuthContext'
import CategoryContainer from './CategoryContainer'
import { useState } from 'react'



function Home() {
    const { user } = useAuthContext();

    return (
        <div className='container'>
            <div className='content'>
            <CategoryContainer />
                
            </div>
            <div className='sidebar'>
                <TransactionForm uid={user.uid} />
            </div>
        </div>
    )
}

export default Home

