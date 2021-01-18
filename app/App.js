/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from "./components/Pages/Login";
import { NavigationContainer } from "@react-navigation/native";
import SignUp from "./components/Pages/SignUp";
import Home from "./components/Pages/Home";
import 'react-native-gesture-handler';
import HistoryTransactionDetails from "./components/Pages/HistoryTransactionDetails";

import { Provider } from 'react-redux';
import authReducer from './modules/store/reducers/auth'
import { createStore, combineReducers, applyMiddleware } from 'redux';

import ReduxThunk from 'redux-thunk';
import StartupScreen from './components/Pages/StartupScreen';

const rootReducer = combineReducers({
    auth: authReducer
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));


const App = () => {
    const Stack = createStackNavigator();

    return (
        <Provider store={store}>
            <NavigationContainer            >
                <Stack.Navigator
                    headerMode={"none"}
                >
                    <Stack.Screen name="Startup" component={StartupScreen} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="SignUp" component={SignUp} />
                    <Stack.Screen name="HistoryTransactionDetails" component={HistoryTransactionDetails} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>

    );
};

const styles = StyleSheet.create({});

export default App;
