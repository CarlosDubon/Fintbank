import React, {useState} from 'react';
import {StyleSheet} from 'react-native'
import {Block, Text} from "galio-framework";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Balances from "../Fragments/Balances";
import colors from "../../modules/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import SendMoney from "../Fragments/SendMoney";
import Profile from "../Fragments/Profile";
import OptionsQR from '../Items/OptionsQR';
import PagoQR from '../Items/PagoQR';


const Home = (props) => {
    const Tab = createMaterialBottomTabNavigator();

    return (
        <Block flex={1}>
            <Tab.Navigator
                activeColor={colors.PRIMARY}
                inactiveColor={colors.BLACK}
                barStyle={styles.bottomBar}
            >
                <Tab.Screen
                    name="Inicio" component={Balances}
                    options={{
                        tabBarIcon:({focused,color})=>(focused?<Icon name={"wallet"} color={color} size={25}/>:<Icon name={"wallet-outline"} color={color} size={25}/> )
                    }}
                />
                <Tab.Screen
                    name="Pagos" component={SendMoney}
                    options={{
                        tabBarIcon:({focused,color})=>(<Icon name={"arrow-up-circle"} color={color} size={25}/> )
                    }}
                />
                <Tab.Screen
                    name="Pago QR" component={PagoQR}
                    options={{
                        tabBarIcon:({focused,color})=>(<Icon name={"qrcode-scan"} color={color} size={25}/> )
                    }}
                />
                <Tab.Screen
                    name="Cobro QR" component={OptionsQR}
                    options={{
                        tabBarIcon:({focused,color})=>(<Icon name={"qrcode-edit"} color={color} size={25}/> )
                    }}
                />
                <Tab.Screen
                    name="Cuenta" component={Profile}
                    options={{
                        tabBarIcon:({focused,color})=>(focused?<Icon name={"account-circle"} color={color} size={25}/>:<Icon name={"account-circle-outline"} color={color} size={25}/> )
                    }}
                />
            </Tab.Navigator>
        </Block>
    );
}
const styles = StyleSheet.create({
    bottomBar:{
        backgroundColor:"#fff",
        borderColor:"transparent",
        elevation:0,
    }
})
export default Home
