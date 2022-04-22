import React from 'react';
import { Link } from 'react-router-dom';

import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

// eslint-disable-next-line no-unused-vars
import styles from './forgot-password.module.css';

function ForgotPassword() {
  const [value, setValue] = React.useState(null);

  const onChange = (evt) => {
    setValue(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  return (
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
  );
}

export default ForgotPassword;
