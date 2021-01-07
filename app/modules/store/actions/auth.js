/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';


export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let timer;

export const authenticate = (token, expiryTime) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, token: token });
  };
};

export const login = (email, password) => {
  return async dispatch => {
    if (email !== "" && password !== "") {

      
      try {
        const res = await fetch(``,
          {
            method: 'POST',
            headers: {
              'AUTHORIZATION': 'Bearer Token'
            },
            body: JSON.stringify({
              usuario: email,
              contrasena: password
            })
          });
        const resData = await res.json();
        if (resData) {
          console.log('todo bien con el login')
          console.log(resData)
          dispatch(authenticate(resData.access_token, parseInt(resData.expires_in) * 1000));
          const expirationDate = new Date(
            new Date().getTime() + parseInt(resData.expires_in) * 1000
          );
          saveDataToStorage(resData.access_token, expirationDate);
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



const saveDataToStorage = (token, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      expiryDate: expirationDate.toISOString()
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