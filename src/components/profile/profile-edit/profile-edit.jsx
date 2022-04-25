/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
  authSelector,
  getUser,
  updateUser,
  resetUpdateMessage,
} from '../../../services/slices/auth';

import styles from './profile-edit.module.css';

function ProfileEdit() {
  const dispatch = useDispatch();
  const nameInputRef = React.useRef(null);
  const emailInputRef = React.useRef(null);
  const passwordInputRef = React.useRef(null);

  const { user, isUpdated, error } = useSelector(authSelector);

  const [formData, setformData] = React.useState({
    name: user.name,
    email: user.email,
    password: '',
  });
  const [showButton, setShowButton] = React.useState(false);

  React.useEffect(() => {
    dispatch(getUser());
    setformData({
      name: user.name,
      email: user.email,
      password: '',
    });
  }, [dispatch, user]);

  const handleOnReset = (evt) => {
    evt.preventDefault();
    setformData({
      name: user.name,
      email: user.email,
      password: '',
    });
    setShowButton(false);
  };

  const handleOnFocus = () => {
    dispatch(resetUpdateMessage());
  };

  const handleOnChange = (evt) => {
    setformData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
    setShowButton(true);
  };

  const handleOnIconClickName = () => {
    setTimeout(() => nameInputRef.current.focus(), 0);
  };
  const handleOnIconClickEmail = () => {
    setTimeout(() => emailInputRef.current.focus(), 0);
  };
  const handleOnIconClickPassword = () => {
    setTimeout(() => passwordInputRef.current.focus(), 0);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(formData));
    setShowButton(false);
  };

  return (
    <>
      <div className={styles.container}>
        <form className={styles.form}>
          <Input
            type="text"
            placeholder="Имя"
            onChange={handleOnChange}
            onFocus={handleOnFocus}
            icon={formData.name === user.name ? 'EditIcon' : 'CloseIcon'}
            value={formData.name}
            name="name"
            error={false}
            ref={nameInputRef}
            onIconClick={handleOnIconClickName}
            errorText="Ошибка"
            size="default"
          />

          <Input
            type="email"
            placeholder="E-mail"
            onChange={handleOnChange}
            onFocus={handleOnFocus}
            icon={formData.email === user.email ? 'EditIcon' : 'CloseIcon'}
            value={formData.email}
            name="email"
            error={false}
            ref={emailInputRef}
            onIconClick={handleOnIconClickEmail}
            errorText="Ошибка"
            size="default"
          />

          <Input
            type="password"
            placeholder="Пароль"
            onChange={handleOnChange}
            onFocus={handleOnFocus}
            icon={formData.password === '' ? 'EditIcon' : 'CloseIcon'}
            value={formData.password}
            name="password"
            error={false}
            ref={passwordInputRef}
            errorText="Ошибка"
            size="default"
            onIconClick={handleOnIconClickPassword}
          />

          {showButton && (
            <div className={styles.buttons}>
              <Button
                type="primary"
                size="medium"
                onClick={handleOnSubmit}
                className={`${styles.button}`}
              >
                Сохранить
              </Button>

              <Button
                type="secondary"
                size="medium"
                onClick={handleOnReset}
                className={`${styles.button}`}
              >
                Отмена
              </Button>
            </div>
          )}

          {isUpdated && (
            <span
              className={`${styles.success} text text_type_main-small text_color_inactive mb-3`}
            >
              Данные обновлены!
            </span>
          )}

          {error && (
            <span className={`${styles.error} text_type_main-medium mb-4`}>
              {error}
            </span>
          )}
        </form>
      </div>
    </>
  );
}

export default ProfileEdit;
