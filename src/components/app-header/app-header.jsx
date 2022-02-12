import React from 'react';
import styles from './app-header.module.css';

import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={`${styles.navigation} + pt-4 pb-4`}>
        <ul className={styles.list}>
          <li className={`${styles.list__item} + pt-4 pb-4 pl-5 pr-5`}>
            <a href="#" target="_blank" className={styles.link}>
              <BurgerIcon type="primary" />
              <span className="text text_type_main-default ml-2">
                Конструктор
              </span>
            </a>
          </li>
          <li className={`${styles.list__item} + pt-4 pb-4 pl-5 pr-5`}>
            <a href="#" target="_blank" className={styles.link}>
              <ListIcon type="secondary" />
              <span className="text text_type_main-default text_color_inactive ml-2">
                Лента заказов
              </span>
            </a>
          </li>
        </ul>
        <a href="#" target="_blank" className={styles.logo}>
          <Logo />
        </a>
        <div className={`${styles.profile} + pt-4 pb-4 pl-5 pr-5`}>
          <a href="#" target="_blank" className={styles.link}>
            <ProfileIcon type="secondary" />
            <span className="text text_type_main-default text_color_inactive ml-2">
              Личный кабинет
            </span>
          </a>
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;
