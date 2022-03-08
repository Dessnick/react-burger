import React from 'react';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import BurgerConstructorContext from '../../services/burgerConstructorContext';

import styles from './app.module.css';

import baseUrl from '../../utils/data';

const initialState = {
  data: [],
  totalPrice: 0,
};

const reducer = (state, action) => {
  let { totalPrice } = state;
  const { data } = state;

  if (data.length > 0) {
    totalPrice =
      data
        .filter((item) => item.type !== 'bun')
        .reduce((acc, item) => acc + item.price, 0) +
      data.find((item) => item.type === 'bun').price * 2;
  }

  switch (action.type) {
    case 'data':
      return { ...state, data: action.payload };
    case 'totalPrice':
      return { ...state, totalPrice };
    default:
      throw new Error('reducer: Ah shit, here we go again');
  }
};

function App() {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    const getData = async () => {
      setIsLoaded(false);
      setHasError(false);
      try {
        const res = await fetch(`${baseUrl}/ingredients`);
        if (!res.ok) {
          throw new Error(`App: Ah shit, here we go again ${res.status}`);
        }
        const { data } = await res.json();
        dispatch({ type: 'data', payload: data });
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

  const burgerContext = React.useMemo(() => ({ state, dispatch }), [state]);

  return (
    <>
      <AppHeader />
      {hasError && 'Ошибка загрузки'}
      {isLoaded && (
        <main className={styles.content}>
          <BurgerConstructorContext.Provider value={burgerContext}>
            <BurgerIngredients />
            <BurgerConstructor />
          </BurgerConstructorContext.Provider>
        </main>
      )}
    </>
  );
}

export default App;
