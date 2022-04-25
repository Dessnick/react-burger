import React from 'react';
import { Link, useLocation, NavLink } from 'react-router-dom';

import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './app-header.module.css';

function AppHeader() {
  const location = useLocation();

  const changeProfileIcon = () =>
    location.pathname !== '/profile' && location.pathname !== '/profile/orders'
      ? 'secondary'
      : 'primary';

  return (
    <header className={styles.header}>
      <nav className={`${styles.navigation} + pt-4 pb-4`}>
        <ul className={styles.list}>
          <li className={`${styles.list__item} + pt-4 pb-4 pl-5 pr-5`}>
            <NavLink
              className={`${styles.link} + mr-2`}
              to="/"
              exact
              activeClassName={styles.link_active}
            >
              <BurgerIcon
                type={location.pathname === '/' ? 'primary' : 'secondary'}
              />
              <span className="text text_type_main-default ml-2">
                Конструктор
              </span>
            </NavLink>
          </li>
          <li className={`${styles.list__item} + pt-4 pb-4 pl-5 pr-5`}>
            <NavLink
              className={styles.link}
              to="/feed"
              activeClassName={styles.link_active}
            >
              <ListIcon
                type={location.pathname === '/feed' ? 'primary' : 'secondary'}
              />
              <span className="text text_type_main-default ml-2">
                Лента заказов
              </span>
            </NavLink>
          </li>
        </ul>
        <Link to="/">
          <div className={styles.link}>
            <Logo />
          </div>
        </Link>
        <ul className={styles.list}>
          <li className={`${styles.list__item} + pt-4 pb-4 pl-5 pr-5`}>
            <div className={`${styles.profile} + pt-4 pb-4 pl-5 pr-5`}>
              <NavLink
                className={styles.link}
                to="/profile"
                activeClassName={styles.link_active}
              >
                <ProfileIcon type={changeProfileIcon()} />
                <span className="text text_type_main-default ml-2">
                  Личный кабинет
                </span>
              </NavLink>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
