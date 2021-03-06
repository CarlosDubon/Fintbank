import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native'
import { Block } from "galio-framework";
import SmallProfile from "../Items/SmallProfile";
import colors from "../../modules/colors";
import VirtualAccountCard from "../Items/VirtualAccountCard";
import TransactionHistory from "./TransactionHistory";

import { useSelector } from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import * as authActions from '../../modules/store/actions/auth'

const Balances = (props) => {

    const dispatch = useDispatch();

    const isAuth = useSelector(state => state.auth.token);
    const name = useSelector(state => state.auth.name);
    const [cuenta, setcuenta] = useState()
    const [cuenta2, setcuenta2] = useState()
    const [cuenta3, setcuenta3] = useState()
    const [saldo, setsaldo] = useState()
    const [fecha, setfecha] = useState()
    const [transacciones, settransacciones] = useState()
    const ultimasTransacciones = async () => {
        try {
            console.log(isAuth)
            const res = await fetch(`http://209.97.152.122:3001/transaction/me`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${isAuth}`,
                    },

                });
            const resData = await res.json();
            console.log('todo bien con las últimas transacciones')
            console.log('TRANSACCIONES')
            console.log(resData)
            console.log('ESTOOOOOOOOOOOOO')
            console.log(resData.msg[0].transacciones)
            settransacciones(resData.msg)
        } catch (e) {
            console.log('fallo con las transacciones')
            console.log(e)
        }
    }

    const datos = async () => {
        try {
            console.log(isAuth)
            const res = await fetch(`http://209.97.152.122:3001/account/myAccounts`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${isAuth}`,
                    },

                });
            const resData = await res.json();
            const userData = await AsyncStorage.getItem('userData');
            const transformedData = JSON.parse(userData);
            const { token, name } = transformedData;
            dispatch(authActions.authenticate(token, name, resData.data[0].id));
            console.log('todo bien con los datos')
            console.log(resData)
            setcuenta(resData.data[0].id.substr(0, 4))
            setcuenta2(resData.data[0].id.substr(4, 4))
            setcuenta3(resData.data[0].id.substr(8, 4))
            setsaldo(resData.data[0].saldo)
            setfecha(resData.data[0].created_at.substr(0, 10))

        } catch (e) {
            console.log('fallo con lo de la cuenta')
            console.log(e)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            ultimasTransacciones()
            datos()
        }, 55000);

        ultimasTransacciones()
        datos()

    }, [isAuth])
    return (

        <Block flex={1} >
            <SmallProfile name={name} />
            <Block style={{ margin: 16 }}>
                <VirtualAccountCard cuenta={cuenta} cuenta2={cuenta2} cuenta3={cuenta3} saldo={saldo} fecha={fecha} />
            </Block>
            <Block flex={1} style={styles.historyContainer}>
                {
                    transacciones === 'No se obtuvieron resultados' ? <TransactionHistory /> : <TransactionHistory transacciones={transacciones} />

                }
            </Block>
        </Block>
    );
}
const styles = StyleSheet.create({
    historyContainer: {
        backgroundColor: "#fff",
        marginTop: 8,
        borderTopEndRadius: 32,
        borderTopStartRadius: 32,
        paddingHorizontal: 24,
        paddingVertical: 24
    }
})
export default Balances
