import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native'
import { Block } from "galio-framework";
import SmallProfile from "../Items/SmallProfile";
import colors from "../../modules/colors";
import VirtualAccountCard from "../Items/VirtualAccountCard";
import TransactionHistory from "./TransactionHistory";

import { useSelector } from 'react-redux';

const Balances = (props) => {
    const isAuth = useSelector(state => state.auth.token);
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
            console.log(resData)
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
            console.log('todo bien con los datos')
            console.log(resData)
        } catch (e) {
            console.log('fallo con lo de la cuenta')
            console.log(e)
        }
    }

    useEffect(() => {
        ultimasTransacciones()
        datos()
    }, [isAuth])
    return (
        <Block flex={1} >
            <SmallProfile />
            <Block style={{ margin: 16 }}>
                <VirtualAccountCard />
            </Block>
            <Block flex={1} style={styles.historyContainer}>
                <TransactionHistory />
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
