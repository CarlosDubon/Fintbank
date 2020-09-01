import React, {useState} from 'react';
import {StyleSheet} from 'react-native'
import {Block} from "galio-framework";
import SmallProfile from "../Items/SmallProfile";
import colors from "../../modules/colors";
import VirtualAccountCard from "../Items/VirtualAccountCard";
import TransactionHistory from "./TransactionHistory";

const Balances = (props) => {
    return (
        <Block flex={1} >
            <SmallProfile/>
            <Block style={{margin:16}}>
                <VirtualAccountCard/>
            </Block>
            <Block flex={1} style={styles.historyContainer}>
                <TransactionHistory/>
            </Block>
        </Block>
    );
}
const styles = StyleSheet.create({
    historyContainer:{
        backgroundColor:"#fff",
        marginTop:8,
        borderTopEndRadius:32,
        borderTopStartRadius:32,
        paddingHorizontal:24,
        paddingVertical:24
    }
})
export default Balances
