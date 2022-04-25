/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useLocation, useHistory } from 'react-router-dom';

import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { authSelector, registration } from '../../services/slices/auth';

import styles from './register.module.css';

function Register() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const { isLoggedIn, successfulRegistration } = useSelector(authSelector);

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
  });

  const pathToRedirect = () => {
    history.push('/login');
  };

  const onChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(registration(formData));
    if (successfulRegistration) {
      setTimeout(pathToRedirect, 2000);
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <Redirect to={location.state?.from || '/'} />
      ) : (
        <div className={styles.content}>
          <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
          <form
            className={`${styles.form} mb-20`}
            name="login"
            onSubmit={handleSubmit}
          >
            <Input
              type="text"
              placeholder="Имя"
              onChange={onChange}
              value={formData.name}
              name="name"
              error={false}
              errorText="Ошибка"
              size="default"
            />
            <Input
              type="text"
              placeholder="E-mail"
              onChange={onChange}
              value={formData.email}
              name="email"
              error={false}
              errorText="Ошибка"
              size="default"
            />
            <PasswordInput
              onChange={onChange}
              value={formData.password}
              name="password"
            />
            <Button type="primary" size="medium">
              Зарегистрироваться
            </Button>
          </form>
          <div className={`${styles.line}`}>
            <span className="text text_type_main-default text_color_inactive">
              Уже зарегистрированы?
            </span>
            <Link className={`${styles.link} ml-2`} to="/login">
              Войти
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Register;
