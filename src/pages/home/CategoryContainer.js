import React from 'react'
import './CategoryContainer.css'
import { useState, useEffect, useRef } from 'react'
import { useCollection } from '../../hooks/useCollection';
import TransactionList from './TransactionList'
import { useAuthContext } from '../../hooks/useAuthContext';

function CategoryContainer(){
    const { user } = useAuthContext();
    const [choosenCategory, setChoosenCategory] = useState('Misc');
    const { documents, error } = useCollection('transactions', 'createdAt', choosenCategory, 
    ["uid", "==", user.uid]);
    const focusBtn = useRef();
    
    const selectCategory = (cat) => {
        setChoosenCategory(cat);
    }

    useEffect(() =>{
        focusBtn.current.focus();
    }, [])

    return(
        <>
        <div className='btn-container'>
            <button className='btn' ref={focusBtn} onClick={() => selectCategory('Misc')}>Misc</button>
            <button className='btn' onClick={() => selectCategory('Housing')}>Housing</button>
            <button className='btn' onClick={() => selectCategory('Transport')}>Transport</button>
            <button className='btn' onClick={() => selectCategory('Food')}>Food</button>
            <button className='btn' onClick={() => selectCategory('Shopping')}>Shopping</button>
        </div>
        {error && <p>{error}</p>}
        {documents && <TransactionList transactions={documents} choosenCategory={choosenCategory}/>}
        </>
    )
}


export default CategoryContainer