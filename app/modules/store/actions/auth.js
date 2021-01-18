/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';


export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let timer;

export const authenticate = (token) => {
  return dispatch => {
    dispatch({ type: AUTHENTICATE, token: token });
  };
};

export const login = (email, password) => {
  return async dispatch => {
    if (email !== "" && password !== "") {
 
      try {
        const res = await fetch(`http://209.97.152.122:3001/auth/login`,
          {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer Token',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              usuario: email,
              contrasena: password
            })
          });
        const resData = await res.json();
        if (resData.data.usuario.token) {
          console.log('todo bien con el login')
          console.log(resData)
          dispatch(authenticate(resData.data.usuario.token));
          /*const expirationDate = new Date(
            new Date().getTime() + parseInt(resData.expires_in) * 1000
          );*/
          saveDataToStorage(resData.data.usuario.token);
          return resData;
        }

      } catch (e) {
        console.log(e)
      }
    } else {
      console.log("Campos vacíos", "Por favor ingrese sus datos.", "warning")
    }
  };
};



const saveDataToStorage = (token) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
    })
  );
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};