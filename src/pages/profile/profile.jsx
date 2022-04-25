import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import ProfileNavigation from '../../components/profile/profile-nav/profile-nav';
import ProfileEdit from '../../components/profile/profile-edit/profile-edit';
import ProfileOrders from '../../components/profile/profile-orders/profile-orders';
import { getUser } from '../../services/slices/auth';

import styles from './profile.module.css';

function Profile() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className={`${styles.content} pr-5 pl-5`}>
      <ProfileNavigation />
      <Switch>
        <Route path="/profile" exact>
          <ProfileEdit />
        </Route>
        <Route path="/profile/orders" exact>
          <ProfileOrders />
        </Route>
      </Switch>
    </div>
  );
}

export default Profile;
