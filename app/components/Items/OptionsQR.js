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

const OptionsQR = () => {
    const navigation = useNavigation();
    const [form, setform] = useState(false)
    const [monto, setmonto] = useState('')
    const [concepto, setconcepto] = useState('')
    const [qr, setqr] = useState('')
    const tarjeta = useSelector(state => state.auth.tarjeta);
    const [pago, setpago] = useState('')
    const [scaner, setscaner] = useState(false)

    const isAuth = useSelector(state => state.auth.token);

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

    const generarqr = () => {
        setqr([{ cuenta_destino: tarjeta, monto: monto, concepto: concepto }])
    }

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

    useEffect(() => {
        setqr('')
    }, [monto, concepto])
    return (
        <Block flex={1}>
            <ScrollView>
                <Image style={styles.bkgd} source={require("../../modules/images/background-top.png")} />
                <Block style={{ marginTop: 24 }}>
                    <Text h5 bold center color={colors.BLACK}>Cobrar por QR</Text>
                </Block>
                <View>
                    <Card style={{ marginTop: 28, marginHorizontal: 16 }}>
                        <Image style={{ width: Dimensions.get('window').width / 7, height: Dimensions.get('window').height / 9.5, position: 'absolute' }} source={require("../../modules/images/background-top.png")} />
                        <Image style={{ width: Dimensions.get('window').width / 7, height: Dimensions.get('window').height / 9.5, position: 'absolute', bottom: 0, right: 0, }} source={require("../../modules/images/background-bottom-01.png")} />

                        <Block>
                            <Block row middle>
                                <Block >
                                    <Icon name={'qrcode'} color={colors.PRIMARY} size={30} style={{marginHorizontal:10}}/>
                                </Block>
                                <Block flex={1} style={{ marginStart: 8, marginBottom: 20 }}>
                                    <Input placeholder={"Concepto"} borderless onChangeText={text => setconcepto(text)} value={concepto} />
                                    <Input placeholder={"Monto"} borderless onChangeText={text => setmonto(text)} value={monto} />

                                </Block>

                            </Block>
                        </Block>
                    </Card>
                </View>
                {concepto !== "" && monto !== "" ?
                    <Block style={styles.boton}>
                        <Button color={colors.PRIMARY} round onPress={() => generarqr()}>Generar QR</Button>
                    </Block> : <View></View>}

                {qr && concepto !== "" && monto !== "" ?
                    <View style={{ alignSelf: 'center', marginTop: 40, marginBottom:10 }}>
                        <QRCode
                            value={JSON.stringify(qr)}
                            size={200} />
                    </View> : <View></View>}
            </ScrollView>
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
        marginTop: 20

    }
})
export default OptionsQR;
