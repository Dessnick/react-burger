import React from 'react';
import styles from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import baseUrl from '../../utils/data';

function App() {
  const [data, setData] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    const getData = async () => {
      setIsLoaded(false);
      setHasError(false);
      try {
        const res = await fetch(`${baseUrl}ingredients`);
        if (!res.ok) {
          throw new Error();
        }
        // eslint-disable-next-line no-shadow
        const { data } = await res.json();
        setData(data);
        setIsLoaded(true);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        setHasError(true);
        setIsLoaded(false);
      }
    };

    getData();
  }, []);

  return (
    <>
      <AppHeader />
      {hasError && 'Ошибка загрузки'}
      {isLoaded && (
        <main className={styles.content}>
          <BurgerIngredients data={data} />
          <BurgerConstructor data={data} />
        </main>
      )}
    </>
  );
}

export default App;
