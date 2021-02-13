import React, { useState } from 'react';
import styles from './App.module.css';
import Home from './Home/Index';
import Nav from './Nav/Index'

export default () => {
  const [ search, setSearch ] = useState('');

  return (
    <div className={styles.App}>
      <Nav getSearch={setSearch}/>
      <Home search={search}/>
    </div>
  );
}
