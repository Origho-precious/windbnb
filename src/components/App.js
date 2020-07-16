import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import Home from './Home/Index';
import Nav from './Nav/Index'

export default () => {
  const [ search, setSearch ] = useState(null);

  useEffect(() => {
    
  }, [search])

  return (
    <div className={styles.App}>
      <Nav getSearch={setSearch}/>
      <Home search={search}/>
    </div>
  );
}

