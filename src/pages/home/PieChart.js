import React from 'react'
import * as d3 from 'd3'
import { useRef, useEffect, useState } from 'react'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';
import './PieChart.css'
import PieList from './PieList';
 

const PieChart = () => {
    const { user } = useAuthContext();
    const pieRef = useRef();
    const [catUpdated, setCatUpdated] = useState([]);
    const [loading, setLoading] = useState(false);
    let categoryData = [];

    function CategoryDataConverter(cat, pieData){
        //Get only a specific category from server data
        const filteredTransaction = pieData.filter((item) => {
            return item.category === cat; 
        })
        //Gets a total nr of summed amounts of that category
        const total = filteredTransaction.reduce((currTot, item) => {
            return Number(item.amount) + currTot;
        }, 0)
        //Puts the category and total sum to a new array
        categoryData[categoryData.length] = {name: cat, amount: total}
    }

    useEffect(() => {
        setLoading(true);
        const colRef = query(collection(db, "transactions"), 
        where("uid", "==", user.uid)); 

        getDocs(colRef)
        .then((snapshot) => {
            let pieData = [];
            snapshot.docs.forEach((doc) => {
                pieData.push({ ...doc.data(), id: doc.id})
            })

            const allCategories = ['Misc', 'Housing', 'Transport', 'Food', 'Shopping'];
            allCategories.map((cat) => {

                CategoryDataConverter(cat, pieData);
            });

            //D3 Get position of the data
            const chart = d3.pie().value(d => d.amount)(categoryData);
            //D3 Define Arc
            const arc = d3.arc().innerRadius(50).outerRadius(200);

            const colors = d3.scaleOrdinal(['#44E70B','#EDEC0E','#ED330E','#0ECAED','#ffa822']);

            //D3 Define size and pos of SVG
            const svg = d3.select(pieRef.current)
                .attr('width', 500)
                .attr('height', 500)
                .append('g')
                .attr('transform', 'translate(250, 250)');

            //Add tooltip
            const tooldiv = d3.select('.chartArea')
            .append('div')
            .style('visibility', 'hidden')
            .style('position', 'absolute')
            .style('background-color', 'green')
            .style('color', 'white')
            .style('font-size', '1.4rem')
            .style('border-radius', '10px')
            .style('padding-left', '0.4em')
            .style('padding-right', '0.4em')
            .style('z-index', '100')

            //D3 Draw pie
            svg.append('g')
            .selectAll('path')
            .data(chart)
            .join('path')
                .attr('d', arc)
                .attr('fill', (d,i)=>colors(i))
                .attr('stroke', 'white')
                .on('mouseover', (e,d) => {
                    tooldiv.style('visibility', 'visible')
                    .text(`${d.data.name}:` + `${d.data.amount}`)
                })
                .on('mousemove', (e,d) => {
                    tooldiv.style('top', (e.pageY-50) + 'px')
                            .style('left', (e.pageX-50) + 'px')
                })
                .on('mouseout', () => {
                    tooldiv.style('visibility', 'hidden')
                })


            setCatUpdated(categoryData);
        })
        .catch(err => {
            console.log(err.message);
        })
        .finally(() => {
            setLoading(false);
          });

    }, []);
    

    return (
        <div class='chartArea'>
            <h1>Transaction Chart</h1>
            <div className='chart'>
                <svg ref={pieRef}></svg>
                {!loading &&
                    <PieList catUpdated={catUpdated} />
                }
            </div>
        </div>
    )
}   

export default PieChart
