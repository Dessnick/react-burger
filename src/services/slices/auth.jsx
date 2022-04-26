/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCookies, setCookies, deleteCookies } from '../../utils/cookies';
import baseUrl from '../../utils/data';

const EXPIRE_SECONDS = 1200;

const initialState = {
  user: {
    email: '',
    password: '',
    name: '',
  },
  successfulRegistration: false,
  isLoggedIn: false,
  isUpdated: false,
  isLoaded: false,
  error: '',

  forgotPassSuccess: false,
  resetPassSuccess: false,
};

export const loginAuth = createAsyncThunk(
  'auth/login',
  async (form, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await res.json();
      return result;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      return rejectWithValue(e.message);
    }
  }
);

export const registration = createAsyncThunk(
  'auth/registration',
  async (form, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await res.json();
      return result;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      return rejectWithValue(e.message);
    }
  }
);

export const updateToken = createAsyncThunk(
  'auth/updateToken',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/auth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: getCookies('refreshToken') }),
      });
      if (res.status !== 200) {
        updateToken();
      }
      const result = await res.json();
      return result;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      return rejectWithValue(e.message);
    }
  }
);

export const getUser = createAsyncThunk(
  'auth/getUser',
  async (token, { rejectWithValue }) => {
    try {
      if (getCookies('accessToken')) {
        const res = await fetch(`${baseUrl}/auth/user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: getCookies('accessToken'),
          },
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
        });
        const result = await res.json();
        return result;
      }
      updateToken();
      getUser();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      return rejectWithValue(e.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (form, { rejectWithValue }) => {
    try {
      if (getCookies('accessToken')) {
        const res = await fetch(`${baseUrl}/auth/user`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            authorization: getCookies('accessToken'),
          },
          body: JSON.stringify(form),
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
        });
        const result = await res.json();
        return result.user;
      }
      updateToken();
      getUser(form);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      return rejectWithValue(e.message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (token, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: getCookies('accessToken'),
        },
        body: JSON.stringify({ token: getCookies('refreshToken') }),
      });
      const result = await res.json();
      return result;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      return rejectWithValue(e.message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/password-reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const result = await res.json();
      return result;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      return rejectWithValue(e.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (form, { rejectWithValue }) => {
    try {
      const res = await fetch(`${baseUrl}/password-reset/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await res.json();
      return result;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      return rejectWithValue(e.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkLogin: (state) => {
      getCookies('refreshToken') ? getUser() : (state.isLoggedIn = false);
    },
    resetUpdateMessage: (state) => {
      state.isUpdated = false;
    },
    resetError: (state) => {
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAuth.pending, (state) => {
        state.isLoaded = false;
        state.forgotPassSuccess = false;
        state.resetPassSuccess = false;
      })
      .addCase(loginAuth.fulfilled, (state, { payload }) => {
        state.isLoaded = true;
        state.user.name = payload.user.name;
        state.user.email = payload.user.email;
        state.user.password = payload.user.password;
        state.isLoggedIn = true;

        setCookies('accessToken', payload.accessToken, {
          expires: EXPIRE_SECONDS,
        });
        setCookies('refreshToken', payload.refreshToken);
      })
      .addCase(loginAuth.rejected, (state) => {
        state.error = 'Ошибка!';
      })

      .addCase(registration.pending, (state) => {
        state.isLoaded = false;
      })
      .addCase(registration.fulfilled, (state, { payload }) => {
        state.isLoaded = true;
        state.user = payload;
        payload.success === true
          ? (state.successfulRegistration = true)
          : (state.successfulRegistration = false);

        setCookies('accessToken', payload.accessToken, {
          expires: EXPIRE_SECONDS,
        });
        setCookies('refreshToken', payload.refreshToken);
      })
      .addCase(registration.rejected, (state) => {
        state.isLoaded = false;
        state.error = 'Ошибка!';
      })

      .addCase(updateToken.fulfilled, (state, { payload }) => {
        state.isLoggedIn = true;

        deleteCookies('accessToken');
        deleteCookies('refreshToken');
        setCookies('accessToken', payload.accessToken, {
          expires: EXPIRE_SECONDS,
        });
        setCookies('refreshToken', payload.refreshToken);
      })
      .addCase(updateToken.rejected, (state) => {
        state.error = 'Ошибка!';
        state.isLoggedIn = false;
      })

      .addCase(getUser.pending, (state) => {
        state.isLoaded = false;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.isLoaded = true;
        state.user.name = payload.user.name;
        state.user.email = payload.user.email;
        state.user.password = payload.user.password;
        state.isLoggedIn = true;
      })
      .addCase(getUser.rejected, (state) => {
        state.error = 'Ошибка!';
      })

      .addCase(updateUser.pending, (state) => {
        state.isLoaded = false;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.isLoaded = true;
        state.user = payload;
        state.isLoggedIn = true;
        state.isUpdated = true;
      })
      .addCase(updateUser.rejected, (state) => {
        state.error = 'Ошибка!';
      })

      .addCase(forgotPassword.pending, (state) => {
        state.isLoaded = false;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoaded = true;
        state.forgotPassSuccess = true;
      })
      .addCase(forgotPassword.rejected, (state) => {
        state.error = 'Ошибка!';
        state.forgotPassSuccess = false;
      })

      .addCase(resetPassword.pending, (state) => {
        state.isLoaded = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoaded = true;
        state.resetPassSuccess = true;
      })
      .addCase(resetPassword.rejected, (state) => {
        state.isLoaded = false;
        state.error = 'Ошибка!';
        state.resetPassSuccess = false;
      })

      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = initialState.user;
        state.isLoggedIn = false;

        deleteCookies('accessToken');
        deleteCookies('refreshToken');
      })
      .addCase(logout.rejected, (state) => {
        state.error = 'Ошибка!';
      });
  },
});

export const authSelector = (state) => state.auth;

export const { checkLogin, resetUpdateMessage, resetError } = authSlice.actions;

export const authSliceReducer = authSlice.reducer;
