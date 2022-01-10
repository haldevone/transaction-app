import React from 'react'
import { useState, useEffect } from 'react'
import useFirestore from '../../hooks/useFirestore';
import { Timestamp} from 'firebase/firestore';

interface Props{
    uid: string | number
}

export default function TransactionForm({uid} : Props) {

const [name, setName] = useState('');
const [category, setCategory] = useState('Misc');
const [amount, setAmount] = useState('');
const { addDocument, response} = useFirestore('transactions');

const handleSubmit = (e : any) => {
    e.preventDefault();
    const createdAt = Timestamp.fromDate(new Date());
    addDocument({
        uid,
        name,
        amount,
        createdAt,
        category
    });
}

//Reset form fields
useEffect(() => {
    console.log(response.success)
    if (response.success) {
        setName('');
        setAmount('');
    } 
}, [response.success])

    return (
        <>
         <h3> Add a Transaction</h3>
         <form onSubmit={handleSubmit}>
             <label>
                 <span>Transaction name:</span>
                 <input 
                 type="text"
                 required
                 onChange={(e) => setName(e.target.value)}
                 value={name}
                  />
             </label>
             <label>
                 <span>Category:</span>
                 <select value={category} onChange={(e) => setCategory(e.target.value)}>
                     <option value={'Misc'}>Misc</option>
                     <option value={'Housing'}>Housing</option>
                     <option value={'Transport'}>Transport</option>
                     <option value={'Food'}>Food</option>
                     <option value={'Shopping'}>Shopping</option>
                 </select>
             </label>
             <label>
                 <span>Amount (kr):</span>
                 <input 
                 type="number"
                 required
                 onChange={(e) => setAmount(e.target.value)}
                 value={amount}
                  />
             </label>
             <button>Add Transaction</button>
         </form>
        </>
    )
}

