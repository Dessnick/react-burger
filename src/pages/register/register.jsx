/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { Link } from 'react-router-dom';

import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './register.module.css';

function Register() {
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
  };

  return (
    <>
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
            value={formData.username}
            name="username"
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
    </>
  );
}

export default Register;
