import React from 'react';
import './Home.css';
import useFirestore from '../../hooks/useFirestore';


export default function TransactionList({transactions, choosenCategory}) {
    const { deleteDocument } = useFirestore('transactions');

    return (
        <ul className={'transactions'}>
        {console.log("listing documents")}
            {transactions.map((transaction) => 
                {if(transaction.category === choosenCategory)
                return(
                    <li key={transaction.id}>
               <p className={'name'}>{transaction.name}</p>
                <p className={'amount'}>{transaction.amount}</p>
                <button onClick={() => deleteDocument(transaction.id)}>x</button>  
            </li>
                )
            
        }
            )}
        </ul>
    )
}

