/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, Redirect } from 'react-router-dom';

import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import {
  loginAuth,
  authSelector,
  resetError,
} from '../../services/slices/auth';
import styles from './login.module.css';

function Login() {
  const dispatch = useDispatch();

  const { isLoggedIn, error } = useSelector(authSelector);
  const location = useLocation();

  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });

  const onChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(loginAuth(formData));
  };

  React.useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);

  return (
    <>
      {isLoggedIn ? (
        <Redirect to={location.state?.from || '/'} />
      ) : (
        <div className={styles.content}>
          <h1 className="text text_type_main-medium mb-6">Вход</h1>
          <form
            className={`${styles.form} mb-20`}
            name="login"
            onSubmit={handleSubmit}
          >
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
              Войти
            </Button>
            {error && (
              <span className={`${styles.error} text text_type_main-medium`}>
                {error}
              </span>
            )}
          </form>
          <div className={`${styles.line} text_type_main-medium mb-4`}>
            <span className="text_type_main-default">
              Вы — новый пользователь?
            </span>
            <Link
              className={`${styles.link} text_type_main-default ml-2`}
              to="/register"
            >
              Зарегистрироваться
            </Link>
          </div>
          <div className={`${styles.line} text_type_main-medium`}>
            <span className="text_type_main-default">Забыли пароль?</span>
            <Link
              className={`${styles.link} text_type_main-default ml-2`}
              to="/forgot-password"
            >
              Восстановить пароль
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
