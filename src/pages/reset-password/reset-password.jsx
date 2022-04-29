/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useLocation } from 'react-router-dom';

import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { authSelector, resetPassword } from '../../services/slices/auth';

import styles from './reset-password.module.css';

function ResetPassword() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { forgotPassSuccess, resetPassSuccess, isLoggedIn, error } =
    useSelector(authSelector);

  const [formData, setformData] = React.useState({
    password: '',
    token: '',
  });

  const onChange = (evt) => {
    setformData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(resetPassword(formData));
  };

  if (!forgotPassSuccess) {
    return <Redirect to="/forgot-password" />;
  }

  if (!isLoggedIn && resetPassSuccess) {
    return <Redirect to="/login" />;
  }

  if (isLoggedIn) {
    return <Redirect to={location?.state?.from || '/'} />;
  }

  return (
    <div className={styles.content}>
      <h1 className="text text_type_main-medium">Восстановление пароля</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <PasswordInput
          onChange={onChange}
          value={formData.password}
          name="password"
          placeholder="введите новый пароль"
        />
        <Input
          type="text"
          placeholder="Введите код из письма"
          onChange={onChange}
          value={formData.token}
          name="token"
          error={false}
          errorText="Ошибка"
          size="default"
        />
        {error && (
          <span className={`${styles.error} text_type_main-medium mb-3`}>
            {error}
          </span>
        )}
        <Button type="primary" size="medium">
          Сохранить
        </Button>
      </form>
      <span className="text text_type_main-default text_color_inactive">
        Вспомнили пароль?
        <Link className={`${styles.link} ml-2`} to="/login">
          Войти
        </Link>
      </span>
    </div>
  );
}

export default ResetPassword;
