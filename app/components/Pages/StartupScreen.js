/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import * as authActions from '../../modules/store/actions/auth'

import { useNavigation } from '@react-navigation/native';


const StartupScreen = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        console.log(userData)
        console.log('LOGIN')
        navigation.replace('Login')
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token,name, tarjeta } = transformedData;


      navigation.replace('Home');
      dispatch(authActions.authenticate(token, name, tarjeta));
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default StartupScreen;
