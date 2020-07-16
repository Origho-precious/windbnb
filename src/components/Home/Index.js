import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import axios from 'axios';

const Home = (props) => {
    const [ results, setResults ] = useState(null);
    const [ searchQuery, setSearchQuery ] = useState(null);
    let numOfStay = [];
    const [ stays, setStays ] = useState(null);

    const getNumOfStays = () => {
        setStays(numOfStay.length)
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('https://windbnb-fe531.firebaseio.com/data.json')
            
            setResults(response.data);

            setSearchQuery(props.search);

            getNumOfStays()
        };

       fetchData()
    }, [searchQuery, props.search])

    const renderHouses = () => {
        if(results && !searchQuery){
            return results.map(item => {
                return(
                    <div className={styles.gridItem} key={item.title}>
                        <img src={item.photo} alt="house"/>
                        <div className={styles.texts}>
                            { item.superHost ? <span className={styles.superHost}>SUPERHOST</span> : null}
                            <span>{item.type} &nbsp; {item.beds ? `${item.beds} beds` : null}</span>
                            <span><i className="fas fa-star"></i> {item.rating}</span>
                        </div>
                        <p>{item.title}</p>
                    </div>
                )
            });
        }

        if(results && searchQuery){
            return results.map(item => {
                if((`${item.city}, ${item.country}` === searchQuery.location) && (item.maxGuests === searchQuery.guests || item.maxGuests > searchQuery.guests)){
                    numOfStay.push(item)
                    return(
                        <div className={styles.gridItem} key={item.title}>
                            <img src={item.photo} alt="house"/>
                            <div className={styles.texts}>
                                { item.superHost ? <span className={styles.superHost}>SUPERHOST</span> : null}
                                <span>{item.type} &nbsp; {item.beds ? `${item.beds} beds` : null}</span>
                                <span><i className="fas fa-star"></i> {item.rating}</span>
                            </div>
                            <p>{item.title}</p>
                        </div>
                    )
                }
            });
        }
    
    }

    return(
        <div className={styles.Home}>
            <header>
                <h2>Stays in Finland</h2>
                <p>{stays ? `${stays} stay(s)` : '12+ stays'}</p>
            </header>
            <div className={styles.grid}>
                {renderHouses()}
            </div>
        </div>
    )
}

export default Home;