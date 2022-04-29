import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useLocation, useHistory } from 'react-router-dom';

import { logout } from '../../../services/slices/auth';

import styles from './profile-nav.module.css';

function ProfileNavigation() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const handleLogoutUser = () => {
    dispatch(logout());
    history.replace({ pathname: '/login' });
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li className={styles.list__item}>
          <NavLink
            to="/profile"
            exact
            className={`${styles.link}
                    text text_type_main-medium`}
            activeClassName={styles.link_active}
          >
            Профиль
          </NavLink>
        </li>
        <li className={styles.list__item}>
          <NavLink
            to="/profile/orders"
            exact
            className={`${styles.link}
                    text text_type_main-medium`}
            activeClassName={styles.link_active}
          >
            История заказов
          </NavLink>
        </li>
        <li className={styles.list__item}>
          <NavLink
            to="/login"
            exact
            onClick={handleLogoutUser}
            className={`${styles.link}
                    text text_type_main-medium`}
            activeClassName={styles.link_active}
          >
            Выход
          </NavLink>
        </li>
      </ul>

      {location.pathname === '/profile' && (
        <span
          className={`${styles.caption} text text_type_main-small text_color_inactive`}
        >
          В этом разделе вы можете изменить свои персональные данные
        </span>
      )}
      {location.pathname === '/profile/orders' && (
        <span
          className={`${styles.caption} text text_type_main-small text_color_inactive`}
        >
          В этом разделе вы можете просмотреть свою историю заказов
        </span>
      )}
    </nav>
  );
}

export default ProfileNavigation;
