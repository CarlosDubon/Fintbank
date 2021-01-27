import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Image, Pressable, Touchable, TouchableOpacity, ScrollView, Alert, Dimensions } from 'react-native';

import { Block, Text, Input, Button } from "galio-framework";
import colors from '../../modules/colors';
import Card from '../Containers/Card';

import { useSelector } from 'react-redux';
import QRCode from 'react-native-qrcode-svg';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

import { useNavigation } from '@react-navigation/native';

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const PagoQR = () => {
    const navigation = useNavigation();
    const [qr, setqr] = useState('')
    const tarjeta = useSelector(state => state.auth.tarjeta);
    const isAuth = useSelector(state => state.auth.token);
    const [pago, setpago] = useState('')

    const emptyAvatar = (
        <Block style={styles.emptyAvatar}>

        </Block>
    )

    const alerta = ((mensaje) => {
        Alert.alert('¡Un error ocurrio!', mensaje, [{ text: 'Okay' }])
    })

    const alertaOk = ((mensaje) => {
        Alert.alert('¡Transacción realizada con exito!', mensaje, [{ text: 'Okay' }])
    })
    const onSuccess = (e) => {
        const res = e.data;
        const resData = JSON.parse(res)
        setpago(resData)
    };

    const Send = async () => {
        console.log(pago.monto)

        let res;
        try {

            res = await fetch(`http://209.97.152.122:3001/account/transferencia`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${isAuth}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        cuenta_remitente: tarjeta,
                        cuenta_destino: pago[0].cuenta_destino,
                        monto: pago[0].monto,
                        concepto: pago[0].concepto,
                    })
                });
            const resData = await res.json();
            console.log('todo bien con la transaccion')
            console.log(resData)
            if (resData.ok === true) {
                alertaOk('')
                navigation.replace('Home');
            }
            else {
                alerta(resData.msg)
            }
        } catch (e) {
            console.log('fallo con las transaccion')
            console.log(e)
        }
    }
    return (
        <Block flex={1}>
            
            <Image style={styles.bkgd} source={require("../../modules/images/background-top.png")} />
            <Block style={{ marginTop: 24 }}>
                <Text h5 bold center color={colors.BLACK}>Pagar por QR</Text>
            </Block>


            <QRCodeScanner
                onRead={(e) => onSuccess(e)}
                containerStyle={{ marginTop: 10 , }}
                cameraStyle={{ height: Dimensions.get('window').height/3.5, marginTop: 20, width: Dimensions.get('window').width/1.7, alignSelf: 'center', justifyContent: 'space-around' , }}
                reactivate={true}
                reactivateTimeout={500}
            />
            {pago !== '' ?
                <View>
                    <Card style={{ marginTop: 88, marginHorizontal: 16, width:Dimensions.get('window').width/1.8, alignSelf:'center' }}>
                    <Image style={{width: Dimensions.get('window').width/7,height: Dimensions.get('window').height/9.5, position: 'absolute'}} source={require("../../modules/images/background-top.png")} />
                    <Image style={{width: Dimensions.get('window').width/7,height: Dimensions.get('window').height/9.5, position: 'absolute', bottom: 0,right: 0,}} source={require("../../modules/images/background-bottom-01.png")} />    
                        <View style={{alignSelf:'center'}}>
                            <Icon name={'qrcode'} color={colors.PRIMARY} size={30} />
                        </View>
                        <View style={{ marginTop: 10, alignSelf:'center' }}>
                            <Text h6 bold italic center>{pago[0].concepto}</Text>
                        </View>
                        <View style={{alignSelf:'center',  marginTop:10}}>
                            <Text h5 bold center>$ {pago[0].monto}</Text>
                        </View>
                    </Card>
                    <Block style={styles.boton} >
                        <Button color={colors.PRIMARY} style={{marginVertical:10}} round onPress={() => Send()}>Realizar pago</Button>
                        <Button color={colors.ERROR} round onPress={() => setpago('')}>Eliminar pago</Button>
                    </Block>
                </View>
                : <View></View>}
        </Block>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        overflow: "hidden",
        height: 240,
        backgroundColor: "#82ccdd"
    },
    textContainer: {
        paddingVertical: 26,
        paddingHorizontal: 52
    },
    bkgd: {
        position: "absolute",
        top: 0,
        left: 0,
        width: 250,
        height: 250,
    },
    bkgdBottom: {
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 300,
        height: 300,
    },
    chip: {
        height: 90,
        width: 100,

    },
    emptyAvatar: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: colors.WHITE,
        borderColor: colors.MUTED,
        borderWidth: 1,
        borderStyle: "dashed",

    },
    boton: {
        marginHorizontal: 16,
        marginTop: 20,
        marginBottom:10

    }
})

export default PagoQR;