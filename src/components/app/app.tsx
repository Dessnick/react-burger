import React from 'react';
import styles from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import baseUrl from '../../utils/data';

const App = () => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(baseUrl);
        if (res.ok) {
          const { data } = await res.json();
          setData(data);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getData();
  }, []);

  return (
    <>
      {console.log(data)}
      <AppHeader />
      <main className={styles.content}>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} />
      </main>
    </>
  );
};

export default App;
