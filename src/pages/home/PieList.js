import React from 'react'
import './PieChart.css'

function PieList(catUpdated) {
    return (
        <>
            <ul className='chart-list'>
                {catUpdated.catUpdated.map((item) => {
                    return <li key={Math.random()}>
                                <h3 className={'name'}>{item.name}</h3>
                                <p className={'amount'}>{item.amount}</p>
                            </li>
                })}
            </ul>
            <ul className='chart-list-second'>
                {/* Highest */}
            </ul>
        </>
    )
}

export default PieList
