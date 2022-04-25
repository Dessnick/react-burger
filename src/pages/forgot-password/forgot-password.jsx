/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useLocation } from 'react-router-dom';

import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { authSelector, forgotPassword } from '../../services/slices/auth';

import styles from './forgot-password.module.css';

function ForgotPassword() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isLoggedIn, preLogged } = useSelector(authSelector);

  const [value, setValue] = React.useState('');

  const onChange = (evt) => {
    setValue(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(forgotPassword(value));
  };

  return (
    <>
      {isLoggedIn || preLogged ? (
        <Redirect to={location.state?.from || '/'} />
      ) : (
        <div className={styles.content}>
          <h1 className="text text_type_main-medium">Восстановление пароля</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Укажите e-mail"
              onChange={onChange}
              value={value}
              name="email"
              error={false}
              errorText="Ошибка"
              size="default"
            />
            <Button type="primary" size="medium">
              Восстановить
            </Button>
          </form>
          <span className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
            <Link className={`${styles.link} ml-2`} to="/login">
              Войти
            </Link>
          </span>
        </div>
      )}
    </>
  );
}

export default ForgotPassword;
